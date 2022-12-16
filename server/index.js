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
  if (!cookies.authToken) {
    res.status(401).json({ error: 'not authorized', success: false, message: 'not authorized' });
    res.end();
    return (null);
  }
  const verified = jwt.verify(cookies.authToken, process.env.TOKEN_SECRET);
  if (!verified) {
    res.status(401).json({ error: 'not authorized', success: false, message: 'not authorized' });
    res.end();
    return (null);
  }
  req.user = verified;
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

  select users.*, CAST(count(user_likes.likes_user) as INTEGER) as num_likes
  from
  "users"
  LEFT JOIN user_likes
  on user_likes.likes_user = users.user_id
  where

  "country" =$1 and
  "state" =$2 and
  "city" =$3
  GROUP BY users.user_id
  ORDER BY users.user_id asc
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
  select users.*,  CAST(count(user_likes.likes_user) as INTEGER) as num_likes
  from
  "users"
  LEFT JOIN user_likes
  on user_likes.likes_user = users.user_id
  where
  "instrument" =$1 and
  "country" =$2 and
  "state" =$3 and
  "city" =$4
  GROUP BY users.user_id
  ORDER BY user_id asc
  `;

  const params = [instrument, country, state, city];
  db.query(sql, params)
    .then(results => {
      res.json(results.rows);
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
         hashed_password,
         user_id,
         name
    from users

   where email = $1;
  `;
  const param = [email];
  db.query(sql, param)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      } else {
        argon2
          .verify(user.hashed_password, password)
          .then(isMatching => {
            if (!isMatching) {
              throw new ClientError(401, 'invalid login');
            } else {
              const payload = {

                email,
                user_id: user.user_id,
                name: user.name

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

app.post('/auth/sign-out', (req, res, next) => {
  res.clearCookie('authToken');
  res.json({ auth: null, message: 'logged out' });
});

app.put('/user/:user1Id/likes/:user2Id', checkAuth, async (req, res, next) => {
  const query1 = `
 SELECT COUNT(likes_user)
 FROM user_likes
 WHERE liked_by = $2 and likes_user = $1
 `;
  const query1Params = [req.params.user2Id, req.params.user1Id];
  const query1Results = await db.query(query1, query1Params);
  const numbLikes = parseInt(query1Results.rows[0].count);
  if (numbLikes > 0) {
    res.status(400).json({ message: 'cant like user more than once', success: false });
    res.end();
    return;
  }

  const sql = `
    INSERT INTO user_likes(likes_user,liked_by)
    VALUES($1,$2)
   `;
  const params = [req.params.user2Id, req.params.user1Id];
  await db.query(sql, params);
  res.json({ message: 'liked user', success: true });
});

app.put('/user/:user1Id/dislikes/:user2Id', async (req, res, next) => {
  const query1 = `
 SELECT COUNT(likes_user)
 FROM user_likes
 WHERE liked_by = $2 and likes_user = $1
 `;
  const query1Params = [req.params.user2Id, req.params.user1Id];
  const query1Results = await db.query(query1, query1Params);
  const numbLikes = parseInt(query1Results.rows[0].count);
  if (numbLikes < 1) {
    res.status(400).json({ message: 'cant dislike user', success: false });
    res.end();
    return;
  }

  const sql = `
    DELETE FROM user_likes
 WHERE liked_by = $2 and likes_user = $1
   `;
  const params = [req.params.user2Id, req.params.user1Id];
  await db.query(sql, params);
  res.json({ message: 'disliked user', success: true });
});

app.get('/user/:user1Id/likes', async (req, res, next) => {
  const sql = `
  SELECT COUNT(likes_user)
  FROM user_likes
  WHERE likes_user = $1

 `;
  const params = [req.params.user1Id];
  const queryResults = await db.query(sql, params);
  res.json(queryResults.rows);
});

app.use(ErrorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
