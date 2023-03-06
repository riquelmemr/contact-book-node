exports.globalMiddleware = (req, res, next) => {
  res.locals.localVariant = 'This is the value a local variable of middleware'
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