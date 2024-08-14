const express = require('express');
const route = require('./routes/index');

const app = express();
const port = 3001;

app.use(express.json());
app.use('/', route);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});