const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const Record = require('../../models/Record');
const { genID } = require('../../helpers/uid.js');
const { uniq } = require('../../helpers/uniqueArray.js');

router.all('/*', (req, res, next) => {
  req.app.locals.layout = 'admin';
  next();
});

router.get('/', (req, res) => {
  Product.find({})
    .then(products => {
      res.render('admin/products', { products: products });
    });
});

router.get('/create', (req, res) => {
  res.render('admin/products/create')
});

router.post('/create', (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price
  });
  newProduct.save()
    .then(savedProduct => {
      res.redirect('/admin/products');
    });
});

router.get('/edit/:id', (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then(product => {
      res.render('admin/products/edit', { product: product });
    });
});

router.put('/edit/:id', (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then(product => {
      product.name = req.body.name;
      product.price = req.body.price;
      product.save()
        .then(updatedProduct => {
          res.redirect('/admin/products');
        });
    });
});

router.delete('/:id', (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then(product => {
      product.remove()
        .then(removedProduct => {
          res.redirect('/admin/products/');
        });
    });
});

router.get('/records', (req, res) => {
  Record.find({})
    .then(records => {
      stories = [];
      for (let i = 0; i < records.length; i++) {
        if (records[i].storyId == stories[i]) {
          console.log('.');
        } else {
          stories.push(records[i].storyId);
        }
      }
      let history = uniq(stories);
      res.render('admin/products/records', { records: records, history: history });
    });
});



router.get('/records/order/:storyId', (req, res) => {
  Record.find({ storyId: req.params.storyId })
    .then(records => {
      res.render('admin/products/order', { records: records });
    });
});








router.post('/record', (req, res) => {
  let cart = req.body.cart;
  let storyId = genID();
  let dateId = Date.now();
  for (let i = 0; i < cart.length; i++) {
    record = {
      id: storyId,
      ProductId: cart[i].id,
      name: cart[i].name,
      price: cart[i].price,
      quantity: cart[i].quantity,
      cost: cart[i].cost,
      date: dateId
    }
    const newRecord = new Record({
      storyId: record.id,
      ProductId: record.ProductId,
      name: record.name,
      price: record.price,
      quantity: record.quantity,
      cost: record.cost,
      date: record.date
    });
    newRecord.save()
      .then(savedRecord => {
        console.log('-------------------NEW MONGO RECORD------------------');
        console.log(savedRecord);
      });
  }
});

module.exports = router;
