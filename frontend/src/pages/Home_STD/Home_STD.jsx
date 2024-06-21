import React, { Fragment, useEffect, useState } from 'react'
import './Home_STD.css';
import { Link } from 'react-router-dom';
import AnimatedPage from '../AnimatedPage';
import Header_STD from '../../component/Header_STD/Header_STD';
import Footer from '../../component/Footer/Footer';
import axios from 'axios';
import Model from '../../component/Model/Model';

const Home_STD = () => {

  const [values, setValues] = useState({
    condition: '',
    email: '',
    password: ''
  })

  const [values2, setValues2] = useState({
    condition: '',
    department: '',
    semester: ''
  })

  const [records, setRecords] = useState([]);
  const [recordsL, setRecordsL] = useState([]);
  const [recordsN, setRecordsN] = useState([]);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    setterData();
  }, [])

  const setterData = () => {

    values.email = localStorage.getItem('emailR');
    values.password = localStorage.getItem('passwordR');
    values.condition = 'normal';

    axios.post('http://localhost:8081/login', values)
      .then(res => {
        localStorage.setItem('nameR', res.data[0].name);
        localStorage.setItem('batchNoR', res.data[0].batchNo);
        localStorage.setItem('regNoR', res.data[0].regNo);
        localStorage.setItem('indexNoR', res.data[0].indexNo);
        localStorage.setItem('positionR', res.data[0].position);
        localStorage.setItem('semesterR', res.data[0].semester);
        localStorage.setItem('departmentR', res.data[0].department);
      })
      .catch(err => console.log(err));

    values2.department = localStorage.getItem('departmentR');
    values2.semester = localStorage.getItem('semesterR');
    values2.condition = 'normal';

    axios.post('http://localhost:8081/subject', values2)
      .then(res => {
        setRecords(res.data);
          localStorage.setItem('subject1', records[0].subject1);
          localStorage.setItem('subject2', records[0].subject2);
          localStorage.setItem('subject3', records[0].subject3);
          localStorage.setItem('subject4', records[0].subject4);
          localStorage.setItem('subject5', records[0].subject5);
          localStorage.setItem('subject6', records[0].subject6);
          localStorage.setItem('subject7', records[0].subject7);
      })
      .catch(err => console.log(err));

    axios.post('http://localhost:8081/teacher', values2)
      .then(res => {
        setRecordsL(res.data)
          localStorage.setItem('teacher1', recordsL[0].teacher1);
          localStorage.setItem('teacher2', recordsL[0].teacher2);
          localStorage.setItem('teacher3', recordsL[0].teacher3);
          localStorage.setItem('teacher4', recordsL[0].teacher4);
          localStorage.setItem('teacher5', recordsL[0].teacher5);
          localStorage.setItem('teacher6', recordsL[0].teacher6);
          localStorage.setItem('teacher7', recordsL[0].teacher7);
      })
      .catch(err => console.log(err));

    axios.post('http://localhost:8081/notice')
      .then(res => {
        setRecordsN(res.data)
      })
      .catch(err => console.log(err));
  }

  return (
    <AnimatedPage>
      <div className='box_STD'>
        <Header_STD />

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '100%' }}>

          <div />

          <div className='holder2'>
            <p className='textName'>Welcome! {localStorage.getItem('nameR')}</p>
            <div className='holder_STD'>
              <p className='text2bold' style={{ fontSize: '25px' }}>Current Level</p>
              <p className='text2bold'>Batch No : <text className='text2'>{localStorage.getItem('batchNoR')}</text></p>
              <p className='text2bold'>Registration No : <text className='text2'>{localStorage.getItem('regNoR')}</text></p>
              <p className='text2bold'>Index No : <text className='text2'>{localStorage.getItem('indexNoR')}</text></p>
              <p className='text2bold'>Semester : <text className='text2'>{localStorage.getItem('semesterR')}</text></p>
              <p className='text2bold'>E-mail : <text className='text2'>{localStorage.getItem('emailR')}</text></p>

              <button className='EditButton' onClick={() => setShowModel(true)}>EDIT</button>
            </div>

            <br /><br />

            <div className='holder_STD2'>

              <p className='text2bold' style={{ fontSize: '23px' }}>Feedback</p>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>

                <div style={{ marginTop: '25px' }}>
                  {localStorage.getItem('subject1') !== "" && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p className='table'>{localStorage.getItem('subject1')}</p>
                      <p className='table2'>{localStorage.getItem('teacher1')}</p>
                      <div className='horizontal-line' />
                    </div>
                  )}
                  {localStorage.getItem('subject2') !== "" && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p className='table'>{localStorage.getItem('subject2')}</p>
                      <p className='table2'>{localStorage.getItem('teacher2')}</p>
                      <div className='horizontal-line' />
                    </div>
                  )}
                  {localStorage.getItem('subject3') !== "" && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p className='table'>{localStorage.getItem('subject3')}</p>
                      <p className='table2'>{localStorage.getItem('teacher3')}</p>
                      <div className='horizontal-line' />
                    </div>
                  )}
                  {localStorage.getItem('subject4') !== "" && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p className='table'>{localStorage.getItem('subject4')}</p>
                      <p className='table2'>{localStorage.getItem('teacher4')}</p>
                      <div className='horizontal-line' />
                    </div>
                  )}
                  {localStorage.getItem('subject5') !== "" && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p className='table'>{localStorage.getItem('subject5')}</p>
                      <p className='table2'>{localStorage.getItem('teacher5')}</p>
                      <div className='horizontal-line' />
                    </div>
                  )}
                  {localStorage.getItem('subject6') !== "" && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p className='table'>{localStorage.getItem('subject6')}</p>
                      <p className='table2'>{localStorage.getItem('teacher6')}</p>
                      <div className='horizontal-line' />
                    </div>
                  )}
                  {localStorage.getItem('subject7') !== "" && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p className='table'>{localStorage.getItem('subject7')}</p>
                      <p className='table2'>{localStorage.getItem('teacher7')}</p>
                      <div className='horizontal-line' />
                    </div>
                  )}
                </div>

                <div style={{ marginTop: '35px' }}>
                  {localStorage.getItem('subject1') !== "" && (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Link to="/LecturerFeedback"><button className='feedbackBtn' onClick={() => { localStorage.setItem('courseR', localStorage.getItem('subject1')); localStorage.setItem('teacherR', localStorage.getItem('teacher1')); }}>Lecturer</button></Link>
                      <Link to="/CoruseFeedback"><button className='feedbackBtn' onClick={() => localStorage.setItem('courseR', localStorage.getItem('subject1'))}>Course</button></Link>
                    </div>
                  )}
                  {localStorage.getItem('subject2') !== "" && (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Link to="/LecturerFeedback"><button className='feedbackBtn' onClick={() => { localStorage.setItem('courseR', localStorage.getItem('subject2')); localStorage.setItem('teacherR', localStorage.getItem('teacher2')); }}>Lecturer</button></Link>
                      <Link to="/CoruseFeedback"><button className='feedbackBtn' onClick={() => localStorage.setItem('courseR', localStorage.getItem('subject2'))}>Course</button></Link>
                    </div>
                  )}
                  {localStorage.getItem('subject3') !== "" && (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Link to="/LecturerFeedback"><button className='feedbackBtn' onClick={() => { localStorage.setItem('courseR', localStorage.getItem('subject3')); localStorage.setItem('teacherR', localStorage.getItem('teacher3')); }}>Lecturer</button></Link>
                      <Link to="/CoruseFeedback"><button className='feedbackBtn' onClick={() => localStorage.setItem('courseR', localStorage.getItem('subject3'))}>Course</button></Link>
                    </div>
                  )}
                  {localStorage.getItem('subject4') !== "" && (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Link to="/LecturerFeedback"><button className='feedbackBtn' onClick={() => { localStorage.setItem('courseR', localStorage.getItem('subject4')); localStorage.setItem('teacherR', localStorage.getItem('teacher4')); }}>Lecturer</button></Link>
                      <Link to="/CoruseFeedback"><button className='feedbackBtn' onClick={() => localStorage.setItem('courseR', localStorage.getItem('subject4'))}>Course</button></Link>
                    </div>
                  )}
                  {localStorage.getItem('subject5') !== "" && (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Link to="/LecturerFeedback"><button className='feedbackBtn' onClick={() => { localStorage.setItem('courseR', localStorage.getItem('subject5')); localStorage.setItem('teacherR', localStorage.getItem('teacher5')); }}>Lecturer</button></Link>
                      <Link to="/CoruseFeedback"><button className='feedbackBtn' onClick={() => localStorage.setItem('courseR', localStorage.getItem('subject5'))}>Course</button></Link>
                    </div>
                  )}
                  {localStorage.getItem('subject6') !== "" && (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Link to="/LecturerFeedback"><button className='feedbackBtn' onClick={() => { localStorage.setItem('courseR', localStorage.getItem('subject6')); localStorage.setItem('teacherR', localStorage.getItem('teacher6')); }}>Lecturer</button></Link>
                      <Link to="/CoruseFeedback"><button className='feedbackBtn' onClick={() => localStorage.setItem('courseR', localStorage.getItem('subject6'))}>Course</button></Link>
                    </div>
                  )}
                  {localStorage.getItem('subject7') !== "" && (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Link to="/LecturerFeedback"><button className='feedbackBtn' onClick={() => { localStorage.setItem('courseR', localStorage.getItem('subject7')); localStorage.setItem('teacherR', localStorage.getItem('teacher7')); }}>Lecturer</button></Link>
                      <Link to="/CoruseFeedback"><button className='feedbackBtn' onClick={() => localStorage.setItem('courseR', localStorage.getItem('subject7'))}>Course</button></Link>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ height: '40px' }} />
            </div>

            <div className='holder_STD2' style={{ marginTop: '50px' }}>
              <p className='text2bold' style={{ fontSize: '23px' }}>Notice</p>
              <table className='tableSTD'>
                <thead>
                  <tr>
                    <th className='thSTD'>Code</th>
                    <th className='thSTD'>Notice</th>
                    <th className='thSTD'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recordsN.map((feedback) => (
                    <tr key={feedback.id}>
                      <td className='thSTD'>{feedback.code}</td>
                      <td className='thSTD' style={{ width: '300px' }}>{feedback.notice}</td>
                      <td className='thSTD'>{feedback.status}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ height: '30px' }} />
            </div>

          </div>

          <Fragment>
            <Model isVisible={showModel} onClose={() => setShowModel(false)} />
          </Fragment>
          <div />

        </div>
        
        <div style={{ height: '50px' }} />
        <Footer />
      </div>
    </AnimatedPage >
  )
}

export default Home_STD