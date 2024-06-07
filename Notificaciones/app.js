require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const notificationRoutes = require('./Routes/notificationRoutes');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());
app.use('/api', notificationRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado a MongoDB');
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
})
.catch(err => {
  console.error('Error al conectar a MongoDB', err);
});
