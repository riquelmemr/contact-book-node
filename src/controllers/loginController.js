const Login = require('../models/LoginModel');

exports.index = (req, res) => {
  if (req.session.user) return res.render('logged');
  res.render('login');
}

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();
  
    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => {
        return res.redirect('/login/index');
      });
      
      return;
    }
  
    req.flash('success', 'Seu usuário foi criado com sucesso!');
    req.session.save(() => {
      return res.redirect('/login/index');
    });
  }
  catch (e) {
    console.log(e);
    return res.render('404');
  }
}

exports.connect = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.connect();
  
    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => {
        return res.redirect('/login/index');
      });
      
      return;
    }
  
    req.flash('success', 'Bem vindo! Logado com sucesso.');
    req.session.user = login.user;
    req.session.save(() => {
      return res.redirect('/login/index');
    });
  }
  catch (e) {
    console.log(e);
    return res.render('404');
  }
}

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
}