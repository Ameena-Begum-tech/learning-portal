import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userData } from '../../Context/UserContext';
import ReCAPTCHA from "react-google-recaptcha";

const Verify = () => {
  const[otp,setOtp]=useState("");
  const {btnloading, verifyOtp}=userData();
  const navigate=useNavigate();
 const [show, setShow]=useState(false)

  function onChange(value) {
  console.log("Captcha value:", value);
  setShow(true)
}

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp),navigate)
  };

  return (
    <div className="auth-page">
        <div className="auth-form">
            <h2>Verify Account</h2>
            <form onSubmit={submitHandler}>
                <label htmlFor="otp">Verification Code</label>
                <input type="number" id="otp" name="otp" 
                value={otp}
                onChange={(e)=>setOtp(e.target.value)}
                required />
                <ReCAPTCHA
    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
    onChange={onChange}
  />,
               {show &&
               
               (<button type="submit" 
               disabled={btnloading}
               className='common-btn'>{btnloading ? "Verifying..." : "Verify"}</button>)}
            </form>
            <p>
                Go to <Link to='/login'>Login</Link> page
            </p>
        </div>
    </div>
  )
}

export default Verify


