const express = require('express');
const app = express();

app.use(express.json());
app.use(require('cookie-parser')());

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/memories', require('./routes/memories'));
app.use('/api/v1/photos', require('./routes/photos'));
<<<<<<< HEAD
=======
app.use('/api/v1/shares', require('./routes/shares'));
>>>>>>> fc6d9f5c9213c301d7943a53d397dba8dbba8d94

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
