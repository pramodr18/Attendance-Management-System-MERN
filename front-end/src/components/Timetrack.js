import React, { useEffect, useState } from 'react';

function Timetrack() {
  const [trackingData, setTrackingData] = useState([]);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3003/tracking-data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTrackingData(data);
      } catch (error) {
        console.error('Error fetching tracking data:', error);
      }
    };

    fetchTrackingData();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>User Login Tracking Data</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Login Time</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Logout Time</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Duration (seconds)</th>
          </tr>
        </thead>
        <tbody>
          {trackingData.map((entry, index) => (
            <tr key={index} style={{ textAlign: 'center' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(entry.loginTime).toLocaleString()}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(entry.logoutTime).toLocaleString()}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Timetrack;
