import React, { useState } from 'react';
import './ModelNotice.css';
import axios from 'axios';

const ModelNotice = ({ isVisible, onClose, Id, Code, Notice, Status, Condition }) => {
    if (!isVisible) return null;

    const [id, setId] = useState(Id);
    const [code, setCode] = useState(Code);
    const [notice, setNotice] = useState(Notice);
    const [status, setstatus] = useState(Status);

    const handleSubmit = (event) => {
        axios.put(`http://localhost:8081/notice/` + id, { code, notice, status })
            .then(res => {
                onClose();
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    const handleAddSubmit = (event) => {
        axios.post('http://localhost:8081/fms/notice', { code, notice, status })
            .then(res => {
                onClose();
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='m1N'>

            <div className='m2N'>
                <button className='m3N' onClick={() => onClose()}>
                    X
                </button>
                <div className='m4N'>
                    <label className='labelN'>Code</label>
                    <input type='name' placeholder={Code} className='inputBoxN' onChange={(e) => setCode(e.target.value)} />
                    <label className='labelN'>Notice</label>
                    <input type='name' placeholder={Notice} className='inputBoxN' onChange={(e) => setNotice(e.target.value)} />
                    <label className='labelN'>Staus</label>
                    <input type='name' placeholder={Status} className='inputBoxN' onChange={(e) => setstatus(e.target.value)} />
                    {Condition === "add" ? <button className='saveBtnN' onClick={handleAddSubmit}>Add</button> : <button className='saveBtnN' onClick={handleSubmit}>Save</button>}

                </div>
            </div>

        </div>
    )
}

export default ModelNotice