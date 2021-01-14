const mongoose = require('mongoose');

const URI = "mongodb://localhost/merstack";

mongoose.connect(URI, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database is connected');
})