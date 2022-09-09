const Contact = require('../models/contactModel')
exports.index = (req, res) => {
  return res.render('contact', { contact: {} })
};

exports.register = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.register();

    if (contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      req.session.save(function () {
        return res.redirect('/contact');
      });
      return;
    }
    req.flash('success', 'Contact created of successfully');
    req.session.save(function () {
      return res.redirect(`/contact/${contact.contact._id}`);
    });
  } catch (e) {
    console.error(e);
    return res.render('404');
  }
};

exports.show = async (req, res) => {
  if (!req.params.id) return res.render('404');
  const contact = await Contact.searchById(req.params.id);
  if (!contact) {
    return res.render('404');
  }
  res.render('contact', { contact });
}

exports.update = async (req, res) => {
  try {
    if (!req.params.id) return res.render('404');
    const contact = new Contact(req.body);
    await contact.update(req.params.id);
    if (contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      req.session.save(function () {
        return res.redirect('/contact');
      });
      return;
    }
    req.flash('success', 'Contact updated of successfully');
    req.session.save(function () {
      return res.redirect(`/contact/${contact.contact._id}`);
    });

  } catch (e) {
    console.error(e)
    return res.render('404');
  }
}

exports.delete = async (req, res) => {

  if (!req.params.id) return res.render('404');
  const contact = await Contact.delete(req.params.id);
  if (!contact) {
    return res.render('404');
  }

  req.flash('success', 'Contact delete of successfully.');
  req.session.save(_ => res.redirect('/'));
  return;
};