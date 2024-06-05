require('dotenv').config();
const express = require('express');
const userRoutes = require('./Routes/userRoutes');
const friendRequestRoutes = require('./Routes/friendRequestRoutes');
const friendshipRoutes = require('./Routes/friendshipRoutes');
const sequelize = require('./config/sequelize');
const cors = require('cors');
// Crear una instancia de la aplicación Express
const app = express();

// Middleware para parsear las solicitudes con JSON
app.use(express.json());
app.use(cors());
// Middleware para las rutas de usuarios
app.use('/api', userRoutes);
app.use('/api', friendRequestRoutes);
app.use('/api', friendshipRoutes);

// Puerto de escucha del servidor
const PORT = process.env.PORT || 3000;

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
