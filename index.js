require('dotenv').config(); // Load .env file

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models'); // Ini akan memuat dan menginisialisasi semua model

const app = express();
app.use(bodyParser.json());

// Test database connection
db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Sync database and start server
db.sequelize.sync({
    force: false
}).then(() => {
    console.log('Database & tables created!');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

// Define Routes
require('./routes/merchant')(app);
require('./routes/customer')(app);