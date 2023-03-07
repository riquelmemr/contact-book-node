exports.globalMiddleware = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  next();
};

exports.validateErrorCsrf  = (err, req, res, next) => {
  if (err) return res.render('404');
  next();
};

exports.middlewareCsrf = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};