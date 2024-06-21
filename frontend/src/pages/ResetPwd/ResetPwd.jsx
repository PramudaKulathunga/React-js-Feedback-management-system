import React, { useState } from 'react'
import './ResetPwd.css';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedPage from '../AnimatedPage';
import validation from '../../validations/SignUp02Validation';
import axios from 'axios';
import Header_STD from '../../component/Header_STD/Header_STD';
import Header_MA from '../../component/Header_MA/Header_MA';

function ResetPwd() {

  const [values, setValues] = useState({
    password: '',
    password2: '',
  })

  const [error, setError] = useState({})
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(validation(values));

    if (error.password === "" && error.password2 === "") {
      const email = localStorage.getItem('emailR');
      const condition = "resetPwd";
      const password = values.password[0];
      const password2 = values.password2[0];
      localStorage.setItem('passwordR',values.password[0]);

      axios.put(`http://localhost:8081/login/` + email, { condition, password, password2 })
        .then(res =>
          localStorage.getItem('positionR') === 'Student' ? navigate('/Home_STD') : navigate('/Home_MA')
        )
        .catch(err => console.log(err));

    }
  }

  const backSubmit = () => {
    localStorage.getItem('positionR') === 'Student' ? navigate('/Home_STD') : navigate('/Home_MA');
  }

  return (
    <AnimatedPage>
      <div className='box'>
        {localStorage.getItem('positionR') === 'Student' ? <Header_STD /> : <Header_MA />}

        <div className='holder'>
          <p />

          <div className='boxReset'>
            <div className='ResetPwdImage'></div>
            <div>
              <p className='ResetPwdTitle'>Reset Password</p>
              <p className='emailText'>{localStorage.getItem('emailR')}</p>
              <div className='error2'>
                {error.password && <span className='text-danger'>{error.password}</span>}
              </div>
              <input type='password' placeholder='Password' className='ResetPwdInputBox' onChange={handleInput} name='password' />
              <div className='error2'>
                {error.password2 && <span className='text-danger'>{error.password2}</span>}
              </div>
              <input type='password' placeholder='Confirm password' className='ResetPwdInputBox' onChange={handleInput} name='password2' />
              <div className='ResetPwdButtonBox'>
                <button className='ResetPwdButton' onClick={backSubmit}>Back</button>
                <div className='ss'></div>
                <button className='ResetPwdButton' onClick={handleSubmit}>Reset</button>
              </div>
            </div>
          </div>

          <p />
        </div>

      </div>
    </AnimatedPage>
  )
}

export default ResetPwd