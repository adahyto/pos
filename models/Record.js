const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  storyId: {
    type: String,
    required: true
  },
  ProductId:  {
    type: String,
    required: true
  },
  name:  {
    type: String,
    required: true
  },
  price:  {
    type: Number,
    required: true
  },
  quantity:  {
    type: String,
    required: true
  },
  cost:  {
    type: Number,
    required: true
  },
  date:  {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('records', RecordSchema);
