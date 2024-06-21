import React from 'react'
import Header from '../../component/Header/Header';
import { Link } from 'react-router-dom';
import AnimatedPage from '../AnimatedPage';
import './ContactUs.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faGlobe } from "@fortawesome/free-solid-svg-icons";

const ContactUs = () => {
  return (
    <AnimatedPage>
      <div className='box'>
        <Header />

        <div className='holder'>
          <p />

          <div className='box2'>
            <div className='ContactUsImage'></div>
            <div className='ContactUsBox'>
              <p className='ContactUsTitle'>Contact us</p>
              <br />
              <p className='ContactUsText1'>pramudakulathunga@gmail.com <FontAwesomeIcon icon={faEnvelope} className='Icon'/></p>
              <p className='ContactUsText1'>+94781266460<FontAwesomeIcon icon={faPhone} className='Icon'/></p>
              <p className='ContactUsText1'>https://www.facebook.com /pramudakulathunga<FontAwesomeIcon icon={faGlobe} className='Icon'/></p>
              <div className='ContactUsbuttonBox'>
                <Link to='/'> <button className='ContactUsButton'>Login page</button> </Link>
              </div>
            </div>
          </div>

          <p />
        </div>

      </div>
    </AnimatedPage>
  )
}

export default ContactUs