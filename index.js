//start db cmd: /Users/nazmur21/mongodb/bin/mongod --dbpath=/Users/nazmur21/mongodb-data
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');


mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);



