import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link hooks

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = async () => {
    // Kiểm tra xem email và password có được nhập hay không
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/login', {
        email: email,
        password: password
      });

      // Lưu token vào localStorage
      localStorage.setItem('token', response.data.token.access.token);

      // Xác định quyền của người dùng và chuyển hướng tới trang tương ứng
      if (response.data.data.role === 'admin') {
        navigate('/admin'); // Chuyển hướng đến trang Admin nếu có quyền admin
      } else {
        navigate('/'); // Chuyển hướng đến trang Home nếu có quyền student hoặc mặc định
      }
    } catch (error) {
      console.error(error);
      // Nếu có lỗi từ API, hiển thị thông báo lỗi từ phản hồi
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hiển thị thông báo lỗi */}
      <input className="login-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="login-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="login-button" onClick={handleLogin}>Login</button>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
      <p><Link to="/forgot-password">Forgot password?</Link></p>
    </div>
  );
};

export default Login;
