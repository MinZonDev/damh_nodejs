import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    if (!email || !password || !firstName || !lastName) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/register', {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName
      });
      console.log(response.data);
      // Xử lý dữ liệu trả về ở đây, có thể chuyển hướng trang sau khi đăng ký thành công
    } catch (error) {
      console.error(error.response.data);
      setError(error.response.data.message);
      // Xử lý lỗi từ API ở đây
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input className="register-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="register-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input className="register-input" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input className="register-input" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <button className="register-button" onClick={handleRegister}>Register</button>
      <p>Already have account!<Link to="/login"> Login</Link></p>
    </div>
  );
};

export default Register;
