import React, { useState } from 'react';
import loginImage from './assets/loginimage.jpg';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleAdminLogin = () => {
    if((email === "admin@gmail.com") && (password === "admin123")){
      navigate('/admin-page')
    } 
    else{
      toast.error("Check the email and password")
    }
  };

  const handleReset = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <div
      id="container"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div id="image" style={{ flex: 1 }}>
        <img src={loginImage} alt="Login background" style={{  height: '50vh', paddingLeft: '111px' }} />
      </div>

      <div id="login-form" style={{ flex: 1, padding: '40px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginRight: '100px' }}>
        <h2>Admin Login</h2>
        <form>
          <label style={{ display: 'block', marginBottom: '10px' }}>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '96%', padding: '8px', marginBottom: '20px' }}
          />

          <label style={{ display: 'block', marginBottom: '10px' }}>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '96%', padding: '8px', marginBottom: '20px' }}
          />


          <button
            type="button"
            onClick={handleAdminLogin}
            style={{
              padding: '10px',
              background: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginBottom: '20px',
            }}
          >
            Login
          </button>

          <button
            type="reset"
            className='btnbtn btn-danger'
            onClick={handleReset}
            style={{
              padding: '10px',
              background: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginBottom: '20px',
              marginLeft: '20px',
            }}
          >
            Reset
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default AdminLogin;
