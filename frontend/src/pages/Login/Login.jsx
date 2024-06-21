import React, { useState } from 'react'
import Header from '../../component/Header/Header';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedPage from '../AnimatedPage';
import validation from '../../validations/LoginValidation';
import axios from 'axios';

const Login = () => {

  const [values, setValues] = useState({
    condition: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState({})
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(validation(values));
 

    if (error.email === "" && error.password === "") {
      values.condition = "normal";
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if (res.data[0].position === "Student") {
            localStorage.setItem('emailR', res.data[0].email);
            localStorage.setItem('passwordR', res.data[0].password);
            navigate('/Home_STD');
          }
          else if (res.data[0].position === "Management Assistant" || res.data[0].position === "Lecturer") {
            localStorage.setItem('emailR', res.data[0].email);
            localStorage.setItem('passwordR', res.data[0].password);
            navigate('/Home_MA');
          }
          else {
            alert("No record exists! Please signup");
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
            <div className='LoginImage'></div>
            <div>
              <p className='LoginTitle'>Login</p>
              <div className='error'>
                {error.email && <span className='text-danger'>{error.email}</span>}
              </div>
              <input type='name' placeholder='Email' className='LoginInputBox' onChange={handleInput} name='email' />
              <br />
              <div className='error'>
                {error.password && <span className='text-danger'>{error.password}</span>}
              </div>
              <input type='password' placeholder='Password' className='LoginInputBox' onChange={handleInput} name='password' />
              <br />
              
              <Link to='/FogotPassword' className='LoginText2'>Forgot password?</Link>
              <p className='LoginText1'>No account ! <Link to="/Signup01" className='LoginText2'>Create one</Link></p>
              <button onClick={handleSubmit} className='LoginButton'>Login</button>
            </div>
          </div>

          <p />
        </div>

      </div>
    </AnimatedPage>
  );
}

export default Login