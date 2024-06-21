import React, { Fragment, useState, useEffect } from 'react'
import './Home_MA.css';
import { Link } from 'react-router-dom';
import AnimatedPage from '../AnimatedPage';
import Header_MA from '../../component/Header_MA/Header_MA';
import axios from 'axios';
import Footer from '../../component/Footer/Footer';
import ModelNotice from '../../component/ModelNotice/ModelNotice';

const Home_MA = () => {

  const [values, setValues] = useState({
    condition: '',
    email: '',
    password: ''
  })
  
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

  const [records, setRecords] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [code, setCode] = useState();
  const [id, setId] = useState();
  const [notice, setNotice] = useState();
  const [status, setStatus] = useState();
  const [con, setCon] = useState();

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

    values.email = localStorage.getItem('emailR');
    values.password = localStorage.getItem('passwordR');
    values.condition = "normal";

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

    axios.post('http://localhost:8081/notice')
      .then(res => {
        setRecords(res.data)
      })
      .catch(err => console.log(err));
  }

  const handleEdit = (id, code, notice, status) => {
    setId(id);
    setCode(code);
    setNotice(notice);
    setStatus(status);
    setCon("edit");
    setShowModel(true);
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this notice?");
    if (isConfirmed) {
      axios.delete(`http://localhost:8081/notice/` + id)
        .then(res => {
          window.alert('Notice deleted successfully');
          window.location.reload();
        })
        .catch(err => console.log(err));
    }
  };

  const handleAdd = () => {
    setId("Enter code");
    setCode("Enter code");
    setNotice("Enter notice");
    setStatus("Enter status");
    setCon("add");
    setShowModel(true);
  };

  return (
    <AnimatedPage>
      <div className='box_MA'>
        <Header_MA />

        <div style={{ display: 'flex', flexDirection: 'column', height: windowSize[1] }}>

          <div className='holderMA'>
            <p className='textNameMA'>Welcome! {localStorage.getItem('nameR')}</p>

            <div className='holder_MA2' style={{ marginTop: '50px' }}>
              <p className='text2bold' style={{ fontSize: '23px' }}>Notice</p>
              <table className='tableMA'>
                <thead>
                  <tr>
                    <th className='thMA'>Code</th>
                    <th className='thMA'>Notice</th>
                    <th className='thMA'>Status</th>
                    <th className='thMA'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((feedback) => (
                    <tr key={feedback.id}>
                      <td className='thMA'>{feedback.code}</td>
                      <td className='thMA' style={{ width: '400px' }}>{feedback.notice}</td>
                      <td className='thMA'>{feedback.status}</td>
                      <td className='thMA'>
                        <button className='actionBtn' onClick={() => handleEdit(feedback.id, feedback.code, feedback.notice, feedback.status)}>Edit</button>
                        <button className='actionBtn' style={{ backgroundColor: 'red' }} onClick={() => handleDelete(feedback.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className='addBtn' onClick={handleAdd}>Add notice</button>
              <div style={{ height: '30px' }} />
            </div>

            <Fragment>
              <ModelNotice isVisible={showModel} onClose={() => setShowModel(false)} Id={id} Code={code} Notice={notice} Status={status} Condition={con} />
            </Fragment>
          </div>

          <div style={{ height: '170px' }} />
          <Footer />
        </div>
      </div >
    </AnimatedPage >
  )
}

export default Home_MA 