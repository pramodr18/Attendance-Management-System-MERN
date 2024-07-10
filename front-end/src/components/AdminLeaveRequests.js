import React, { useEffect, useState } from 'react';

function AdminLeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3003/leave_requests');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLeaveRequests(data.Result);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleDecision = async (id, decision) => {
    try {
      const response = await fetch('http://127.0.0.1:3003/leave_requests/approve_reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: decision }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.Status) {
        setLeaveRequests(leaveRequests.map(req => req.id === id ? { ...req, status: decision } : req));
      } else {
        alert(data.Error);
      }
    } catch (error) {
      console.error('Error approving/rejecting leave request:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Leave Requests</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Email</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.email}</td>
              <td>{request.startDate}</td>
              <td>{request.endDate}</td>
              <td>{request.reason}</td>
              <td>{request.status}</td>
              <td>
                {request.status === 'pending' && (
                  <>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleDecision(request.id, 'approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDecision(request.id, 'rejected')}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminLeaveRequests;
