import React, { useState } from 'react';
import './ModelSubject.css';
import axios from 'axios';

const ModelSubject = ({ isVisible, onClose, Id, Semester, Department, Subject1, Subject2, Subject3, Subject4, Subject5, Subject6, Subject7 }) => {
    if (!isVisible) return null;

    const [id, setId] = useState(Id);
    const [semester, setSemester] = useState(Semester);
    const [department, setDepartment] = useState(Department);
    const [subject1, setSubject1] = useState(Subject1);
    const [subject2, setSubject2] = useState(Subject2);
    const [subject3, setSubject3] = useState(Subject3);
    const [subject4, setSubject4] = useState(Subject4);
    const [subject5, setSubject5] = useState(Subject5);
    const [subject6, setSubject6] = useState(Subject6);
    const [subject7, setSubject7] = useState(Subject7);

    const handleSubmit = (event) => {
        axios.put(`http://localhost:8081/subject/` + id, { semester, department, subject1, subject2, subject3, subject4, subject5, subject6, subject7 })
            .then(res => {
                onClose();
                window.location.reload();
            })
            .catch(err => console.log(err));
    }


    return (
        <div className='m1S'>

            <div className='m2S'>
                <button className='m3S' onClick={() => onClose()}>
                    X
                </button>
                <div className='m4S'>
                    <label className='labelS'>Semester</label>
                    <input type='name' placeholder={Semester} className='inputBoxS' onChange={(e) => setSemester(e.target.value)} />
                    <label className='labelS'>Department</label>
                    <input type='name' placeholder={Department} className='inputBoxS' onChange={(e) => setDepartment(e.target.value)} />
                    <label className='labelS'>Subject1</label>
                    <input type='name' placeholder={Subject1} className='inputBoxS' onChange={(e) => setSubject1(e.target.value)} />
                    <label className='labelS'>Subject2</label>
                    <input type='name' placeholder={Subject2} className='inputBoxS' onChange={(e) => setSubject2(e.target.value)} />
                    <label className='labelS'>Subject3</label>
                    <input type='name' placeholder={Subject3} className='inputBoxS' onChange={(e) => setSubject3(e.target.value)} />
                    <label className='labelS'>Subject4</label>
                    <input type='name' placeholder={Subject4} className='inputBoxS' onChange={(e) => setSubject4(e.target.value)} />
                    <label className='labelS'>Subject5</label>
                    <input type='name' placeholder={Subject5} className='inputBoxS' onChange={(e) => setSubject5(e.target.value)} />
                    <label className='labelS'>Subject6</label>
                    <input type='name' placeholder={Subject6} className='inputBoxS' onChange={(e) => setSubject6(e.target.value)} />
                    <label className='labelS'>Subject7</label>
                    <input type='name' placeholder={Subject7} className='inputBoxS' onChange={(e) => setSubject7(e.target.value)} />
                    <button className='saveBtnS' onClick={handleSubmit}>Add</button>

                </div>
            </div>

        </div>
    )
}

export default ModelSubject