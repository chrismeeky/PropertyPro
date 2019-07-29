/* eslint-disable no-tabs */

import express from 'express';
import bodyParser from 'body-parser';
import YAML from 'yamljs';
import swaggerUI from 'swagger-ui-express';
import userRoutes from './routes/users';
import agentRoutes from './routes/agents';
import { createFlags, createProperty, createUsers } from './db/databases';
createFlags();
createProperty();
createUsers();

const swaggerDocument = YAML.load(`${__dirname}/../swagger.yaml`);

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', userRoutes);
app.use('/api/v1', agentRoutes);
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use((req, res) => res.status(405).json({
	status: 'error',
	error: 'route not found or wrong request method',
}));

app.listen(PORT, console.log(`server started on port ${PORT}`));
export default app;
