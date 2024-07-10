// import React, { useState } from 'react';
// import loginImage from './assets/loginimage.jpg';
// import { useNavigate } from 'react-router';
// import { toast } from 'react-toastify';

// const Login = ({ switchToSignup }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isChecked, setIsChecked] = useState(false);

//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     if (!isChecked) {
//       alert('Please check the box to agree to the terms.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3003/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (data.error) {
//         console.log(data.error);
//         toast.error(data.error);
//       } else {
//         console.log('Login successful');
//         toast.success('Login successful');
//         navigate('/dashboard', { state: { email } });
//       }
//     } catch (error) {
//       console.log('An error occurred');
//     }
//   };

//   const handleReset = () => {
//     setEmail('');
//     setPassword('');
//     setIsChecked(false);
//   };

//   const handleAdminClick = () => {
//     navigate('/admin');
//   };

//   return (
//     <div
//       id="container"
//       style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh',
//         borderRadius: '8px',
//         boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//       }}
//     >
//       <div id="image" style={{ flex: 1 }}>
//         <img src={loginImage} alt="Login background" style={{ height: '50vh', paddingLeft: '111px' }} />
//       </div>

//       <div
//         id="login-form"
//         style={{ flex: 1, padding: '40px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginRight: '100px' }}
//       >
//         <h2>Login</h2>
//         <p>
//           Login as{' '}
//           <button className="btn btn-primary" style={{ marginRight: '20px' }} onClick={handleAdminClick}>
//             Admin
//           </button>
//         </p>
//         <form>
//           <label style={{ display: 'block', marginBottom: '10px' }}>Email:</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={{ width: '96%', padding: '8px', marginBottom: '20px' }}
//           />

//           <label style={{ display: 'block', marginBottom: '10px' }}>Password:</label>
//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={{ width: '96%', padding: '8px', marginBottom: '20px' }}
//           />

//           <label style={{ display: 'block', marginBottom: '10px' }}>
//             <input
//               type="checkbox"
//               name="terms"
//               checked={isChecked}
//               onClick={() => setIsChecked(!isChecked)}
//               style={{ marginRight: '5px' }}
//             />
//             Agree to the terms and conditions
//           </label>

//           <button
//             type="button"
//             onClick={handleLogin}
//             style={{
//               padding: '10px',
//               background: '#007BFF',
//               color: '#fff',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//               marginBottom: '20px',
//             }}
//           >
//             Login
//           </button>

//           <button
//             type="reset"
//             className="btnbtn btn-danger"
//             onClick={handleReset}
//             style={{
//               padding: '10px',
//               background: '#007BFF',
//               color: '#fff',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//               marginBottom: '20px',
//               marginLeft: '20px',
//             }}
//           >
//             Reset
//           </button>
//         </form>
//         <p>
//           Don't have an account? <button onClick={switchToSignup} className="switch">Sign Up</button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import loginImage from './assets/loginimage.jpg';

const Login = ({ switchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!isChecked) {
      alert('Please check the box to agree to the terms.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3003/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success('Log in successful');
        const loginTime = new Date().toISOString();
        navigate('/dashboard', { state: { email, loginTime } }); // Pass loginTime to Dashboard
      }
    } catch (error) {
      console.log('An error occurred');
    }
  };

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setIsChecked(false);
  };
  const handleAdminClick = () => {
        navigate('/admin');
      };

  return (
    <div id="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <div id="image" style={{ flex: 1 }}>
        <img src={loginImage} alt="Login background" style={{ height: '50vh', paddingLeft: '111px' }} />
      </div>

      <div id="login-form" style={{ flex: 1, padding: '40px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginRight: '100px' }}>
        <h2>Login</h2>
        <p>
           Login as{' '}
           <button className="btn btn-primary" style={{ marginRight: '20px' }} onClick={handleAdminClick}>
             Admin
           </button>
         </p>
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
          <label style={{ display: 'block', marginBottom: '10px' }}>
            <input
              type="checkbox"
              name="terms"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              style={{ marginRight: '5px' }}
            />
            Agree to the terms and conditions
          </label>
          <button type="button" onClick={handleLogin} style={{ padding: '10px', background: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}>
            Login
          </button>
          <button type="reset" onClick={handleReset} style={{ padding: '10px', background: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px', marginLeft: '20px' }}>
            Reset
          </button>
        </form>
        <p>Don't have an account? <button onClick={switchToSignup} className='switch'>Sign Up</button></p>
      </div>
    </div>
  );
};

export default Login;
