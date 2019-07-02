/* eslint-disable no-tabs */
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const agentRoutes = require('./routes/agents');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', userRoutes);
app.use('/api/v1', agentRoutes);

app.use((req, res) => res.status(500).json({
	status: 'error',
	error: 'route not found or wrong request method',
}));

const port = 5000;
app.listen(port, console.log(`server started on port ${port}`));
module.exports = app;
