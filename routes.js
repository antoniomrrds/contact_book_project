const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController');
const { loginRequired } = require('./src/middlewares/middleware');


//Home routes
route.get('/', homeController.index);

//Login routes
route.get('/login', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login', loginController.login);
route.get('/logout', loginController.logout);
//Contact routes
route.get('/contact',loginRequired,contactController.index);
route.post('/contact',loginRequired,contactController.register);
route.get('/contact/:id',loginRequired,contactController.show);
route.post('/contact/:id',loginRequired,contactController.update);
route.get('/contact/delete/:id',loginRequired,contactController.delete);



module.exports = route;
