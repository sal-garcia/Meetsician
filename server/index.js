require('dotenv/config');
// user authentication
const cookieParser = require('cookie-parser');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
// user authentication

const path = require('path');
const express = require('express');
const ClientError = require('./client-error');
const ErrorMiddleware = require('./error-middleware');
const db = require('./db');
const app = express();
const publicPath = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
} else {
  app.use(express.static(publicPath));
}

// cookie middleware
function checkAuth(req, res, next) {
  const cookies = req.cookies;
  // console.log(cookies);
  if (!cookies.authToken) {
    res.status(401).json({ error: 'not authorized' });
    res.end();
    return (null);
  }
  const verified = jwt.verify(cookies.authToken, process.env.TOKEN_SECRET);
  if (!verified) {
    res.status(401).json({ error: 'not authorized' });
    res.end();
    return (null);
  }
  req.user = verified;
  // console.log(req.user);
  next();
}
// cookie middleware
app.use(cookieParser());
app.use(express.json());// json middleware

app.get('/api/users', (req, res, next) => {
  // const userId = req.users.userId; when user auth is set up
  const country = req.query.country;// coming from the fetch query "?"
  const state = req.query.state;
  const city = req.query.city;
  const sql = `
  select *
  from
  "users"
  where

  "country" =$1 and
  "state" =$2 and
  "city" =$3

  ORDER BY user_id asc
  `;

  const params = [country, state, city];

  db.query(sql, params)
    .then(results => {
      res.json(results.rows);
    })
    .catch(err => next(err));
});

app.get('/api/musiciantypes', (req, res, next) => {
  const instrument = req.query.instrument;// select all users that have particular instrument
  const country = req.query.country;// coming from the fetch query "?"
  const state = req.query.state;
  const city = req.query.city;

  const sql = `
  select *
  from "users"
  where
  "instrument" =$1 and
  "country" =$2 and
  "state" =$3 and
  "city" =$4
  ORDER BY user_id asc
  `;

  const params = [instrument, country, state, city];
  db.query(sql, params)
    .then(results => {
      res.json(results.rows);
    })
    .catch(err => next(err));
});

// app.post('/api/user_create', (req, res, next) => {
//   const { name, instrument, country, state, city, about, email, hashedPassword, photoUrl, likes, saved } = req.body;

//   const sql =
//      `insert into users(name, instrument, country, state, city, about, email, hashed_password, photo_url ,likes,saved)
//     values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`
//   ;

//   const params = [name, instrument, country, state, city, about, email, hashedPassword, photoUrl, likes, saved];

//   db.query(sql, params)
//     .then(results => {
//       res.json(results.rows);
//       res.end();
//     })
//     .catch(err => next(err));

// });

app.put('/api/user_likes', (req, res, next) => {

  const { likes, name, email } = req.body;

  const sql =
    `UPDATE "users"
    SET "likes" = $1
     WHERE
  "name" =$2 and
  "email" =$3

   `;

  const params = [likes, name, email];

  db.query(sql, params)
    .then(results => {
      res.json(results.rows);
      res.end();
    })
    .catch(err => next(err));
});

app.put('/api/user_dislikes', (req, res, next) => {

  const { likes, name, email } = req.body;

  const sql =
    `UPDATE "users"
    SET "likes" = $1
     WHERE
  "name" =$2 and
  "email" =$3

   `;

  const params = [likes, name, email];

  db.query(sql, params)
    .then(results => {
      res.json(results.rows);
      res.end();
    })
    .catch(err => next(err));
});

app.put('/api/userSaved', (req, res, next) => {

  const { saved, name, email } = req.body;

  const sql =
    `UPDATE "users"
    SET "saved" = $1
     WHERE
  "name" =$2 and
  "email" =$3

   `;

  const params = [saved, name, email];

  db.query(sql, params)
    .then(results => {
      res.json(results.rows);
      res.end();
    })
    .catch(err => next(err));
});

// user authentication sign up
app.post('/api/auth/sign-up', (req, res, next) => {
  const { email, password, name, instrument, country, state, city, about, photoUrl, likes, saved } = req.body;
  if (!email || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" (email, hashed_password, name, instrument, country, state, city, about, photo_url, likes, saved)
        values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
        returning "user_id", "email", "created_at"
      `;
      const params = [email, hashedPassword, name, instrument, country, state, city, about, photoUrl, likes, saved];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});
// user authentication sign up

// user authentication sign in
app.post('/api/auth/sign-in', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(401, 'invalid login');
  }

  const sql = `
  select email,
         hashed_password
    from users

   where email = $1;
  `;
  const param = [email];
  // console.log(param, 'param');
  db.query(sql, param)
    .then(result => {
      const [user] = result.rows;
      // console.log(user, 'user');
      if (!user) {
        throw new ClientError(401, 'invalid login');
      } else {
        // console.log(user, 'user');
        argon2
          .verify(user.hashed_password, password)
          .then(isMatching => {
            if (!isMatching) {
              throw new ClientError(401, 'invalid login');
            } else {
              const payload = {
                // userId: user.userId,
                email,
                user_id: user.user_id

              };
              const token = jwt.sign(payload, process.env.TOKEN_SECRET);
              res.cookie('authToken', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
              res.status(200).json({
                token,
                user: payload
              });
            }
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});

app.get('/auth/check', checkAuth, (req, res, next) => {
  res.json({ auth: true, user: req.user });
});
// user authentication sign in

app.use(ErrorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
