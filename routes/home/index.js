const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
/*const bcrypt = require('bcryptjs');*/
/*const passport = require('passport');*/
/*const LocalStrategy = require('passport-local').Strategy;*/
/*const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;*/

router.all('/*', (req, res, next)=>{
  req.app.locals.layout = "home";
  next();
});

router.get('/', (req, res)=>{
  res.render('home/index');
});

router.get('/login', (req, res)=>{
  res.render('home/login');
});

router.get('/statistics', (req, res)=>{
  res.render('home/statistics');
});

router.get('/api/products', (req, res)=>{
  Product.find({})
    .then(products=>{
      res.send(products);
    });
});

router.get('/api/products/:id', (req, res)=>{
  Product.findOne({_id: req.params.id})
    .then(product=>{
      res.send(product);
    });
});

module.exports = router;
