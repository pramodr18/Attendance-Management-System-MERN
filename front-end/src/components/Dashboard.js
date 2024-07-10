
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router';

// function Dashboard() {
//   const location = useLocation();
//   const email = location.state?.email;
//   const loginTime = new Date(location.state?.loginTime); // Convert to Date object

//   const [userName, setUserName] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserName = async () => {
//       if (!email) return;

//       try {
//         const response = await fetch('http://127.0.0.1:3003/user', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ email }),
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         const { firstName, lastName } = data;
//         setUserName(`${firstName} ${lastName}`);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserName();
//   }, [email]);

//   const handleLogout = async () => {
//     if (!loginTime) {
//       console.error('Error: loginTime is not available');
//       return;
//     }

//     const logoutTime = new Date();
//     const duration = (logoutTime - loginTime) / 1000;

//     try {
//       await fetch('http://127.0.0.1:3003/track-time', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           loginTime: loginTime.toISOString(),
//           logoutTime: logoutTime.toISOString(),
//           duration,
//         }),
//       });
//     } catch (error) {
//       console.error('Error tracking user time:', error);
//     }

//     navigate('/');
//   };

//   const handleLeave = () => {
//     navigate('/apply-leave', { state: { email } });
//   };

//   return (
//     <>
//       <h1>Welcome back {userName}</h1>
//       <button className='switch' onClick={handleLogout}>Log out</button>
//       <button className='switch' onClick={handleLeave}>Apply Leave</button>
//     </>
//   );
// }

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import Web3 from 'web3';
import Modal from 'react-modal';

function Dashboard() {
  const location = useLocation();
  const email = location.state?.email;
  const loginTime = new Date(location.state?.loginTime); // Convert to Date object

  const [userName, setUserName] = useState('');
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      if (!email) return;

      try {
        const response = await fetch('http://127.0.0.1:3003/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const { firstName, lastName } = data;
        setUserName(`${firstName} ${lastName}`);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserName();
  }, [email]);

  const handleLogout = async () => {
    if (!loginTime) {
      console.error('Error: loginTime is not available');
      return;
    }

    const logoutTime = new Date();
    const duration = (logoutTime - loginTime) / 1000;

    try {
      await fetch('http://127.0.0.1:3003/track-time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          loginTime: loginTime.toISOString(),
          logoutTime: logoutTime.toISOString(),
          duration,
        }),
      });
    } catch (error) {
      console.error('Error tracking user time:', error);
    }

    navigate('/');
  };

  const handleLeave = () => {
    navigate('/apply-leave', { state: { email } });
  };

  const connectWallet = async (provider) => {
    const infuraUrl = 'https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID'; // Replace with your Infura project ID

    if (provider === 'metamask' && window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const balance = await web3.eth.getBalance(accounts[0]);
        setBalance(web3.utils.fromWei(balance, 'ether'));
        getTransactionHistory(accounts[0]);
      } catch (error) {
        console.error('User denied account access');
      }
    } else if (provider === 'infura') {
      const web3Instance = new Web3(new Web3.providers.HttpProvider(infuraUrl));
      setWeb3(web3Instance);
    }

    setModalIsOpen(false);
  };

  const getTransactionHistory = async (account) => {
    try {
      const response = await fetch(`/api/transactions/${account}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transaction history');
      }
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(0);
    setTransactions([]);
    console.log('Wallet disconnected');
  };

  return (
    <>
      <h1>Welcome back {userName}</h1>
      <button className='switch' onClick={handleLogout}>Log out</button>
      <button className='switch' onClick={handleLeave}>Apply Leave</button>

      <div className="wallet-container">
        {account ? (
          <div>
            <p className="wallet-info">Account: {account}</p>
            <p className="wallet-info">Balance: {balance} ETH</p>
            <button onClick={disconnectWallet} className="wallet-button">Disconnect Wallet</button>
            <h2 className="wallet-title">Transaction History</h2>
            <ul className="wallet-transactions">
              {transactions.map((tx) => (
                <li key={tx._id} className="wallet-transaction">
                  To: {tx.recipient} | Amount: {tx.amount} ETH | Date: {new Date(tx.date).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <button onClick={() => setModalIsOpen(true)} className="wallet-button">Connect Wallet</button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              contentLabel="Select Wallet"
              className="wallet-modal "
              overlayClassName="wallet-overlay"
            >
              <h2>Select a Wallet</h2>
              <button onClick={() => connectWallet('metamask')} className="wallet-button">MetaMask</button>
              <button onClick={() => connectWallet('infura')} className="wallet-button">Infura</button>
            </Modal>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;


