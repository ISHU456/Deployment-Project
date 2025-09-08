import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const PaymentProcessing = () => {
  const { navigate, setCartItems, axios, cartItems, products, setShowUserLogin } = useAppContext();
  const location = useLocation();
  const amount = location.state?.amount;
  const addressId = location.state?.addressId;
  const mode = location.state?.mode; // 'COD' or undefined for online

  const toItemsArray = () => {
    const arr = [];
    for (const key in cartItems) {
      const productId = key.includes('-') ? key.split('-')[0] : key;
      const qty = cartItems[key];
      // optional size unused by backend schema, but keep quantity
      arr.push({ product: productId, quantity: qty });
    }
    return arr;
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        if (!addressId) {
          return navigate('/cart');
        }
        const items = toItemsArray();
        if (!items.length) {
          return navigate('/cart');
        }
        const { data } = mode === 'COD'
          ? await axios.post('/api/order/cod', {
              userId: undefined,
              items: items,
              address: addressId
            })
          : await axios.post('/api/order/demo-online', { items, address: addressId });
        if (!data?.success) {
          const msg = data?.message || '';
          if (msg.toLowerCase().includes('not authorized')) {
            setShowUserLogin(true);
            return navigate('/');
          }
          return navigate('/cart');
        }
        setCartItems({});
        navigate('/my-orders');
      } catch (e) {
        const msg = e?.response?.data?.message || e.message || '';
        if (msg.toLowerCase().includes('not authorized')) {
          setShowUserLogin(true);
          return navigate('/');
        }
        navigate('/cart');
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate, setCartItems, axios]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
        <div className="flex items-center justify-center mb-6">
          <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800">Processing Payment</h1>
        <p className="text-gray-600 mt-2">Please wait while we confirm your payment.</p>
        {amount !== undefined && (
          <p className="text-gray-800 font-medium mt-3">Amount: ₹{amount.toFixed ? amount.toFixed(2) : amount}</p>
        )}
        <p className="text-xs text-gray-400 mt-6">Demo mode • No money is charged</p>
      </div>
    </div>
  )
}

export default PaymentProcessing


