exports.globalMiddleware = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  console.log('passei no global');
  next();
};

exports.validateErrorCsrf  = (err, req, res, next) => {
  console.log(err);
  if (err) return res.render('404');
  next();
};

exports.middlewareCsrf = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.loginRequired = (req, res, next) => {
  console.log("loginRequired", req.session.user);
  if (!req.session.user) {
    req.flash('errors', 'Ops. Você precisa estar logado para acessar!');
    req.session.save(() => res.redirect('/'));
    return;
  }

  next();
};