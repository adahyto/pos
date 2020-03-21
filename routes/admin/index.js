const express = require('express');
const router = express.Router();
/*const bcrypt = require('bcryptjs');*/
/*const passport = require('passport');*/
/*const LocalStrategy = require('passport-local').Strategy;*/
/*const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;*/

router.all('/*', (req, res, next) => {
  req.app.locals.layout = 'admin';
  next();
});

router.get('/', (req, res) => {
  res.render('admin/index');
});

module.exports = router;
