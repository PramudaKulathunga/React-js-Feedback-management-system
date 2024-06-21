import React, { Fragment, useState, useEffect } from 'react'
import './Course.css';
import { Link } from 'react-router-dom';
import AnimatedPage from '../AnimatedPage';
import Header_MA from '../../component/Header_MA/Header_MA';
import axios from 'axios';
import Footer from '../../component/Footer/Footer';
import ModelSubject from '../../component/ModelSubject/ModelSubject';
import SemSelector from '../../component/SemSelector/SemSelector';

const Course = () => { 

    const [records, setRecords] = useState([]);
    const [values, setValues] = useState({
        condition: '',
        semester2: ''
    })
    const [showModel, setShowModel] = useState(false);
    const [id, setId] = useState();
    const [semester, setSemester] = useState();
    const [department, setDepartment] = useState();
    const [subject1, setSubject1] = useState();
    const [subject2, setSubject2] = useState();
    const [subject3, setSubject3] = useState();
    const [subject4, setSubject4] = useState();
    const [subject5, setSubject5] = useState();
    const [subject6, setSubject6] = useState();
    const [subject7, setSubject7] = useState();
    const [disText, setDisText] = useState("");

    useEffect(() => {
        setterData();
    }, [])

    const setterData = () => {
        values.condition = "course";
        values.semester2 = localStorage.getItem('semesterCourse');
        axios.post('http://localhost:8081/subject', values)
            .then(res => {
                setRecords(res.data)
                if (res.data.length === 0) {
                    setDisText("No course is available");
                }
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }

    const handleEdit = (id, semester, department, subject1, subject2, subject3, subject4, subject5, subject6, subject7) => {
        setId(id);
        setSemester(semester);
        setDepartment(department);
        setSubject1(subject1);
        setSubject2(subject2);
        setSubject3(subject3);
        setSubject4(subject4);
        setSubject5(subject5);
        setSubject6(subject6);
        setSubject7(subject7);
        setShowModel(true);
    };

    return (
        <AnimatedPage>
            <div className='boxC'>
                <Header_MA />
                <div style={{ display: 'flex', flexDirection: 'column', height: (localStorage.getItem('semesterCourse') === "Semester 01" || localStorage.getItem('semesterCourse') === "Semester 02" || localStorage.getItem('semesterCourse') === "Semester 03") ? window.innerHeight : '100%' }}>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <p className='titleC' style={{ marginTop: '100px' }}>Course List</p>
                        <Link to="/Home_MA"><button className='backBtn'>Back</button></Link>
                    </div>

                    <div className='tableBoxC'>
                        <SemSelector Condition={"chooseCourse"} />
                        <table className='tableC'>
                            <thead>
                                <tr>
                                    <th className='thC'>Semester</th>
                                    <th className='thC'>Department</th>
                                    <th className='thC'>Subject 01</th>
                                    <th className='thC'>Subject 02</th>
                                    <th className='thC'>Subject 03</th>
                                    <th className='thC'>Subject 04</th>
                                    <th className='thC'>Subject 05</th>
                                    <th className='thC'>Subject 06</th>
                                    <th className='thC'>Subject 07</th>
                                    <th className='thC'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((feedback) => (
                                    <tr key={feedback.id}>
                                        <td className='thC' style={{ width: '80px' }}>{feedback.semester}</td>
                                        <td className='thC' style={{ width: '250px' }}>{feedback.department}</td>
                                        <td className='thC'>{feedback.subject1}</td>
                                        <td className='thC'>{feedback.subject2}</td>
                                        <td className='thC'>{feedback.subject3}</td>
                                        <td className='thC'>{feedback.subject4}</td>
                                        <td className='thC'>{feedback.subject5}</td>
                                        <td className='thC'>{feedback.subject6}</td>
                                        <td className='thC'>{feedback.subject7}</td>
                                        <td className='thC' style={{ width: '50px' }}>
                                            <button onClick={() => handleEdit(feedback.id, feedback.semester, feedback.department, feedback.subject1, feedback.subject2, feedback.subject3, feedback.subject4, feedback.subject5, feedback.subject6, feedback.subject7)} className='actionBtn'>Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className='noFB'>{disText}</p>
                        <div style={{ height: '5px' }} />

                        <Fragment>
                            <ModelSubject isVisible={showModel} onClose={() => setShowModel(false)} Id={id} Semester={semester} Department={department} Subject1={subject1} Subject2={subject2} Subject3={subject3} Subject4={subject4} Subject5={subject5} Subject6={subject6} Subject7={subject7} />
                        </Fragment>
                    </div>

                    <div style={{ height: '50px' }} />
                    <Footer />
                </div>
            </div>
        </AnimatedPage>
    )
}

export default Course 