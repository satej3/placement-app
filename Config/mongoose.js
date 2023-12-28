
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test_placement');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to DB..'))

db.once('open', () => {
    console.log('Database connection is successfull..');
})

