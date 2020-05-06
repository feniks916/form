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
  value = arr.filter((el) => el.email === request.body.email);
  if (value.length === 0) {
    response.send('status 200');
  }
  if (value.length > 0) {
    response.send('error 500');
  }
  arr.push(req);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`We are live on ${port}`);
});

app.get('/', (request, response) => {
  response.send('Node.js and Express REST API');
});
