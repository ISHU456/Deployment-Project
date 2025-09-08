import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast';


const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/user');
      if (data.success) {
        setMyOrders(data.orders);
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
        toast.error("Something went wrong while fetching orders");
        console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-8 px-4">
      <div className="w-full max-w-5xl mb-8">
        <p className="text-3xl font-semibold uppercase text-center mb-2 text-primary">My Orders</p>
        <div className="w-24 h-1 bg-primary rounded-full mx-auto"></div>
      </div>

      <div className="flex flex-col w-full items-center">

      {myOrders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        myOrders.map((order, index) => (
          <div key={index} className="border border-gray-300 rounded-lg mb-8 p-4 w-full sm:w-[90%] md:w-[80%] bg-white shadow-md">
            <p className="flex flex-col sm:flex-row justify-between text-gray-500 font-medium mb-4 gap-2">
              <span>OrderId: {order._id}</span>
              <span>Payment: {order.paymentType}</span>
              <span>Total Amount: ₹{order.amount}</span>
            </p>

            {order.items.map((item, i) => (
              <div
                key={i}
                className={`relative text-gray-600 ${
                  order.items.length !== i + 1 ? 'border-b' : ''
                } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-3 md:gap-8 w-full`}
              >
                <div className="flex items-center mb-3 md:mb-0">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <img
                      src={item.product?.image?.[0]}
                      alt=""
                      className="w-14 h-14 sm:w-16 sm:h-16"
                    />
                  </div>
                  <div className="ml-3 sm:ml-5">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {item.product?.name}
                    </h2>
                    <p className="text-sm sm:text-base">Category: {item.product?.category}</p>
                  </div>
                </div>

                <div className="text-primary text-base sm:text-lg font-semibold space-y-1">
                  <p>Quantity: {item.quantity || '1'}</p>
                  <p>Status: {order.status}</p>
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <p className="text-primary text-base sm:text-lg font-semibold mt-3 md:mt-0">
                  Amount: ₹{item.product?.offerPrice * item.quantity}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
      </div>
    </div>
  );
};

export default MyOrders;
