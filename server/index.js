const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const db = require('./db');

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/goals', db.post);
app.get('/goals', db.get);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
