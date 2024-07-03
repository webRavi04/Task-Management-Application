const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/taskmanager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', taskRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
