import React, { useState, useEffect } from 'react'
import './Summary.css';
import { Link } from 'react-router-dom';
import AnimatedPage from '../AnimatedPage';
import Header_MA from '../../component/Header_MA/Header_MA';
import axios from 'axios';
import Footer from '../../component/Footer/Footer';
import SemSelector from '../../component/SemSelector/SemSelector';

const Summary = () => {

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

    return (
        <AnimatedPage>
            <div className='boxS'>
                <Header_MA />

                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <p className='titleS' style={{ marginTop: '100px' }}>Summary</p>
                        <Link to="/Home_MA"><button className='backBtn'>Back</button></Link>
                    </div>

                    <p className='titleS' style={{ marginTop: '-15px' }}>Course Feedback</p>
                    <div className='tableBoxS'>
                        <SemSelector Condition={"chooseCF"} />
                        <table className='tableS'>
                            <thead>
                                <tr>
                                    <th className='thS'>Subject</th>
                                    <th className='thS'>Q 01</th>
                                    <th className='thS'>Q 02</th>
                                    <th className='thS'>Q 03</th>
                                    <th className='thS'>Q 04</th>
                                    <th className='thS'>Q 05</th>
                                    <th className='thS'>Q 06</th>
                                    <th className='thS'>Q 07</th>
                                    <th className='thS'>Q 08</th>
                                    <th className='thS'>Q 09</th>
                                    <th className='thS'>Q 10</th>
                                    <th className='thS'>Q 11</th>
                                    <th className='thS'>Q 12</th>
                                    <th className='thS'>Q 13</th>
                                    <th className='thS'>Q 14</th>
                                    <th className='thS'>Q 15</th>
                                    <th className='thS'>Total</th>
                                    <th className='thS'>Average</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((feedback) => (
                                    <tr key={feedback.id}>
                                        <td className='thS' style={{ width: '70px' }}>{feedback.subject}</td>
                                        <td className='thS'>{feedback.q1}</td>
                                        <td className='thS'>{feedback.q2}</td>
                                        <td className='thS'>{feedback.q3}</td>
                                        <td className='thS'>{feedback.q4}</td>
                                        <td className='thS'>{feedback.q5}</td>
                                        <td className='thS'>{feedback.q6}</td>
                                        <td className='thS'>{feedback.q7}</td>
                                        <td className='thS'>{feedback.q8}</td>
                                        <td className='thS'>{feedback.q9}</td>
                                        <td className='thS'>{feedback.q10}</td>
                                        <td className='thS'>{feedback.q11}</td>
                                        <td className='thS'>{feedback.q12}</td>
                                        <td className='thS'>{feedback.q13}</td>
                                        <td className='thS'>{feedback.q14}</td>
                                        <td className='thS'>{feedback.q15}</td>
                                        <td className='thS'>{feedback.q1 + feedback.q2 + feedback.q3 + feedback.q4 + feedback.q5 + feedback.q6 + feedback.q7 + feedback.q8 + feedback.q9 + feedback.q10 + feedback.q11 + feedback.q12 + feedback.q13 + feedback.q14 + feedback.q15}</td>
                                        <td className='thS'>{(feedback.q1 + feedback.q2 + feedback.q3 + feedback.q4 + feedback.q5 + feedback.q6 + feedback.q7 + feedback.q8 + feedback.q9 + feedback.q10 + feedback.q11 + feedback.q12 + feedback.q13 + feedback.q14 + feedback.q15) / 15}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className='noFB'>{disText}</p>
                        <div style={{ height: '5px' }} />
                    </div>

                    <p className='titleS'>Lecturer Feedback</p>
                    <div className='tableBoxS'>
                        <SemSelector Condition={"chooseLF"} />
                        <table className='tableS'>
                            <thead>
                                <tr>
                                    <th className='thS'>Lecturer</th>
                                    <th className='thS'>Subject</th>
                                    <th className='thS'>Q 01</th>
                                    <th className='thS'>Q 02</th>
                                    <th className='thS'>Q 03</th>
                                    <th className='thS'>Q 04</th>
                                    <th className='thS'>Q 05</th>
                                    <th className='thS'>Q 06</th>
                                    <th className='thS'>Q 07</th>
                                    <th className='thS'>Q 08</th>
                                    <th className='thS'>Q 09</th>
                                    <th className='thS'>Q 10</th>
                                    <th className='thS'>Q 11</th>
                                    <th className='thS'>Q 12</th>
                                    <th className='thS'>Total</th>
                                    <th className='thS'>Average</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records2.map((feedback) => (
                                    <tr key={feedback.id}>
                                        <td className='thS' style={{ width: '70px' }}>{feedback.teacher}</td>
                                        <td className='thS' style={{ width: '70px' }}>{feedback.subject}</td>
                                        <td className='thS'>{feedback.q1}</td>
                                        <td className='thS'>{feedback.q2}</td>
                                        <td className='thS'>{feedback.q3}</td>
                                        <td className='thS'>{feedback.q4}</td>
                                        <td className='thS'>{feedback.q5}</td>
                                        <td className='thS'>{feedback.q6}</td>
                                        <td className='thS'>{feedback.q7}</td>
                                        <td className='thS'>{feedback.q8}</td>
                                        <td className='thS'>{feedback.q9}</td>
                                        <td className='thS'>{feedback.q10}</td>
                                        <td className='thS'>{feedback.q11}</td>
                                        <td className='thS'>{feedback.q12}</td>
                                        <td className='thS'>{feedback.q1 + feedback.q2 + feedback.q3 + feedback.q4 + feedback.q5 + feedback.q6 + feedback.q7 + feedback.q8 + feedback.q9 + feedback.q10 + feedback.q11 + feedback.q12}</td>
                                        <td className='thS'>{(feedback.q1 + feedback.q2 + feedback.q3 + feedback.q4 + feedback.q5 + feedback.q6 + feedback.q7 + feedback.q8 + feedback.q9 + feedback.q10 + feedback.q11 + feedback.q12) / 12}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className='noFB'>{disText2}</p>
                        <div style={{ height: '5px' }} />
                    </div>

                    <Footer />
                </div>
            </div>
        </AnimatedPage>
    )
}

export default Summary 