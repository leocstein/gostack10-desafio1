const express = require('express');

const routes = require('./routes');

const { logRequests } = require('./middlewares');

const app = express();

app.use(express.json());
app.use(logRequests);
app.use(routes);

app.listen(3000);