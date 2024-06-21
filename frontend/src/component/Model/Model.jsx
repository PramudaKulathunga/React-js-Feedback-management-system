import React, { useState } from 'react';
import './Model.css';
import axios from 'axios';

const Model = ({ isVisible, onClose }) => {
    if (!isVisible) return null;

    const [batchNo, setBatchNo] = useState(localStorage.getItem('batchNoR'));
    const [regNo, setregNo] = useState(localStorage.getItem('regNoR'));
    const [indexNo, setindexNo] = useState(localStorage.getItem('indexNoR'));
    const [semester, setSemester] = useState(localStorage.getItem('semesterR'));

    const handleSubmit = (event) => {
        localStorage.setItem('batchNoR', batchNo);
        localStorage.setItem('regNoR', regNo);
        localStorage.setItem('indexNoR', indexNo);
        localStorage.setItem('semesterR', semester);
        const email = localStorage.getItem('emailR');
        const condition = "edit";

        axios.put(`http://localhost:8081/login/` + email, { condition, batchNo, regNo, indexNo, semester })
            .then(res => console.log("ok"))
            .catch(err => console.log(err));

        onClose();
    }

    return (
        <div className='m1'>

            <div className='m2'>
                <button className='m3' onClick={() => onClose()}>
                    X
                </button>
                <div className='m4'>
                    <label className='label'>Batch No</label>
                    <input type='name' placeholder={localStorage.getItem('batchNoR')} className='inputBox' onChange={(e) => setBatchNo(e.target.value)} />
                    <label className='label'>Regitration No</label>
                    <input type='name' placeholder={localStorage.getItem('regNoR')} className='inputBox' onChange={(e) => setregNo(e.target.value)} />
                    <label className='label'>Index No</label>
                    <input type='name' placeholder={localStorage.getItem('indexNoR')} className='inputBox' onChange={(e) => setindexNo(e.target.value)} />
                    <label className='label'>Semester</label>
                    <input type='name' placeholder={localStorage.getItem('semesterR')} className='inputBox' onChange={(e) => setSemester(e.target.value)} />
                    <button className='saveBtn' onClick={handleSubmit}>Save</button>
                </div>
            </div>

        </div>
    )
}

export default Model