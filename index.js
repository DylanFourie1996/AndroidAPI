// index.js
require('dotenv').config(); // must be first
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const noteRoutes = require('./routes/noteRoutes');
const flashCardRoutes = require('./routes/flashCardRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/flashcards', flashCardRoutes);

// Health check
app.get('/', (req, res) => res.send('API is running 🚀'));

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error(' MONGO_URI not defined in environment variables');
    process.exit(1);
}
//(Borins, et al., [n.d.])

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(' MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));


//Borins, M., Lanz, R. and Pieszak, M., Copes, B., Awais, A., Halverson, B., Boström O., [n.d.]. Node.js - Introduction to Node.js. [online] Available at: <https://nodejs.org/en/learn/getting-started/introduction-to-nodejs> [Accessed 07 October 2025].
