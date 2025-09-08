import express from 'express'
import authUser from '../middlewares/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD, updateOrderStatus, placeOrderOnlineDemo } from '../controllers/orderController.js';
import authSeller from '../middlewares/authSeller.js';
const orderRouter = express.Router();

orderRouter.post('/cod',authUser,placeOrderCOD);
orderRouter.post('/demo-online', authUser, placeOrderOnlineDemo);
orderRouter.get('/user',authUser,getUserOrders);
orderRouter.get('/seller',authSeller,getAllOrders);
orderRouter.patch('/status/:orderId', authSeller, updateOrderStatus);


export default orderRouter;


