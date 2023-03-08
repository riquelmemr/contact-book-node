const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

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
    this.validate(false);
    if (this.errors.length > 0) return;

    await this.userExists();
    if (this.errors.length > 0) return;

    this.setPasswordsCode();

    this.user = await LoginModel.create(this.body);
  }

  async connect() {
    this.validate(true);
    if (this.errors.length > 0) return;

    this.user = await LoginModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push('Usuário não cadastrado.');
      return;
    }

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida. Tente novamente!');
      this.user = null; 
      return;
    }
  }

  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email });
    if (this.user) this.errors.push('Usuário já utilizado. Tente novamente!');
  }

  setPasswordsCode() {
    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);
    this.body.confirmPassword  = bcryptjs.hashSync(this.body.confirmPassword, salt);
  }

  validate(ifLogin) {
    this.cleanUp();

    if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');

    if (this.body.password.length < 5 || this.body.password.length > 50) {
      this.errors.push('Senha inválida. Sua senha precisa ter entre 5 e 50 caracteres.');
    }

    if (!ifLogin) {
      if (this.body.password !== this.body.confirmPassword) {
        this.errors.push('Senha inválida. Suas senhas precisam ser iguais.');
      }
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