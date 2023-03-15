const Contact = require('../models/ContactModel');

exports.index = (req, res) => {
  res.render('contacts');
};

exports.register = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.register();
  
    if (contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }
  
    req.flash('success', 'Contato cadastrado com sucesso!');
    req.session.save(() => res.redirect('back'));
    return;
    
  } catch (err) {
    console.error(err);
    return res.render('404');
  }
};