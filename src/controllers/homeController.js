const Contact = require('../models/ContactModel');

exports.index = async (req, res) => {
  const contacts = await Contact.findAllContactsModel();

  res.render('index', { contacts: contacts })
};
