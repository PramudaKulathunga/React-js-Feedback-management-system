import React, { Fragment, useState, useEffect } from 'react'
import './CourseAllocation.css';
import { Link } from 'react-router-dom';
import AnimatedPage from '../AnimatedPage';
import Header_MA from '../../component/Header_MA/Header_MA';
import axios from 'axios';
import Footer from '../../component/Footer/Footer';
import ModelAllocation from '../../component/ModelAllocation/ModelAllocation';

const CourseAllocation = () => {

    const [records, setRecords] = useState([]);
    const [records2, setRecords2] = useState([]);
    const [values, setValues] = useState({
        condition: '',
        semester2: ''
    })
    const [values2, setValues2] = useState({
        condition: ''
    })
    const [showModel, setShowModel] = useState(false);
    const [id, setId] = useState();
    const [i, setI] = useState();
    const [course, setCourse] = useState();
    const [lecturer, setLecturer] = useState();

    useEffect(() => {
        setterData();
    }, [])

    const setterData = () => {
        values.condition = "course";
        values.semester2 = "Select Semester";
        axios.post('http://localhost:8081/subject', values)
            .then(res => {
                setRecords(res.data)
            })
            .catch(err => console.log(err));

        values2.condition = "all";
        axios.post('http://localhost:8081/teacher', values2)
            .then(res => {
                setRecords2(res.data)
            })
            .catch(err => console.log(err));
    }

    const handleEdit = (id, i, course, lecturer) => {
        setId(id);
        setI(i);
        setCourse(course);
        setLecturer(lecturer);
        setShowModel(true);
    };

    return (
        <AnimatedPage>
            <div className='boxCA'>
                <Header_MA />

                <div style={{ display: 'flex', flexDirection: 'column' }}>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <p className='titleCA' style={{ marginTop: '100px' }}>Course allocation</p>
                        <Link to="/Home_MA"><button className='backBtn'>Back</button></Link>
                    </div>

                    <div className='tableBoxCA'>
                        <table className='tableCA'>
                            <thead>
                                <tr>
                                    <th className='thCA'>Course</th>
                                    <th className='thCA'>Lecturer</th>
                                    <th className='thCA'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((feedback, index) => (
                                    <>
                                        <tr key={`header-${feedback.id}`}>
                                            <td className='thCA' colSpan={3}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', paddingLeft: '20px', paddingRight: '20px' }}>
                                                    <span>Semester: {feedback.semester}</span>
                                                    <span>Department: {feedback.department}</span>
                                                </div>
                                            </td>
                                        </tr>
                                        {[feedback.subject1, feedback.subject2, feedback.subject3, feedback.subject4, feedback.subject5, feedback.subject6, feedback.subject7].map((subject, i) => {
                                            const lecturer = records2[index] ? records2[index][`teacher${i + 1}`] : null;
                                            if (!subject || !lecturer) return null;
                                            return (
                                                <tr key={`${feedback.id}-${i}`}>
                                                    <td className='thCA' style={{ width: '300px' }}>{subject}</td>
                                                    <td className='thCA' style={{ width: '300px' }}>{lecturer}</td>
                                                    <td className='thCA'>
                                                        <button className='actionBtn' onClick={() => handleEdit(feedback.id, i, subject, lecturer)}>Edit</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ height: '50px' }} />

                        <Fragment>
                            <ModelAllocation isVisible={showModel} onClose={() => setShowModel(false)} Id={id} I={i} Course={course} Lecturer={lecturer} />
                        </Fragment>
                    </div>

                    <Footer />
                </div>
            </div>
        </AnimatedPage>
    )
}

export default CourseAllocation 