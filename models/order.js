const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./itemSchema');

const lineItemSchema = new Schema({
  qty: { type: Number, default: 1 },
  item: itemSchema
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

lineItemSchema.virtual('extPrice').get(function() {
  return this.qty * this.item.price;
})

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  lineItems: [lineItemSchema],
  isPaid: {type: Boolean, default: false },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

orderSchema.statics.getUserOrders = async function(userId) {
  return this.find({ user: userId, isPaid: true });
}

orderSchema.statics.getCart = async function(userId) {
  return this.findOneAndUpdate(
    { user: userId, isPaid: false },
    { user: userId },
    { upsert: true, new: true },
  )
}

orderSchema.methods.addItemToCart = async function(itemId) {
  const cart = this;
  const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
  if(lineItem) {
    lineItem.qty += 1;
  } else {
    const item = await mongoose.model('Item').findById(itemId);
    cart.lineItems.push({ item })
  }
  return cart.save()
}

module.exports = mongoose.model('Order', orderSchema)