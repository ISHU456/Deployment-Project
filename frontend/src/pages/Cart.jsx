import React,{useState,useEffect} from 'react'
import { useAppContext } from '../context/AppContext';
import { assets, dummyAddress } from '../assets/assets';
import toast from 'react-hot-toast';

const Cart = () => {
    const {products,cartItems,removeFromCart,getCartCount,updateCartItems,navigate,getCartAmount,axios,user,setCartItems} = useAppContext();
    const [cartArray,setCartArray] = useState([]);
    const [addresses,setAddresses] = useState([]);

    const [showAddress,setShowAddress] = useState(false);
    const [selectedAddress,setSelectedAddress] = useState(null);
    const [paymentOption,setPaymentOption] = useState("COD");

    const getCart = ()=>{
        let tempArray = [];
        for(const key in cartItems){
            // Extract product ID and size from key
            const itemId = key.includes('-') ? key.split('-')[0] : key;
            const size = key.includes('-') ? key.split('-')[1] : null;
            
            const product = products.find((item)=> item._id === itemId);
            if(product) {
                const cartItem = {
                    ...product,
                    quantity: cartItems[key],
                    size: size,
                    cartKey: key
                };
                tempArray.push(cartItem);
            }
        }
        setCartArray(tempArray);
    };
    const getUserAddress = async()=>{
        try{
            const {data} = await axios.get('/api/address/get');
            if(data.success){
                setAddresses(data.addresses);
                if(data.addresses.length>0){
                    setSelectedAddress(data.addresses[0]);
                }
                else{
                    toast.error(data.message)
                }
            }
        }
        catch(error){
            toast.error(error.message)

        }
    }
    useEffect(()=>{
        if(user){
            getUserAddress();
        }
    },[user])
 
    useEffect(()=>{
        if(products.length>0 && cartItems){
            getCart(cartArray);
        }
    },[products,cartItems])
//very important
    const placeOrder = async()=>{
        try {
            if(!selectedAddress){
                return toast.error('please select and address')
            }
            //place order with cod via loading screen
            if(paymentOption =="COD"){
                const total = (getCartAmount() + getCartAmount() * 2 / 100);
                navigate('/processing', { state: { amount: total, addressId: selectedAddress?._id, mode: 'COD' } });
            } else if (paymentOption === 'Online') {
                // Demo: navigate to processing screen with amount and selected address id
                const total = (getCartAmount() + getCartAmount() * 2 / 100);
                navigate('/processing', { state: { amount: total, addressId: selectedAddress?._id } });
            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }


    return (products.length > 0 && cartItems ? (
  <div className="flex flex-col md:flex-row gap-8 mt-20 px-2 md:px-0 max-w-7xl mx-auto justify-center">
    {/* Cart Items */}
    <div className="flex-1 max-w-3xl bg-white rounded-xl shadow-md p-6">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        Shopping Cart
        <span className="text-base bg-primary/10 text-primary px-3 py-1 rounded-full">{getCartCount()}</span>
      </h1>

      {/* Warning for clothing products without sizes */}
      {cartArray.some(product =>
        (product.category === 'MEN' || product.category === 'Women' || product.category === 'Kids') &&
        (!product.sizes || product.sizes.length === 0)
      ) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-yellow-800 text-sm">
            ⚠️ Some clothing products in your cart don't have size information.
            Please contact the seller to add sizes to these products.
          </p>
        </div>
      )}

      <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-semibold pb-3 border-b border-gray-200">
        <p className="text-left">Product Details</p>
        <p className="text-center">Subtotal</p>
        <p className="text-center">Action</p>
      </div>

      <div className="divide-y divide-gray-100">
        {cartArray.map((product, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4 items-center py-5">
            <div className="flex items-center gap-4">
              <div
                onClick={() => {
                  navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-20 h-20 flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50 hover:shadow"
              >
                <img className="max-w-full h-full object-cover rounded" src={product.image[0]} alt={product.name} />
              </div>
              <div>
                <p className="font-semibold text-lg">{product.name}</p>
                <div className="font-normal text-gray-500/80 text-sm space-y-1">
                  {product.size && (
                    <p>Size: <span className="font-medium">{product.size}</span></p>
                  )}
                  {product.sizes && product.sizes.length > 0 && !product.size && (
                    <p>Size: <span className="font-medium text-red-500">Please select size</span></p>
                  )}
                  <p>Weight: <span>{product.weight || "N/A"}</span></p>
                  <div className='flex items-center gap-2'>
                    <p>Qty:</p>
                    <select
                      className='outline-none border border-gray-300 rounded px-2 py-1'
                      onChange={(e) => updateCartItems(product.cartKey, Number(e.target.value))}
                      value={cartItems[product.cartKey]}
                    >
                      {Array(cartItems[product.cartKey] > 9 ? cartItems[product.cartKey] : 9).fill('').map((_, idx) => (
                        <option key={idx} value={idx + 1}>{idx + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-lg font-semibold text-gray-700">₹{product.offerPrice * product.quantity}</p>
            <button
              onClick={() => removeFromCart(product.cartKey)}
              className="mx-auto flex items-center justify-center bg-red-50 hover:bg-red-100 rounded-full p-2 transition"
              title="Remove"
            >
              <img src={assets.remove_icon} alt="remove" className='w-6 h-6' />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => { navigate("/products"); scrollTo(0, 0); }}
        className="group flex items-center mt-8 gap-2 text-primary font-semibold hover:underline"
      >
        <img src={assets.arrow_right_icon_colored} alt="arrow" className="group-hover:translate-x-1 transition" />
        Continue Shopping
      </button>
    </div>

    {/* Order Summary */}
    <div className="max-w-[380px] w-full bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <hr className="border-gray-200 mb-5" />

      <div className="mb-6">
        <p className="text-xs font-semibold uppercase text-gray-500">Delivery Address</p>
        <div className="relative flex justify-between items-start mt-2">
          <p className="text-gray-700 text-sm max-w-[200px] truncate">
            {selectedAddress
              ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
              : "No address found"}
          </p>
          <button
            onClick={() => setShowAddress(!showAddress)}
            className="text-primary hover:underline text-xs font-medium ml-2"
          >
            Change
          </button>
          {showAddress && (
            <div className="absolute top-10 left-0 z-10 w-full bg-white border border-gray-200 rounded shadow-lg">
              {addresses.map((address, idx) => (
                <p
                  key={idx}
                  onClick={() => { setSelectedAddress(address); setShowAddress(false); }}
                  className="text-gray-700 p-2 hover:bg-primary/10 cursor-pointer rounded"
                >
                  {address.street}, {address.city}, {address.state}, {address.country}
                </p>
              ))}
              <p
                onClick={() => navigate('/add-address')}
                className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10 rounded"
              >
                Add address
              </p>
            </div>
          )}
        </div>

        <p className="text-xs font-semibold uppercase text-gray-500 mt-6">Payment Method</p>
        <select
          onChange={e => setPaymentOption(e.target.value)}
          className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none rounded"
        >
          <option value="COD">Cash On Delivery</option>
          <option value="Online">Online Payment</option>
        </select>
      </div>

      <hr className="border-gray-200" />

      <div className="text-gray-700 mt-4 space-y-2 text-base">
        <p className="flex justify-between">
          <span>Price</span><span>₹{getCartAmount()}</span>
        </p>
        <p className="flex justify-between">
          <span>Shipping Fee</span><span className="text-green-600">Free</span>
        </p>
        <p className="flex justify-between">
          <span>Tax (2%)</span><span>₹{(getCartAmount() * 2 / 100).toFixed(2)}</span>
        </p>
        <p className="flex justify-between text-lg font-bold mt-3">
          <span>Total</span><span>₹{(getCartAmount() + getCartAmount() * 2 / 100).toFixed(2)}</span>
        </p>
      </div>

      <button
        onClick={placeOrder}
        className="w-full py-3 mt-6 bg-gradient-to-r from-primary to-blue-500 text-white font-semibold rounded-lg shadow hover:from-blue-600 hover:to-primary transition"
      >
        {paymentOption === 'COD' ? "Place Order" : "Pay Online (Demo)"}
      </button>
    </div>
  </div>
) : null)
}

export default Cart;