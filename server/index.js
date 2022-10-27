require('dotenv/config');
const path = require('path');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const db = require('./db');

const app = express();
const publicPath = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
} else {
  app.use(express.static(publicPath));
}

app.use(express.json());// json middleware

app.get('/api/users', (req, res, next) => {
  // const userId = req.users.userId; when user auth is set up
  const country = req.query.country;// coming from the fetch query "?"
  const state = req.query.state;
  const city = req.query.city;
  // console.log(country);
  const sql = `
  select *
  from
  "users"
  where

  "country" =$1 and
  "state" =$2 and
  "city" =$3
  `;

  const params = [country, state, city];

  db.query(sql, params)
    .then(results => {
      // console.log(results.rows);
      res.json(results.rows);
    })
    .catch(err => next(err));
});

app.get('/api/musiciantypes', (req, res, next) => {
  const instrument = req.query.instrument;// select all users that have particular instrument
  const sql = `
  select *
  from "users"
  where

  "instrument"=$1
  `;
  // console.log(instrument, 'instrument');

  const params = [instrument];
  db.query(sql, params)
    .then(results => {
      // console.log(results.rows);
      res.json(results.rows);
    })
    .catch(err => next(err));
});

// // app.get('/api/users/location', (req, res, next) => {
// //   // const userId = req.users.userId; when user auth is set up
// //   const userId = 1;
// //   const sql = `
// //   select *
// //   from
// //   "location"
// //   where
// //   "userId" =$1
// //   `;

// //   const params = [userId];

// //   db.query(sql, params)
// //     .then(results => {
// //       res.json(results.rows);
//     })
//     .catch(err => next(err));
// });

app.post('/api/user_create', (req, res, next) => {
  const { name, instrument, country, state, city, about, email, hashedPassword, photoUrl } = req.body;
  // console.log(email);
  const sql =
     `insert into users(name, instrument, country, state, city, about, email, hashed_password, photo_url)
    values($1,$2,$3,$4,$5,$6,$7,$8,$9)`
  ;

  const params = [name, instrument, country, state, city, about, email, hashedPassword, photoUrl];

  db.query(sql, params)
    .then(results => {
      res.json(results.rows);
      res.end();
    })
    .catch(err => next(err));

});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
