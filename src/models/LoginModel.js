const mongoose = require('mongoose');
const validator = require('validator');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.validate();
    if (this.errors.length > 0) return;

    try {
      this.user = await LoginModel.create(this.body);
    } catch (e) {
      console.log(e);
    }
  }

  validate() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');

    if (this.body.password.length < 5 || this.body.password.length > 50) {
      this.errors.push('Senha inválida. Sua senha precisa ter entre 5 e 50 caracteres.');
    }

    if (this.body.password !== this.body.confirmPassword) {
      this.errors.push('Senha inválida. Suas senhas precisam ser iguais.');
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
      confirmPassword: this.body.confirmPassword
    }
  }
}

module.exports = Login;