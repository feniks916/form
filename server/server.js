const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const arr = [];

let value = [];

const app = express();
const port = 3001;
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

app.post('/sign-up', (request, response) => {
  const req = request.body;
  arr.push(req);
  value = arr.filter((el) => el.email === request.body.email);
  console.log(value);
  if (value.length === 1) {
    response.send('status 200');
  }
  if (value.length > 1) {
    response.send('error 500');
  }
});

app.listen(port, () => {
  console.log(`We are live on ${port}`);
});

app.get('/', (request, response) => {
  response.send('Node.js and Express REST API');
});
