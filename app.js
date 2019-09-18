const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/gaza', (req, res) => res.send('GAZA GAZA GAZA!'));

app.post();

app.listen(port, () => console.log('Eg app listening on port ${port}!'));