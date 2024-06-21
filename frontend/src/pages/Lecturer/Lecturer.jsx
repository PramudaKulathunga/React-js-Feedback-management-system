import React, { Fragment, useState, useEffect } from 'react'
import './Lecturer.css';
import { Link } from 'react-router-dom';
import AnimatedPage from '../AnimatedPage';
import Header_MA from '../../component/Header_MA/Header_MA';
import axios from 'axios';
import Footer from '../../component/Footer/Footer';
import ModelLecture from '../../component/ModelLecture/ModelLecture';
import DepartmentSelector from '../../component/DepartmentSelector/DepartmentSelector';

const Lecturer = () => {

    const [records, setRecords] = useState([]);
    const [showModel, setShowModel] = useState(false);
    const [id, setId] = useState();
    const [lecId, setLecId] = useState();
    const [name, setName] = useState();
    const [position, setPosition] = useState();
    const [department, setDepartment] = useState();
    const [con, setCon] = useState();
    const [disText, setDisText] = useState("");

    useEffect(() => {
        setterData();
    }, [])

    const setterData = () => {
        const value1 = localStorage.getItem('departmentLec') === null ? "Semester 01" : localStorage.getItem('departmentLec');
        axios.post('http://localhost:8081/lecturerdetails',{value1})
            .then(res => {
                setRecords(res.data)
                if (res.data.length === 0) {
                    setDisText("No lecturer is available")
                }
            })
            .catch(err => console.log(err));
    }

    const handleEdit = (id, lecId, name, position, department) => {
        setId(id);
        setLecId(lecId);
        setName(name);
        setPosition(position);
        setDepartment(department);
        setCon("edit");
        setShowModel(true);
    };

    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this notice?");
        if (isConfirmed) {
            axios.delete(`http://localhost:8081/lecturerdetails/` + id)
                .then(res => {
                    window.alert('Notice deleted successfully');
                    window.location.reload();
                })
                .catch(err => console.log(err));
        }
    };

    const handleAdd = () => {
        setId("Enter code");
        setLecId("Enter lecture id");
        setName("Enter name");
        setPosition("Enter position");
        setDepartment("Enter department");
        setCon("add");
        setShowModel(true);
    };

    return (
        <AnimatedPage>
            <div className='boxL'>
                <Header_MA />

                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '100vh' }}>

                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <p className='titleL' style={{ marginTop: '100px' }}>Lecturer List</p>
                            <Link to="/Home_MA"><button className='backBtn'>Back</button></Link>
                        </div>

                        <div className='tableBoxL'>
                            <DepartmentSelector Condition={"chooseLec"}/>
                            <table className='tableL'>
                                <thead>
                                    <tr>
                                        <th className='thL'>Lecturer Id</th>
                                        <th className='thL' style={{ width: '250px' }}>Name</th>
                                        <th className='thL' style={{ width: '250px' }}>Position</th>
                                        <th className='thL' style={{ width: '250px' }}>Department</th>
                                        <th className='thL' style={{ width: '100px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records
                                        .sort((a, b) => a.lec_id.localeCompare(b.lec_id))
                                        .map((feedback) => (
                                            <tr key={feedback.id}>
                                                <td className='thL' style={{ width: '80px' }}>{feedback.lec_id}</td>
                                                <td className='thL'>{feedback.name}</td>
                                                <td className='thL' style={{ width: '500px' }}>{feedback.position}</td>
                                                <td className='thL'>{feedback.department}</td>
                                                <td className='thL'>
                                                    <button className='actionBtn' onClick={() => handleEdit(feedback.id, feedback.lec_id, feedback.name, feedback.position, feedback.department)}>Edit</button>
                                                    <button className='actionBtn' style={{ backgroundColor: 'red' }} onClick={() => handleDelete(feedback.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            <p className='noFB'>{disText}</p>
                            <div style={{ height: '5px' }} />
                            <button className='addBtn' style={{ marginLeft: '0px' }} onClick={handleAdd}>Add Lecturer</button>
                            <div style={{ height: '50px' }} />

                            <Fragment>
                                <ModelLecture isVisible={showModel} onClose={() => setShowModel(false)} Id={id} LecId={lecId} Name={name} Position={position} Department={department} Condition={con} />
                            </Fragment>

                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </AnimatedPage>
    )
}

export default Lecturer 