import db from "@/utils/db";
import Order from "@/models/ordermodel";

export default async function handler(req, res) {
    db.connect();
      if (req.method === 'POST') {
        try {
          const { user, cartitems, shippingadress, totalprice } = req.body;
    
          const newOrder = new Order({
            user,
            cartitems,
            shippingadress,
            totalprice,
          });
    
          const savedOrder = await newOrder.save();
    
          res.status(201).json(savedOrder);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Server Error' });
        }
      } else {
        res.status(405).json({ error: 'Method not allowed' });
      }
      db.disconnect()
    }