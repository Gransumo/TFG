require('dotenv').config();
const express = require('express');
const eventRoutes = require('./Routes/eventRoutes');
const invitationRoutes = require('./Routes/invitationRoutes');
const joinRequestRoutes = require('./Routes/joinRequestRoutes');
const memberRoutes = require('./Routes/memberRoutes');
const taskRoutes = require('./Routes/taskRoutes');
const sequelize = require('./config/sequelize');
const { JoinRequest } = require('./Models');
const cors = require('cors');
 
// Crear una instancia de la aplicación Express
const app = express();
app.use(cors());

// Middleware para parsear las solicitudes con JSON
app.use(express.json());

// Middleware para las rutas de eventos
app.use('/api', eventRoutes);
app.use('/api', invitationRoutes);
app.use('/api', joinRequestRoutes);
app.use('/api', memberRoutes);
app.use('/api', taskRoutes);

// Puerto de escucha del servidor
const PORT = process.env.PORT || 3001;

// Sincronizar modelos y luego iniciar el servidor
sequelize.sync()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});
