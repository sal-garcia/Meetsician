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

app.post('/api/user_create', (req, res, next) => {
  const { name, instrument, country, state, city, about, email, hashedPassword, photoUrl, likes, saved } = req.body;

  const sql =
     `insert into users(name, instrument, country, state, city, about, email, hashed_password, photo_url ,likes,saved)
    values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`
  ;

  const params = [name, instrument, country, state, city, about, email, hashedPassword, photoUrl, likes, saved];

  db.query(sql, params)
    .then(results => {
      res.json(results.rows);
      res.end();
    })
    .catch(err => next(err));

});

app.put('/api/user_likes', (req, res, next) => {
  // console.log('test');

  const { likes, name, email } = req.body;
  // console.log('test');
  const sql =
    `UPDATE "users"
    SET "likes" = $1
     WHERE
  "name" =$2 and
  "email" =$3

   `;
  // console.log('test');

  const params = [likes, name, email];

  db.query(sql, params)
    .then(results => {
      res.json(results.rows);
      res.end();
    })
    .catch(err => next(err));
});

app.put('/api/user_dislikes', (req, res, next) => {
  // console.log('test');

  const { likes, name, email } = req.body;
  // console.log('test');
  const sql =
    `UPDATE "users"
    SET "likes" = $1
     WHERE
  "name" =$2 and
  "email" =$3

   `;
  // console.log('test');

  const params = [likes, name, email];

  db.query(sql, params)
    .then(results => {
      res.json(results.rows);
      res.end();
    })
    .catch(err => next(err));
});

app.put('/api/userSaved', (req, res, next) => {
  // console.log('test');

  const { saved, name, email } = req.body;
  // console.log('test');
  const sql =
    `UPDATE "users"
    SET "saved" = $1
     WHERE
  "name" =$2 and
  "email" =$3

   `;
  // console.log('test');

  const params = [saved, name, email];

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
