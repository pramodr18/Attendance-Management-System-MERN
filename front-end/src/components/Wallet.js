import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const Wallet = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const infuraUrl = 'https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID'; // Replace with your Infura project ID

    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('disconnect', handleDisconnect);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      };
    } else {
      // Fallback to Infura if MetaMask is not available
      const web3Instance = new Web3(new Web3.providers.HttpProvider(infuraUrl));
      setWeb3(web3Instance);
    }
  });

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setAccount(accounts[0]);
      getTransactionHistory(accounts[0]);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  const connectWallet = async () => {
    if (web3) {
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
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(0);
    setTransactions([]);
    console.log('Wallet disconnected');
  };

  const sendPayment = async () => {
    if (web3) {
      try {
        await web3.eth.sendTransaction({
          from: account,
          to: recipient,
          value: web3.utils.toWei(amount, 'ether'),
        });
        saveTransaction(account, recipient, amount);
        setRecipient('');
        setAmount('');
        getTransactionHistory(account);
      } catch (error) {
        console.error('Transaction error:', error);
      }
    }
  };

  const saveTransaction = async (sender, recipient, amount) => {
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: sender,
          recipient,
          amount,
          date: new Date(),
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to save transaction');
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const getTransactionHistory = async (userId) => {
    try {
      const response = await fetch(`/api/transactions/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transaction history');
      }
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  };

  return (
    <div className="wallet-container">
      <h1 className="wallet-title">Wallet</h1>
      {account ? (
        <div>
          <p className="wallet-info">Account: {account}</p>
          <p className="wallet-info">Balance: {balance} ETH</p>
          <div className="wallet-form">
            <input
              type="text"
              placeholder="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="wallet-input"
            />
            <input
              type="text"
              placeholder="Amount in ETH"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="wallet-input"
            />
            <button onClick={sendPayment} className="wallet-button">Send Payment</button>
          </div>
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
        <button onClick={connectWallet} className="wallet-button">Connect Wallet</button>
      )}
    </div>
  );
};

export default Wallet;
