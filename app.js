const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const {checkUser} = require('./middleware/authMiddleware');
const app = express();

//middleware
app.use(express.static('public'));
app.use(cookieParser()); 
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.set('strictQuery', false);
const dbURI = 'mongodb+srv://malak:test123@cluster1.ck7hkwa.mongodb.net/web-auth';
mongoose.connect(dbURI, {})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));


//routes
app.use('*', checkUser);
app.get('/', (req, res) => res.render('home'));

app.use(authRoutes);
