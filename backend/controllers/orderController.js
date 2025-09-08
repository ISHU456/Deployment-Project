import Order from "../models/Order.js";
import Product from "../models/Product.js";
// Demo online order (no real gateway)

// place order cod: /api/product/cod
export const placeOrderCOD = async(req,res)=>{
    try{
        const {userId} = req;
        const {items,address} = req.body;
        if(!address||items.length==0){
            return res.json({success:false,message:"Invalid data"})
        }
        let amount = await items.reduce(async(acc,item)=>{
            const product = await Product.findById(item.product);
            return (await acc) +product.offerPrice * item.quantity;
        },0)
        //add tax change 2%
        amount += Math.floor(amount*0.02);
        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType:'cod'
        });
        return res.json({success:true,message:'order Places successfully'})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//get Orders by User Id:/api/order/user

export const getUserOrders =async(req,res)=>{
    try{
        const {userId} = req;
        const orders = await Order.find({
            userId,
            $or:[{paymentType:"cod"},{isPaid:true}]
        }).populate("items.product").populate("address").sort({createdAt:-1});
        res.json({success:true,orders})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

//get Orders by User(for seller / admin):/api/order/seller

export const getAllOrders =async(req,res)=>{
    try{
        const orders = await Order.find({
            $or:[{paymentType:"cod"},{isPaid:true}]
        }).populate("items.product").populate("address");
        res.json({success:true,orders})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

// Update Order Status: /api/order/status/:orderId
export const updateOrderStatus = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
  
      if (!status) {
        return res.status(400).json({ success: false, message: "Status is required" });
      }

      // Validate status
      const validStatuses = ['Order placed', 'Processing', 'Shipped', 'Out for delivery', 'Delivered', 'Cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status" });
      }
  
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
  
      order.status = status;
      await order.save();
  
      res.json({ success: true, message: "Order status updated successfully", order });
    } catch (error) {
      console.error("Update Order Error:", error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };

// place order ONLINE DEMO: /api/order/demo-online
export const placeOrderOnlineDemo = async (req, res) => {
    try {
        const { userId } = req;
        const { items, address } = req.body;
        if (!address || !items || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" });
        }

        // Compute amount safely
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.json({ success: false, message: "Invalid product in cart" });
            }
            amount += product.offerPrice * item.quantity;
        }
        amount += Math.floor(amount * 0.02); // demo tax 2%

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: 'online (demo)',
            isPaid: true,
            status: 'Order placed'
        });

        return res.json({ success: true, message: 'Demo payment: order placed successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
  