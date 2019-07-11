/* eslint-disable no-tabs */
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/users';
import agentRoutes from './routes/agents'


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', userRoutes);
app.use('/api/v1', agentRoutes);

app.use((req, res) => res.status(405).json({
	status: 'error',
	error: 'route not found or wrong request method',
}));

const port = 5000;
app.listen(port, console.log(`server started on port ${port}`));
export default app;
