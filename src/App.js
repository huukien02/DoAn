import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Login from './component/Login/Login';
import ResetPass from './component/ResetPass/ResetPass';
import Home from './component/Home/Home';
import Student from './component/QL_student/Student';
import Teacher from './component/QL_teacher/Teacher';
import Class from './component/QL_class/Class'
import Grades from './component/QL_grades/Grades';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/qlstudent' element={<Student />} />
          <Route path='/qlteacher' element={<Teacher />} />
          <Route path='/qlclass' element={<Class />} />
          <Route path='/qlgrades' element={<Grades />} />
          <Route path='/login' element={<Login />} />
          <Route path='/resetpass' element={<ResetPass />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
