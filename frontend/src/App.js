import { Routes, Route } from 'react-router-dom';
import { ContactUs, ForgotPassword, Home_MA, Home_STD, Login, RequestSent, ResetPwd, Signup01, Signup02, Signup03, CoruseFeedback, LecturerFeedback, FeedbackPage, StudentList, Course, Lecturer, QA, CourseAllocation, Summary, PasswordManager } from './pages';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/ContactUs' element={<ContactUs />} />
      <Route path='/FogotPassword' element={<ForgotPassword />} />
      <Route path='/Home_MA' element={<Home_MA />} />
      <Route path='/Home_STD' element={<Home_STD />} />
      <Route path='/RequestSent' element={<RequestSent />} />
      <Route path='/ResetPwd' element={<ResetPwd />} />
      <Route path='/Signup01' element={<Signup01 />} />
      <Route path='/Signup02' element={<Signup02 />} />
      <Route path='/Signup03' element={<Signup03 />} />
      <Route path='/CoruseFeedback' element={<CoruseFeedback />} />
      <Route path='/LecturerFeedback' element={<LecturerFeedback />} />
      <Route path='/FeedbackPage' element={<FeedbackPage />} />
      <Route path='/StudentList' element={<StudentList />} />
      <Route path='/Course' element={<Course />} />
      <Route path='/Lecturer' element={<Lecturer />} />
      <Route path='/QA' element={<QA />} />
      <Route path='/CourseAllocation' element={<CourseAllocation />} />
      <Route path='/Summary' element={<Summary />} />
      <Route path='/PasswordManager' element={<PasswordManager />} />
    </Routes>
  );
}

export default App;
