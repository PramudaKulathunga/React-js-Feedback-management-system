import React, { Fragment, useState, useEffect } from 'react'
import './QA.css';
import { Link } from 'react-router-dom';
import AnimatedPage from '../AnimatedPage';
import Header_MA from '../../component/Header_MA/Header_MA';
import axios from 'axios';
import Footer from '../../component/Footer/Footer';
import ModelQA from '../../component/ModelQA/ModelQA';

const QA = () => {

    const [records, setRecords] = useState([]);
    const [records2, setRecords2] = useState([]);
    const [id, setId] = useState();
    const [group, setGroup] = useState(); 
    const [question, setQuestion] = useState();
    const [condition, setCondition] = useState();
    const [showModel, setShowModel] = useState(false);

    useEffect(() => {
        setterData();
    }, [])

    const setterData = () => {
        axios.post('http://localhost:8081/coursequestion')
            .then(res => {
                setRecords(res.data)
            })
            .catch(err => console.log(err));

        axios.post('http://localhost:8081/lecturerquestion')
            .then(res => {
                setRecords2(res.data)
            })
            .catch(err => console.log(err));
    }

    const handleEdit = (id, group, question) => {
        setId(id);
        setGroup(group);
        setQuestion(question);
        setShowModel(true);
    };

    return (
        <AnimatedPage>
            <div className='boxQA'>
                <Header_MA />

                <div style={{ display: 'flex', flexDirection: 'column' }}>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <p className='titleQA' style={{ marginTop: '100px' }}>Questions</p>
                        <Link to="/Home_MA"><button className='backBtn'>Back</button></Link>
                    </div>

                    <div className='tableBoxQA'>
                        <p className='titleQA' style={{ marginLeft: '0px', marginTop: '0px', marginBottom: '10px' }}>About courses</p>
                        <table className='tableQA'>
                            <thead>
                                <tr>
                                    <th className='thQA'>Group</th>
                                    <th className='thQA'>Question</th>
                                    <th className='thQA'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((feedback) => (
                                    <tr key={feedback.id}>
                                        <td className='thQA' style={{ width: '180px' }}>{feedback.Group}</td>
                                        <td className='thQA' style={{ width: '600px', textAlign: 'left' }}>{feedback.question}</td>
                                        <td className='thQA'>
                                            <button className='actionBtn' onClick={() => [handleEdit(feedback.id, feedback.Group, feedback.question), setCondition("course")]}>Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ height: '5px' }} />
                    </div>

                    <div className='tableBoxQA'>
                        <p className='titleQA' style={{ marginLeft: '0px', marginTop: '30px', marginBottom: '10px' }}>About lecturers</p>

                        <table className='tableQA'>
                            <thead>
                                <tr>
                                    <th className='thQA'>Group</th>
                                    <th className='thQA'>Question</th>
                                    <th className='thQA'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records2.map((feedback) => (
                                    <tr key={feedback.id}>
                                        <td className='thQA' style={{ width: '180px' }}>{feedback.Group}</td>
                                        <td className='thQA' style={{ width: '600px', textAlign: 'left' }}>{feedback.question}</td>
                                        <td className='thQA'>
                                            <button className='actionBtn' onClick={() => [handleEdit(feedback.id, feedback.Group, feedback.question), setCondition("lecture")]}>Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div style={{ height: '5px' }} />

                        <Fragment>
                            <ModelQA isVisible={showModel} onClose={() => setShowModel(false)} Id={id} Topic1="Group" Topic2="Question" Group={group} Question={question} Condition={condition} />
                        </Fragment>
                    </div>

                    <div />

                    <div style={{ height: '50px' }} />
                    <Footer />
                </div>
            </div>
        </AnimatedPage>
    )
}

export default QA 