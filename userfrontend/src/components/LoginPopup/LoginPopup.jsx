import  { useState,useEffect,useContext } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import {StoreContext} from '../../context/StoreContext'
import {toast} from 'react-toastify'


const LoginPopup = ({setShowLogin}) => {
    const {url,token,setToken} = useContext(StoreContext)
    const [curState, setCurState] = useState("Log In")
    const [data,setData] = useState(
        {
            name:"",
            email:"",
            password:""
        }
    )
    const onChangeHandler = (e)=>{
        const {name,value} = e.target;
        setData({...data,[name]:value})
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        let newUrl = url;
        if (curState === "Log In") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }
    
        try {
            const response = await axios.post(newUrl, data);
            if (curState === "Sign Up") {
                toast.success("Account created successfully! Please log in.");
                setCurState("Log In");
            } else {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message||"An error occured")
        }
    };
    

  return (
    <div className='login-popup'>
        <form onSubmit={onSubmitHandler}  className="login-popup-container">
            <div className="login-popup-title">
                <h2>{curState}</h2>
                <img onClick={() => setShowLogin(false)}src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {curState!=="Log In" ? <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required /> :( <></>)}                
                <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
                <input name="password" onChange={onChangeHandler} value={data.password}  type="password" placeholder='Password' required />
            </div>
            <button type='submit' className='btn'>{curState==="Sign Up"?"Create Account":"Log In"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>
                    By continuing, I agree to the terms & privacy policy.
                </p>
            </div>
            {
                curState==="Log In"
                ?(<p> Create a new account ? <span onClick={() => setCurState("Sign Up")}>Click here</span></p> )
                :(<p> Already have an account ? <span onClick={() => setCurState("Log In")}>Log In here</span></p>)
            }
        </form>
    </div>
  )
}

export default LoginPopup