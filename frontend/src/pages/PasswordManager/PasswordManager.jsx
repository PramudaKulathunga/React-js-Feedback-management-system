import React, { Fragment, useState, useEffect } from 'react'
import './PasswordManager.css';
import { Link } from 'react-router-dom';
import AnimatedPage from '../AnimatedPage';
import Header_MA from '../../component/Header_MA/Header_MA';
import axios from 'axios';
import Footer from '../../component/Footer/Footer';
import ModelQA from '../../component/ModelQA/ModelQA';

const PasswordManager = () => {

    const [records, setRecords] = useState([]);
    const [showModel, setShowModel] = useState(false);
    const [id, setId] = useState();
    const [email, setEmail] = useState();
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

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
        const condition = "all"
        axios.post('http://localhost:8081/forgotpassword', { condition })
            .then(res => {
                setRecords(res.data)

            })
            .catch(err => console.log(err));
    }

    const handleEdit = (id, email) => {
        setId(id);
        setEmail(email);
        setShowModel(true);
    };

    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this without recover?");
        if (isConfirmed) {
            axios.delete(`http://localhost:8081/forgotpassword/` + id)
                .then(res => {
                    window.alert('Notice deleted successfully');
                    window.location.reload();
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <AnimatedPage>
            <div className='box_PM'>
                <Header_MA />

                <div style={{ display: 'flex', flexDirection: 'column', height: windowSize[1] }}>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <p className='titlePM' style={{ marginTop: '100px' }}>Password Manager</p>
                        <Link to="/Home_MA"><button className='backBtn'>Back</button></Link>
                    </div>

                    <div className='holderPM'>
                        <div className='holder_PM2' style={{ marginTop: '50px' }}>
                            <p className='text2bold' style={{ fontSize: '23px' }}>Notice</p>
                            <table className='tablePM'>
                                <thead>
                                    <tr>
                                        <th className='thPM'>Email</th>
                                        <th className='thPM'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.map((feedback) => (
                                        <tr key={feedback.id}>
                                            <td className='thPM'>{feedback.email}</td>
                                            <td className='thPM'>
                                                <button className='actionBtn' onClick={() => handleEdit(feedback.id, feedback.email)}>Recover</button>
                                                <button className='actionBtn' style={{ backgroundColor: 'red' }} onClick={() => handleDelete(feedback.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div style={{ height: '30px' }} />
                        </div>

                        <Fragment>
                            <ModelQA isVisible={showModel} onClose={() => setShowModel(false)} Id={id} Topic1="Email" Topic2="Recover password" Group={email} Question="Enter Password" Condition="forgotPwd" />
                        </Fragment>
                    </div>

                    <Footer />
                </div>
            </div >
        </AnimatedPage >
    )
}

export default PasswordManager 