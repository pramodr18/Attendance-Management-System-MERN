import React, { useState } from 'react';
import signupImage from './assets/signupimage.jpg';
import { toast } from 'react-toastify';

const Signup = ({ switchToLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3003/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          createPassword,
        }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        setErrorMessage(data.error || 'An error occurred during signup.');
        toast.error(data.error)
      } else {
        toast.success("Signup Successfull")
        handleReset()
        setErrorMessage('');
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.")
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const handleReset = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setCreatePassword('');
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
        <img src={signupImage} alt='' style={{ height: '50vh', paddingLeft: '111px' }} />
      </div>

      <div id="signup-form" style={{ flex: 1, padding: '40px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginRight: '100px' }}>
        <h2>Sign Up</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form>
          <label style={{ display: 'block', marginBottom: '10px' }}>First Name:</label>
          <input
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ width: '96%', padding: '8px', marginBottom: '20px' }}
          />

          <label style={{ display: 'block', marginBottom: '10px' }}>Last Name:</label>
          <input
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{ width: '96%', padding: '8px', marginBottom: '20px' }}
          />

          <label style={{ display: 'block', marginBottom: '10px' }}>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '96%', padding: '8px', marginBottom: '20px' }}
          />

          <label style={{ display: 'block', marginBottom: '10px' }}>Create Password:</label>
          <input
            type="password"
            placeholder="Create your password"
            value={createPassword}
            onChange={(e) => setCreatePassword(e.target.value)}
            style={{ width: '96%', padding: '8px', marginBottom: '20px' }}
          />

          <button
            type="button"
            onClick={handleSignup}
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
            Sign Up
          </button>

          <button
            type="reset"
            onClick={handleReset}
            style={{
              padding: '10px',
              background: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginBottom: '20px',
              marginLeft: '10px',
            }}
          >
            Reset
          </button>
        </form>
        <p>
          Already have an account? <button onClick={switchToLogin} className='switch'>Login</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
