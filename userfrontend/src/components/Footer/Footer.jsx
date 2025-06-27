import React from 'react'
import './Footer.css'
import {assets} from '../../assets/assets.js'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-left">
                <img className='footer-logo' src={assets.logo_bottom} alt="" />
                <p>Food Prep is a full-stack project designed for hands-on teaching, helping students learn full-stack development.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Courses</li>
                    <li>Reviews</li>
                </ul>
            </div>
            <div className="footer-right">
                <h2>Get in touch</h2>
                <ul>
                    <li>+91 9014935546</li>
                    <li>praneeth.23bce9683@vitapstudent.ac.in</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2025 ©  FoodPrep. All rights reserved.</p>
    </div>
  )
}

export default Footer