import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/forgotpassword', { email });
      setMessage(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage(error.response.data);
      } else {
        setMessage('Internal Server Error');
      }
    }
  };

  return (
    <div className="forgot-password-container">
      <h1 className="forgot-password-title">Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input className="forgot-password-input" type="email" value={email} onChange={handleEmailChange} />
        </div>
        <button className="forgot-password-button" type="submit">Reset Password</button>
      </form>
      <p><Link to="/login"> Back</Link></p>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
