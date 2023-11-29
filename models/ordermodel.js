import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user : {type:String, required: false},
  cartitems: [
    {
      _id : { type: String, required: false },
      createdAt: { type: String, required: false },
      name: { type: String, required: false },
      price: { type: Number, required: false },
      slug: { type: String, required: false },
      image: { type: String, required: false },
      quantity: { type: Number, required: false },
      instock: { type: Number, required: false },
      updatedAt: {type: Date, required: false},
    },],
    shippingadress: {
      housenumber: { type: String, required: false },
      street: { type: String, required: false },
      state: { type: String, required: false },
      province: { type: String, required: false },
      country: { type: String, required: false },
    },
    totalprice : {type : Number, required: false},
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;