const Contact = require("../models/ContactModel");

exports.index = (req, res) => {
  res.render("contacts", {
    contact: {}
  });
};

exports.register = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.register();

    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);
      req.session.save(() => res.redirect("back"));
      return;
    }

    req.flash("success", "Contato cadastrado com sucesso!");
    req.session.save(() => res.redirect(`/contacts/index/${contact.contact._id}`));
    return;
  } catch (err) {
    console.error(err);
    return res.render("404");
  }
};

exports.updateIndex = async (req, res) => {
  const urlId = req.params.id;
  if (!urlId) return res.render("404");

  const contact = await Contact.findIdModel(urlId);

  if (!contact) return res.render("404");

  res.render("contacts", { contact });
};

exports.update = async (req, res) => {
  try {
    const urlId = req.params.id;
    console.log(urlId);
    if (!urlId) return res.render("404");
  
    const contact = new Contact(req.body);
    await contact.update(urlId);
  
    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);
      req.session.save(() => res.redirect("back"));
      return;
    }
  
    req.flash("success", "Contato editado com sucesso!");
    req.session.save(() => res.redirect(`/contacts/index/${contact.contact._id}`));
    return;
  } catch (err) {
    console.error(err);
    return res.render("404");
  }
}
