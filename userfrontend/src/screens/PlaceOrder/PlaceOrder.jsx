import {useContext, useState,useEffect} from 'react'
import {StoreContext} from '../../context/StoreContext'
import './PlaceOrder.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const PlaceOrder = () => {
  const [data,setData]=useState({
    first_name:"",
    last_name:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zip_code:"",
    country:"",
    phone:""
  })
  const navigate=useNavigate()
  const {getTotalCartAmount,food_list,cartItems,url,token} = useContext(StoreContext)
  const onChangeHandler=(e)=>{
    const {name,value}=e.target
    setData({...data,[name]:value})
  }
const onSubmitHandler=async(e)=>{
  e.preventDefault();
  let orderItem=[];
  food_list.map((item)=>{
    if(cartItems[item._id]>0){
      let itemInfo={...item};
      itemInfo.quantity=cartItems[item._id]
      orderItem.push(itemInfo)
    }
  })
  let orderData={
    address:data,
    items:orderItem,
    amount:getTotalCartAmount()+20
  }
  try {
    let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    const {session_url}=response.data
    window.location.replace(session_url)
  } catch (error) {
    console.log(error)
    
  }
}
useEffect(()=>{
  if(!token){
    navigate('/cart')
  }else if(getTotalCartAmount()===0){
    navigate('/cart')
  }
})
  return (
    <form onSubmit={onSubmitHandler}className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input name='first_name' required type="text" value={data.first_name} onChange={onChangeHandler} placeholder='First Name'/>
          <input name='last_name' required type="text" value={data.last_name} onChange={onChangeHandler} placeholder='Last Name'/>
        </div>
        <input name='email'required type="email" value={data.email} onChange={onChangeHandler}  placeholder='Email address' />
        <input name='street' required type="text" value={data.street} onChange={onChangeHandler} placeholder='Street' />
        <div className="multi-fields">
          <input name='city' required type="text" value={data.city} onChange={onChangeHandler} placeholder='City'/>
          <input name='state' required type="text" value={data.state} onChange={onChangeHandler} placeholder='State'/>
        </div><div className="multi-fields">
          <input name='zip_code'required type="text" value={data.zip_code} onChange={onChangeHandler} placeholder='Zip code'/>
          <input name='country'required type="text" value={data.country} onChange={onChangeHandler} placeholder='Country'/>
        </div>
        <input name='phone'required type="text" value={data.phone} onChange={onChangeHandler}placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{!getTotalCartAmount()?0:20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{!getTotalCartAmount()?0:getTotalCartAmount()+20}</p>
            </div>
          </div>
          <button>Proceed to Payment</button>
        </div>
      </div>
      
    </form>
  )
}

export default PlaceOrder