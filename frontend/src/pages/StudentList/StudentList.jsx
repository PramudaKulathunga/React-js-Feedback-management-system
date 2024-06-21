import React, { Fragment, useState, useEffect } from 'react'
import './StudentList.css';
import { Link } from 'react-router-dom';
import AnimatedPage from '../AnimatedPage';
import Header_MA from '../../component/Header_MA/Header_MA';
import axios from 'axios';
import Footer from '../../component/Footer/Footer';
import ModelStudent from '../../component/ModelStudent/ModelStudent';
import DepartmentSelector from '../../component/DepartmentSelector/DepartmentSelector';

const StudentList = () => {

    const [records, setRecords] = useState([]);
    const [values, setValues] = useState({
        condition: '',
        department: ''
    })
    const [showModel, setShowModel] = useState(false);
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [department, setDepartment] = useState();
    const [batchNo, setBatchNo] = useState();
    const [regNo, setRegNo] = useState();
    const [indexNo, setIndexNo] = useState();
    const [semester, setSemester] = useState();
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
    const [disText, setDisText] = useState("");


    useEffect(() => {
        setterData();

        const handleResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const setterData = () => {
        values.condition = "Student";
        values.department = localStorage.getItem('departmentSTD');
        axios.post('http://localhost:8081/login', values)  
            .then(res => {
                setRecords(res.data)
                if (res.data.length === 0) {
                    setDisText("No student is available")
                }
                console.log(disText)
            })
            .catch(err => console.log(err));
    }

    const handleEdit = (id, name, email, department, batchNo, regNo, indexNo, semester) => {
        setId(id);
        setName(name);
        setEmail(email);
        setDepartment(department);
        setBatchNo(batchNo);
        setRegNo(regNo);
        setIndexNo(indexNo);
        setSemester(semester);
        setShowModel(true);
    };

    const handleDelete = (email) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this notice?");
        if (isConfirmed) {
            axios.delete(`http://localhost:8081/login/` + email)
                .then(res => {
                    window.alert('Notice deleted successfully');
                    window.location.reload();
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <AnimatedPage>
            <div className='boxSL'>
                <Header_MA />

                <div style={{ display: 'flex', flexDirection: 'column', height: windowSize[1] }}>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <p className='titleSL' style={{ marginTop: '100px' }}>Student List</p>
                        <Link to="/Home_MA"><button className='backBtn'>Back</button></Link>
                    </div>

                    <div className='tableBoxSL'>
                        <DepartmentSelector Condition={"chooseSTD"} />
                        <table className='tableSL'>
                            <thead>
                                <tr>
                                    <th className='thSL'>Name</th>
                                    <th className='thSL'>Email</th>
                                    <th className='thSL'>Department</th>
                                    <th className='thSL'>Batch No</th>
                                    <th className='thSL'>Registration Number</th>
                                    <th className='thSL'>Index No</th>
                                    <th className='thSL'>Semester</th>
                                    <th className='thSL'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((feedback) => (
                                    <tr key={feedback.email}>
                                        <td className='thSL' style={{ width: '180px' }}>{feedback.name}</td>
                                        <td className='thSL' style={{ width: '250px' }}>{feedback.email}</td>
                                        <td className='thSL' style={{ width: '250px' }}>{feedback.department}</td>
                                        <td className='thSL'>{feedback.batchNo}</td>
                                        <td className='thSL'>{feedback.regNo}</td>
                                        <td className='thSL'>{feedback.indexNo}</td>
                                        <td className='thSL'>{feedback.semester}</td>
                                        <td className='thSL'>
                                            <button className='actionBtn' onClick={() => handleEdit(feedback.id, feedback.name, feedback.email, feedback.department, feedback.batchNo, feedback.regNo, feedback.indexNo, feedback.semester)}>Edit</button>
                                            <button className='actionBtn' style={{ backgroundColor: 'red' }} onClick={() => handleDelete(feedback.email)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className='noFB'>{disText}</p>
                        <div style={{ height: '5px' }} />

                        <Fragment>
                            <ModelStudent isVisible={showModel} onClose={() => setShowModel(false)} Id={id} Name={name} Email={email} Department={department} BatchNo={batchNo} RegNo={regNo} IndexNo={indexNo} Semester={semester} />
                        </Fragment>
                    </div>

                    <Footer />
                </div>
            </div>
        </AnimatedPage>
    )
}

export default StudentList 