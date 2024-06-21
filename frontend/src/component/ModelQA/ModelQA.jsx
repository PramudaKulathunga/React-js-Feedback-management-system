import React, { useState } from 'react';
import './ModelQA.css';
import axios from 'axios';

const ModelQA = ({ isVisible, onClose, Id, Topic1, Topic2, Group, Question, Condition }) => {
    if (!isVisible) return null;

    const [id, setId] = useState(Id);
    const [question, setQuestion] = useState(Question);
    const [email, setEmail] = useState(Group);

    const handleCourseSubmit = (event) => {
        axios.put(`http://localhost:8081/coursequestion/` + id, { question })
            .then(res => {
                onClose();
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    const handleLecSubmit = (event) => {
        axios.put(`http://localhost:8081/lecturerquestion/` + id, { question })
            .then(res => {
                onClose();
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    const handleFPWSubmit = (event) => {
        const condition = "forgotPwd";

        axios.put(`http://localhost:8081/login/` + email, { condition, question })
            .then(res => {
                onClose();
            })
            .catch(err => console.log(err));

        axios.delete(`http://localhost:8081/forgotpassword/` + id)
            .then(res => {
                window.alert('Password recovery is succeed');
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='m1Q'>

            <div className='m2Q'>
                <button className='m3Q' onClick={() => onClose()}>
                    X
                </button>
                <div className='m4Q'>
                    <label className='labelQ' style={{ marginTop: '20px' }}>{Topic1} : {Group}</label>
                    <label className='labelQ'>{Topic2}</label>
                    <input type='name' placeholder={Question} className='inputBoxQ' onChange={(e) => setQuestion(e.target.value)} />
                    <button className='saveBtnQ' onClick={() => {
                        Condition === "course" ? handleCourseSubmit() :
                            Condition === "lecture" ? handleLecSubmit() :
                                Condition === "forgotPwd" ? handleFPWSubmit() : null
                    }}>Save</button>

                </div>
            </div>

        </div>
    )
}

export default ModelQA