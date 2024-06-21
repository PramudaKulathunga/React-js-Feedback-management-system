import React from 'react'
import Header from '../../component/Header/Header';
import { Link } from 'react-router-dom';
import AnimatedPage from '../AnimatedPage';
import './RequestSent.css';

const RequestSent = () => {
  return (
    <AnimatedPage>
      <div className='box'>
        <Header />

        <div className='holder'>
          <p />

          <div className='box2'>
            <div className='RequestImage'></div>
            <div className='RequestBox'>
              <p className='RequestTitle'>Request sent</p>
              <br />
              <p className='RequestText1'>An email has been sent to your company<br />Software Engineer. You will receive an<br />email within 24 working hours. If you<br /> have any doubt{" "} <Link to="/ContactUs" className='RequestText2'>Contact Us</Link></p>
              <div className='buttonBox'>
                <Link to='/'> <button className='RequestButton'>Login page</button> </Link>
              </div>
            </div>
          </div>

          <p />
        </div>

      </div>
    </AnimatedPage>
  )
}

export default RequestSent