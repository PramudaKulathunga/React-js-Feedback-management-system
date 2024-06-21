import React, { useState } from 'react'
import Header from '../../component/Header/Header';
import './Signup01.css';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedPage from '../AnimatedPage';
import PositionSelector from '../../component/PositionSelector/PositionSelector';
import DepartmentSelector from '../../component/DepartmentSelector/DepartmentSelector';
import validation from '../../validations/SignUpValidation';

const Signup01 = () => {

  const [values, setValues] = useState({
    name: '',
  })

  const [error, setError] = useState({})
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(validation(values));
    localStorage.setItem('name', values.name);
    if (error.name === "") {
      navigate('/Signup03');
    }
  }

  return (
    <AnimatedPage>
      <div className='box'>
        <Header />

        <div className='holder'>
          <p />

          <div className='box2'>
            <div>
              <p className='SignUp01Title'>Sign up</p>
              <div className='error2'>
                {error.name && <span className='text-danger'>{error.name}</span>}
              </div>
              <input type='name' placeholder='Name' className='SignUp01InputBox' onChange={handleInput} name='name' />
              <br />
              <div className='positionSelector'>
                <DepartmentSelector Condition={"normal"}/>
                <br />
                <PositionSelector />
                <p className='SignUp01Text1'>Already member?{" "} <Link to="/" className='SignUp01Text2'>Log in</Link></p>
              </div>
              <button className='SignUp01Button' onClick={handleSubmit}>Continue</button>
            </div>
            <div className='SignUp01Image'></div>
          </div>

          <p />
        </div>

      </div>
    </AnimatedPage>
  )
}

export default Signup01