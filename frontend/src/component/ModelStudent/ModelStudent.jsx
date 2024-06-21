import React, { useState } from 'react';
import './ModelStudent.css';
import axios from 'axios';

const ModelStudent = ({ isVisible, onClose, Id, Name, Email, Department, BatchNo, RegNo, IndexNo, Semester }) => {
    if (!isVisible) return null;

    const [id, setId] = useState(Id);
    const [name, setName] = useState(Name);
    const [email, setEmail] = useState(Email);
    const [department, setDepartment] = useState(Department);
    const [batchNo, setBatchNo] = useState(BatchNo);
    const [regNo, setRegNo] = useState(RegNo);
    const [indexNo, setIndexNo] = useState(IndexNo);
    const [semester, setSemester] = useState(Semester);

    const handleSubmit = (event) => {
        const condition = "editAdmin";
        axios.put(`http://localhost:8081/login/` + email, { condition, name, department, batchNo, regNo, indexNo, semester })
            .then(res => {
                onClose();
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='m1SS'>

            <div className='m2SS'>
                <button className='m3SS' onClick={() => onClose()}>
                    X
                </button>
                <div className='m4SS'>
                    <label className='labelSS'>Name</label>
                    <input type='name' placeholder={Name} className='inputBoxSS' onChange={(e) => setName(e.target.value)} />
                    <label className='labelSS'>Department</label>
                    <input type='name' placeholder={Department} className='inputBoxSS' onChange={(e) => setDepartment(e.target.value)} />
                    <label className='labelSS'>Batch number</label>
                    <input type='name' placeholder={BatchNo} className='inputBoxSS' onChange={(e) => setBatchNo(e.target.value)} />
                    <label className='labelSS'>Registration number</label>
                    <input type='name' placeholder={RegNo} className='inputBoxSS' onChange={(e) => setRegNo(e.target.value)} />
                    <label className='labelSS'>Index number</label>
                    <input type='name' placeholder={IndexNo} className='inputBoxSS' onChange={(e) => setIndexNo(e.target.value)} />
                    <label className='labelSS'>Semester</label>
                    <input type='name' placeholder={Semester} className='inputBoxSS' onChange={(e) => setSemester(e.target.value)} />
                    <button className='saveBtnSS' onClick={handleSubmit}>Add</button>

                </div>
            </div>

        </div>
    )
}

export default ModelStudent