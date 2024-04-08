import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'; // Import Routes and Navigate
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Admin from './components/Admin';
import axios from 'axios'; // Import axios for making HTTP requests
import CreateExam from './components/CreateExam';
import ExamList from './components/ExamList';

const App = () => {
  const logout = async () => {
    try {
      await axios.get('http://localhost:3000/api/v1/auth/logout'); // Thực hiện yêu cầu đến API để logout
      localStorage.removeItem('token'); // Xóa token từ localStorage
      // Chuyển hướng đến trang Login sau khi logout thành công
      return <Navigate to="/login" />;
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button> {/* Thêm nút Logout */}
            </li>
            <li>
              <Link to="/create-exam">Create Exam</Link>
            </li>
            <li>
              <Link to="/exam-list">Exam List</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/create-exam" component={CreateExam} />
          <Route path="/exam-list" component={ExamList} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
