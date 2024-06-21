import React, { useState } from 'react'
import Header from '../../component/Header/Header';
import './Signup03.css';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedPage from '../AnimatedPage';
import validation from '../../validations/SignUpValidation';
import BatchSelector from '../../component/BatchSelector/BatchSelector';
import SemSelector from '../../component/SemSelector/SemSelector';

const Signup03 = () => {

    const [values, setValues] = useState({
        regNo: '',
        indexNo: ''
    })

    const [error, setError] = useState({})
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(validation(values));
        localStorage.setItem('regNo', values.regNo);
        localStorage.setItem('indexNo', values.indexNo);
        if (error.regNo === "" && error.indexNo === "") {
            navigate('/Signup02');
        }
    }

    return (
        <AnimatedPage>
            <div className='box'>
                <Header />

                <div className='holder'>
                    <p />

                    <div className='box3'>
                        <div>
                            <p className='SignUp03Title'>Sign up</p>
                            <div className='error3'>
                                {error.regNo && <span className='text-danger'>{error.regNo}</span>}
                            </div>
                            <input type='name' placeholder='Registration number' className='SignUp03InputBox' onChange={handleInput} name='regNo' />

                            <div className='error3'>
                                {error.indexNo && <span className='text-danger'>{error.indexNo}</span>}
                            </div>
                            <input type='name' placeholder='Index number' className='SignUp03InputBox' onChange={handleInput} name='indexNo' />
                            <br />
                            <div className='batchSelector'>
                                <div style={{display:'flex',flexDirection:'row'}}>
                                    <BatchSelector />
                                    <SemSelector Condition={"normal"}/>
                                </div>
                                <p className='SignUp03Text1'>Already member?{" "} <Link to="/" className='SignUp03Text2'>Log in</Link></p>
                            </div>
                            <div className='SignUp03ButtonBox'>
                                <Link to='/Signup01'> <button className='SignUp03Button'>Back</button> </Link>
                                <div className='ss'></div>
                                <button className='SignUp03Button' onClick={handleSubmit}>Continue</button>
                            </div>                        </div>
                        <div className='SignUp03Image'></div>
                    </div>

                    <p />
                </div>

            </div>
        </AnimatedPage>
    )
}

export default Signup03