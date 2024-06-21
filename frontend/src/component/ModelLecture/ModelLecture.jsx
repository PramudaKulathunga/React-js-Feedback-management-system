import React, { useState } from 'react';
import './ModelLecture.css';
import axios from 'axios';

const ModelLecture = ({ isVisible, onClose, Id, LecId, Name, Position, Department, Condition }) => {
    if (!isVisible) return null;

    const [id, setId] = useState(Id);
    const [lecId, setLecId] = useState(LecId);
    const [name, setName] = useState(Name);
    const [position, setPosition] = useState(Position);
    const [department, setDepartment] = useState(Department);

    const handleSubmit = (event) => {
        axios.put(`http://localhost:8081/lecturerdetails/` + id, { lecId, name, position, department })
            .then(res => {
                onClose();
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    const handleAddSubmit = (event) => {
        axios.post('http://localhost:8081/fms/lecturerdetails', { lecId, name, position, department })
            .then(res => {
                onClose();
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='m1L'>

            <div className='m2L'>
                <button className='m3L' onClick={() => onClose()}>
                    X
                </button>
                <div className='m4L'>
                    <label className='labelL'>Lecture id</label>
                    <input type='name' placeholder={LecId} className='inputBoxL' onChange={(e) => setLecId(e.target.value)} />
                    <label className='labelL'>Name</label>
                    <input type='name' placeholder={Name} className='inputBoxL' onChange={(e) => setName(e.target.value)} />
                    <label className='labelL'>Position</label>
                    <input type='name' placeholder={Position} className='inputBoxL' onChange={(e) => setPosition(e.target.value)} />
                    <label className='labelL'>Department</label>
                    <input type='name' placeholder={Department} className='inputBoxL' onChange={(e) => setDepartment(e.target.value)} />
                    {Condition === "add" ? <button className='saveBtnL' onClick={handleAddSubmit}>Add</button> : <button className='saveBtnN' onClick={handleSubmit}>Save</button>}
                </div>
            </div>

        </div>
    )
}

export default ModelLecture