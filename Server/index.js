/* eslint-disable no-tabs */
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/users';
import agentRoutes from './routes/agents'
import {createProperty, createUsers, createFlags, dropFlags, dropProperty, dropUsers} from './db/databases';

createProperty();
createUsers();
createFlags();
const PORT = process.env.PORT || 5000;


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', userRoutes);
app.use('/api/v1', agentRoutes);

app.use((req, res) => res.status(405).json({
	status: 'error',
	error: 'route not found or wrong request method',
}));

app.listen(PORT, console.log(`server started on port ${PORT}`));
export default app;
