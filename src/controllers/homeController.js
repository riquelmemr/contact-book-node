const Contact = require('../models/ContactModel');

exports.index = async (req, res) => {
  const contacts = await Contact.findAllContactModel();

  res.render('index', { contacts: contacts })
};
