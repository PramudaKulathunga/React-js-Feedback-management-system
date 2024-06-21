import React, { useState } from 'react'
import Header from '../../component/Header/Header';
import './Signup02.css';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedPage from '../AnimatedPage';
import validation from '../../validations/SignUp02Validation';
import axios from 'axios';

function Signup02() {

  const [values, setValues] = useState({
    condition: '',
    name: '',
    email: '',
    password: '',
    password2: '',
    department: '',
    position: '',
    batchNo: '',
    regNo: '',
    indexNo: '',
    semester: ''
  })

  const [error, setError] = useState({})
  const navigate = useNavigate();
  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(validation(values));
    
    values.name = localStorage.getItem('name');
    values.department = localStorage.getItem('department');
    values.position = localStorage.getItem('position');
    values.batchNo = localStorage.getItem('batchNo');
    values.regNo = localStorage.getItem('regNo');
    values.indexNo = localStorage.getItem('indexNo');
    values.semester = localStorage.getItem('semester');

    if (error.email === "" && error.password === "" && error.password2 === "") {
      values.condition = "normal";
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if (res.data[0].email === values.email[0]) {
            alert("Already signup with this email! try with different one.");
          }
          else {
            axios.post('http://localhost:8081/fms/login', values)
              .then(res => {
                navigate('/');
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
            <div className='SignUp02Image'></div>
            <div>
              <p className='SignUp02Title'>Sign up</p>
              <div className='error'>
                {error.email && <span className='text-danger'>{error.email}</span>}
              </div>
              <input type='name' placeholder='Email' className='SignUp02InputBox' onChange={handleInput} name='email' />
              <div className='error'>
                {error.password && <span className='text-danger'>{error.password}</span>}
              </div>
              <input type='password' placeholder='Password' className='SignUp02InputBox' onChange={handleInput} name='password' />
              <div className='error'>
                {error.password2 && <span className='text-danger'>{error.password2}</span>}
              </div>
              <input type='password' placeholder='Confirm password' className='SignUp02InputBox' onChange={handleInput} name='password2' />
              <p className='SignUp02Text1'>Already member?{" "} <Link to="/" className='SignUp02Text2'>Log in</Link></p>
              <div className='SignUp02ButtonBox'>
                <Link to='/Signup03'> <button className='SignUp02Button'>Back</button> </Link>
                <div className='ss'></div>
                <button className='SignUp02Button' onClick={handleSubmit}>Register</button>
              </div>
            </div>
          </div>

          <p />
        </div>

      </div>
    </AnimatedPage>
  )
}

export default Signup02