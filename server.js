require('dotenv').config();
const express = require('express');
const app = express();
const { globalMiddleware, validateErrorCsrf, middlewareCsrf } = require('./src/middlewares/middleware');

// Conectar a base de dados
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.emit('connected')
  }).catch((e) => {
    console.log(e);
  });


// Session
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csurf = require('csurf');

app.use(helmet())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

// Configs
const sessionOptions = session({
  secret: 'secret',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias,
    httpOnly: true
  }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csurf());
app.use(globalMiddleware);
app.use(validateErrorCsrf);
app.use(middlewareCsrf);
app.use(routes);

// Quando 'connected', executa a function
app.on('connected', () => {
  app.listen(3001, () => {
    console.log(`listening on port http://localhost:3001`);
  });
})
