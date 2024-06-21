import React, { useState } from 'react'
import Header from '../../component/Header/Header';
import './ForgotPassword.css';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedPage from '../AnimatedPage';
import validation from '../../validations/FogotPwValidation';
import axios from 'axios';

const ForgotPassword = () => {
  const [values, setValues] = useState({
    condition: '',
    email: '',
  })

  const [error, setError] = useState({})
  const navigte = useNavigate();

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(validation(values));
    if (error.email === "") {
      values.condition = "check";
      axios.post('http://localhost:8081/forgotpassword', values)
        .then(res => {
          if (res.data === "available") {
            alert("Request already sent. Please wait for verify by management assistant")
          }
          else {
            axios.post('http://localhost:8081/fms', values)
              .then(res => {
                navigte('/RequestSent');
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <AnimatedPage>
      <div className='box'>
        <Header />

        <div className='holder'>
          <p />

          <div className='box2'>
            <div className='ForgotPwdImage'></div>
            <div className='ForgotPwdDetalBox'>
              <p className='ForgotPwdTitle'>Forgot password</p>
              <div className='error'>
                {error.email && <span className='text-danger'>{error.email}</span>}
              </div>
              <input type='name' placeholder='Email' className='ForgotPwdInputbox' onChange={handleInput} name='email' />
              <br />
              <p className='ForgotPwdText1'>If you have any doubt{" "}<Link to="/ContactUs" className='ForgotPwdText2'>Contact us</Link></p>
              <br />
              <button className='ForgotPwdButton' onClick={handleSubmit}>Request password</button>
            </div>
          </div>

          <p />
        </div>

      </div>
    </AnimatedPage>
  );
}

export default ForgotPassword