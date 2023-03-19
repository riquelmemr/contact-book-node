const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: false, default: ''},
  email: { type: String, required: false, default: '' },
  phone: { type: String, required: false, default: '' },
  creationDate: { type: Date, default: Date.now() },
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
  }

  async register() {
    this.validate();

    if (this.errors.length > 0) return;

    this.contact = await ContactModel.create(this.body);
  }

  validate() {
    this.cleanUp();

    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');
    if (!this.body.name) this.errors.push('O campo nome é um campo obrigatório');
    if (!this.body.email && !this.body.phone) this.errors.push('Pelo menos um dos campos (email ou telefone) precisam ser preenchidos.');
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      name: this.body.name,
      lastName: this.body.lastName,
      email: this.body.email,
      phone: this.body.phone
    }
  }

  async update(id) {
    if (typeof id !== 'string') return;

    this.validate();
    if (this.errors.length > 0) return;

    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
  }
}

Contact.findIdModel = async (id) => {
  if (typeof id !== 'string') return;

  const contact = await ContactModel.findById(id);
  return contact;
}

Contact.findAllContactModel = async () => {
  const contacts = await ContactModel.find().sort({ creationDate: -1 });
  return contacts;
};

module.exports = Contact;