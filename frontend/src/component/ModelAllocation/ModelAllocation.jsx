import React, { useState } from 'react';
import './ModelAllocation.css';
import axios from 'axios';

const ModelAllocation = ({ isVisible, onClose, Id, I, Course, Lecturer }) => {
    if (!isVisible) return null;

    const [id, setId] = useState(Id);
    const [i,setI] = useState(I);
    const [lecture, setLecturer] = useState(Lecturer);

    const handleSubmit = (event) => {
        axios.put(`http://localhost:8081/teacher/` + id, { i, lecture })
            .then(res => {
                onClose();
                window.location.reload();
            })
            .catch(err => console.log(err));
    }


    return (
        <div className='m1Al'>

            <div className='m2Al'>
                <button className='m3Al' onClick={() => onClose()}>
                    X
                </button>
                <div className='m4Al'>
                    <label className='labelAl'>Course</label>
                    <label className='labelAl'>{Course}</label>
                    <label className='labelAl'>Lecturer</label>
                    <input type='name' placeholder={Lecturer} className='inputBoxAl' onChange={(e) => setLecturer(e.target.value)} />
                    <button className='saveBtnAl' onClick={handleSubmit}>Save</button>

                </div>
            </div>

        </div>
    )
}

export default ModelAllocation