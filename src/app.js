const express = require('express');
const connectDB = require('./config/database');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const locationRoutes = require('./routes/locationRoutes');
const eventRoutes = require('./routes/eventRoutes');

dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware para parsear el cuerpo de las peticiones
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
