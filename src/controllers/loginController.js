const Login = require('../models/LoginModel')
exports.index = (req, res) => {
  if(req.session.user) return res.render('loggedInUser')
  return res.render('login')
};

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function () {
        return res.redirect('/login');
      });
      return;
    }
    req.flash('success', 'User created of successfully');
    req.session.save(function () {
    return res.redirect('/login');
    });
  } catch (e) {
    console.error(e);
    return res.render('404');
  }
};
exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.signIn();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function () {
        return res.redirect('/login');
      });
      return;
    }

    req.flash('success', 'You entered the system');
    req.session.user = login.user;
    req.session.save(function () {
    return res.redirect('/login');
    });
  } catch (e) {
    console.error(e);
    return res.render('404');
  }
};

exports.logout = (req,res)=>{
    req.session.destroy();
    res.redirect('/');
}
