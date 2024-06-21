import React, { useState, useEffect } from 'react'
import './FeedbackPage.css';
import { Link } from 'react-router-dom';
import AnimatedPage from '../AnimatedPage';
import Header_MA from '../../component/Header_MA/Header_MA';
import axios from 'axios';
import Footer from '../../component/Footer/Footer';
import SemSelector from '../../component/SemSelector/SemSelector';

const FeedbackPage = () => {

    const [records, setRecords] = useState([]);
    const [records2, setRecords2] = useState([]);
    const [disText, setDisText] = useState("");
    const [disText2, setDisText2] = useState("");

    useEffect(() => {
        setterData();
    }, [])

    const setterData = () => {
        const value1 = localStorage.getItem('semesterCF') === null ? "Semester 01" : localStorage.getItem('semesterCF');
        axios.post('http://localhost:8081/coursefeedback', { value1 })
            .then(res => {
                setRecords(res.data)
                if (res.data.length === 0) {
                    setDisText("No feedback is available")
                }
            })
            .catch(err => console.log(err));

        const value2 = localStorage.getItem('semesterLF') === null ? "Semester 01" : localStorage.getItem('semesterLF');
        axios.post('http://localhost:8081/lecturerfeedback', { value2 })
            .then(res => {
                setRecords2(res.data)
                if (res.data.length === 0) {
                    setDisText2("No feedback is available")
                }
            })
            .catch(err => console.log(err));
    }

    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this notice?");
        if (isConfirmed) {
            axios.delete(`http://localhost:8081/coursefeedback/` + id)
                .then(res => {
                    window.alert('Notice deleted successfully');
                    window.location.reload();
                })
                .catch(err => console.log(err));
        }
    };

    const handleDelete2 = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this notice?");
        if (isConfirmed) {
            axios.delete(`http://localhost:8081/lecturerfeedback/` + id)
                .then(res => {
                    window.alert('Notice deleted successfully');
                    window.location.reload();
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <AnimatedPage>
            <div className='boxFBD'>
                <Header_MA />

                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '100px', marginBottom: '-80px', marginRight: '70px' }}>
                        <p className='CFtext2'>-2	:	Strongly Disagree</p>
                        <p className='CFtext2'>-1	:	Disagree</p>
                        <p className='CFtext2'>0	:	Not Sure</p>
                        <p className='CFtext2'>+1	:	Agree</p>
                        <p className='CFtext2'>+2	:	Strongly Agree</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <p className='titleFDB' style={{ marginTop: '100px' }}>Course Feedback</p>
                        <Link to="/Home_MA"><button className='backBtn'>Back</button></Link>
                    </div> 

                    <div className='tableBoxFBD'>
                        <SemSelector Condition={"chooseCF"} />
                        <table className='tableFDB'>
                            <thead>
                                <tr>
                                    <th className='thFDB'>Subject</th>
                                    <th className='thFDB'>Submitter</th>
                                    <th className='thFDB'>Q 01</th>
                                    <th className='thFDB'>Q 02</th>
                                    <th className='thFDB'>Q 03</th>
                                    <th className='thFDB'>Q 04</th>
                                    <th className='thFDB'>Q 05</th>
                                    <th className='thFDB'>Q 06</th>
                                    <th className='thFDB'>Q 07</th>
                                    <th className='thFDB'>Q 08</th>
                                    <th className='thFDB'>Q 09</th>
                                    <th className='thFDB'>Q 10</th>
                                    <th className='thFDB'>Q 11</th>
                                    <th className='thFDB'>Q 12</th>
                                    <th className='thFDB'>Q 13</th>
                                    <th className='thFDB'>Q 14</th>
                                    <th className='thFDB'>Q 15</th>
                                    <th className='thFDB'>Comments</th>
                                    <th className='thFDB'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((feedback) => (
                                    <tr key={feedback.id}>
                                        <td className='thFDB' style={{ width: '70px' }}>{feedback.subject}</td>
                                        <td className='thFDB'>{feedback.owner}</td>
                                        <td className='thFDB'>{feedback.q1}</td>
                                        <td className='thFDB'>{feedback.q2}</td>
                                        <td className='thFDB'>{feedback.q3}</td>
                                        <td className='thFDB'>{feedback.q4}</td>
                                        <td className='thFDB'>{feedback.q5}</td>
                                        <td className='thFDB'>{feedback.q6}</td>
                                        <td className='thFDB'>{feedback.q7}</td>
                                        <td className='thFDB'>{feedback.q8}</td>
                                        <td className='thFDB'>{feedback.q9}</td>
                                        <td className='thFDB'>{feedback.q10}</td>
                                        <td className='thFDB'>{feedback.q11}</td>
                                        <td className='thFDB'>{feedback.q12}</td>
                                        <td className='thFDB'>{feedback.q13}</td>
                                        <td className='thFDB'>{feedback.q14}</td>
                                        <td className='thFDB'>{feedback.q15}</td>
                                        <td className='thFDB' style={{ width: '70px' }}>{feedback.comment}</td>
                                        <td className='thFDB'>
                                            <button className='actionBtn' style={{ backgroundColor: 'red' }} onClick={() => handleDelete(feedback.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className='noFB'>{disText}</p>
                        <div style={{ height: '5px' }} />
                    </div>

                    <p className='titleFDB'>Lecturer Feedback</p>
                    <div className='tableBoxFBD'>
                        <SemSelector Condition={"chooseLF"} />
                        <table className='tableFDB'>
                            <thead>
                                <tr>
                                    <th className='thFDB'>Lecturer</th>
                                    <th className='thFDB'>Subject</th>
                                    <th className='thFDB'>Submitter</th>
                                    <th className='thFDB'>Q 01</th>
                                    <th className='thFDB'>Q 02</th>
                                    <th className='thFDB'>Q 03</th>
                                    <th className='thFDB'>Q 04</th>
                                    <th className='thFDB'>Q 05</th>
                                    <th className='thFDB'>Q 06</th>
                                    <th className='thFDB'>Q 07</th>
                                    <th className='thFDB'>Q 08</th>
                                    <th className='thFDB'>Q 09</th>
                                    <th className='thFDB'>Q 10</th>
                                    <th className='thFDB'>Q 11</th>
                                    <th className='thFDB'>Q 12</th>
                                    <th className='thFDB'>Comments</th>
                                    <th className='thFDB'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records2.map((feedback) => (
                                    <tr key={feedback.id}>
                                        <td className='thFDB' style={{ width: '70px' }}>{feedback.teacher}</td>
                                        <td className='thFDB' style={{ width: '70px' }}>{feedback.subject}</td>
                                        <td className='thFDB'>{feedback.owner}</td>
                                        <td className='thFDB'>{feedback.q1}</td>
                                        <td className='thFDB'>{feedback.q2}</td>
                                        <td className='thFDB'>{feedback.q3}</td>
                                        <td className='thFDB'>{feedback.q4}</td>
                                        <td className='thFDB'>{feedback.q5}</td>
                                        <td className='thFDB'>{feedback.q6}</td>
                                        <td className='thFDB'>{feedback.q7}</td>
                                        <td className='thFDB'>{feedback.q8}</td>
                                        <td className='thFDB'>{feedback.q9}</td>
                                        <td className='thFDB'>{feedback.q10}</td>
                                        <td className='thFDB'>{feedback.q11}</td>
                                        <td className='thFDB'>{feedback.q12}</td>
                                        <td className='thFDB' style={{ width: '70px' }}>{feedback.comment}</td>
                                        <td className='thFDB'>
                                            <button className='actionBtn' style={{ backgroundColor: 'red' }} onClick={() => handleDelete2(feedback.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className='noFB'>{disText2}</p>
                        <div style={{ height: '5px' }} />
                    </div>

                    <div className='ff' />
                    <Footer />
                </div>
            </div>
        </AnimatedPage>
    )
}

export default FeedbackPage 