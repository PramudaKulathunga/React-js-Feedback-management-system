import React, { useState, useEffect } from 'react';
import './LecturerFeedback.css';
import AnimatedPage from '../AnimatedPage';
import Header_STD from '../../component/Header_STD/Header_STD';
import Footer from '../../component/Footer/Footer';
import logo from '../../Images/logo.png';
import Question from '../../component/Question/Question';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LecturerFeedback = () => {
  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toLocaleDateString();
  const navigate = useNavigate();

  useEffect(() => {
    setterData();
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    owner: "",
    teacher: "",
    course: "",
    semester: "",
    one: {},
    two: {},
    three: {},
    four: {},
    five: {},
    six: {},
    seven: {},
    eight: {},
    nine: {},
    ten: {},
    eleven: {},
    twelve: {},
    comment: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: parseInt(value) });
  }

  const onChangeHandler2 = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const setterData = () => {
    axios.post('http://localhost:8081/lecturerquestion')
      .then(res => {
        localStorage.setItem('q21', res.data[0].question);
        localStorage.setItem('q22', res.data[1].question);
        localStorage.setItem('q23', res.data[2].question);
        localStorage.setItem('q24', res.data[3].question);
        localStorage.setItem('q25', res.data[4].question);
        localStorage.setItem('q26', res.data[5].question);
        localStorage.setItem('q27', res.data[6].question);
        localStorage.setItem('q28', res.data[7].question);
        localStorage.setItem('q29', res.data[8].question);
        localStorage.setItem('q30', res.data[9].question);
        localStorage.setItem('q31', res.data[10].question);
        localStorage.setItem('q32', res.data[11].question);
      })
      .catch(err => console.log(err));
  };

  const onSubmitHandler = () => {

    formData.owner = localStorage.getItem('regNoR');
    formData.course = localStorage.getItem('courseR');
    formData.teacher = localStorage.getItem('teacherR');
    formData.semester = localStorage.getItem('semesterR');
    if (formData.one === "" || formData.two === "" || formData.three === "" || formData.four === "" || formData.five === "" || formData.six === "" || formData.seven === "" || formData.eight === "" || formData.nine === "" || formData.ten === "" || formData.eleven === "" || formData.twelve === "" || formData.comment === "") {
      alert("Please fill in all fields");
    }
    else {
      axios.post('http://localhost:8081/fms/lecturerfeedback', formData)
        .then(res => {
          navigate('/Home_STD');
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <AnimatedPage>
      <div className='box_CF'>
        <Header_STD />

        <Link to="/Home_STD"><button className='backBtn'>Back</button></Link>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={logo} alt="My Image" className='logo' />
          <p className='CFtext1'>Feedback Form</p>
          <p className='CFtext1'>Faculty of Engineering, University of Jaffna</p>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <p className='CFtext1'>Academic Year : {currentYear}</p>
            <div style={{ width: '30px' }} />
            <p className='CFtext1'>Semester : {localStorage.getItem('semesterR')}</p>
          </div>
          <br />
          <p className='CFtext1'>TEACHER EVALUATION</p>
        </div>
        <br />
        <div>
          <p className='CFtext2'>This questionnaire intends to collect feedback from the students about the course unit. Your valuable feedback will be vital for us to strengthen the teaching-learning environment to achieve excellence in teaching and learning.</p>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '-20px', marginRight: '50px' }}>
            <p className='CFtext1'>Corse Unit : {localStorage.getItem('courseR')}</p>
            <p className='CFtext1'>Date : {currentDate}</p>
          </div>
          <p className='CFtext1'>Name of the Teacher : {localStorage.getItem('teacherR')}</p>
          <br />
          <p className='CFtext2'>Please respond to the following statements by marking on the scale next to each statement (Ex.     ). The scale 1 to 5 refers to the following.</p>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '-20px', marginRight: '70px' }}>
            <p className='CFtext2'>-2	:	Strongly Disagree</p>
            <p className='CFtext2'>-1	:	Disagree</p>
            <p className='CFtext2'>0	:	Not Sure</p>
            <p className='CFtext2'>+1	:	Agree</p>
            <p className='CFtext2'>+2	:	Strongly Agree</p>
          </div>
          <div className='CFDetails'>
            <p className='CFtext1'>A. Time Management</p>
            <Question
              question={'i) ' + localStorage.getItem('q21')}
              value={formData.one}
              onChange={onChangeHandler}
              name="one"
            />
            <Question
              question={'ii) ' + localStorage.getItem('q22')}
              value={formData.two}
              onChange={onChangeHandler}
              name="two"
            />
            <Question
              question={'iii) ' + localStorage.getItem('q23')}
              value={formData.three}
              onChange={onChangeHandler}
              name="three"
            />
            <br />

            <p className='CFtext1'>B. Delivery Method</p>
            <Question
              question={'i) ' + localStorage.getItem('q24')}
              value={formData.four}
              onChange={onChangeHandler}
              name="four"
            />
            <Question
              question={'ii) ' + localStorage.getItem('q25')}
              value={formData.five}
              onChange={onChangeHandler}
              name="five"
            />
            <Question
              question={'iii) ' + localStorage.getItem('q26')}
              value={formData.six}
              onChange={onChangeHandler}
              name="six"
            />
            <br />

            <p className='CFtext1'>C. Subject Command</p>
            <Question
              question={'i) ' + localStorage.getItem('q27')}
              value={formData.seven}
              onChange={onChangeHandler}
              name="seven"
            />
            <Question
              question={'ii) ' + localStorage.getItem('q28')}
              value={formData.eight}
              onChange={onChangeHandler}
              name="eight"
            />
            <Question
              question={'iii) ' + localStorage.getItem('q29')}
              value={formData.nine}
              onChange={onChangeHandler}
              name="nine"
            />
            <Question
              question={'iv) ' + localStorage.getItem('q30')}
              value={formData.ten}
              onChange={onChangeHandler}
              name="ten"
            />
            <br />

            <p className='CFtext1'>D. About Myself</p>
            <Question
              question={'i) ' + localStorage.getItem('q31')}
              value={formData.eleven}
              onChange={onChangeHandler}
              name="eleven"
            />
            <Question
              question={'ii) ' + localStorage.getItem('q32')}
              value={formData.twelve}
              onChange={onChangeHandler}
              name="twelve"
            />
            <br />

            <p className='CFtext1'>Any other comments</p>
            <br />
            <input
              type="text"
              name="comment"
              value={formData.comment}
              onChange={onChangeHandler2}
              placeholder='Type here'
              className='CFInputBox'
            />
            <br />
            <button className='CfSubmitBtn' onClick={onSubmitHandler}>SUBMIT</button>
          </div>

        </div>

        <div style={{ height: '50px' }} />
        <Footer />
      </div>
    </AnimatedPage>
  )

}

export default LecturerFeedback