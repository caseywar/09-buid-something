const express = require('express');
const app = express();


app.use(express.static(`${__dirname}/../public`));

app.use(express.json());

app.use('/api/v1/setlists', require('./controllers/setlists'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
