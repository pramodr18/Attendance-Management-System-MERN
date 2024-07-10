import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3003/employees")
      .then(response => response.json())
      .then(result => {
        if (result.Status) {
          setEmployee(result.Result);
        } else {
          alert(result.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3003/delete_employee/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(result => {
      if (result.Status) {
        window.location.reload();
      } else {
        alert(result.Error);
      }
    })
    .catch(err => console.log(err));
  };

  const handleClockIn = (id) => {
    fetch(`http://localhost:3003/clock_in/${id}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(result => {
      if (result.Status) {
        alert("Clocked in successfully");
      } else {
        alert(result.Error);
      }
    })
    .catch(err => console.log(err));
  };

  const handleClockOut = (id) => {
    fetch(`http://localhost:3003/clock_out/${id}`, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(result => {
      if (result.Status) {
        alert("Clocked out successfully");
      } else {
        alert(result.Error);
      }
    })
    .catch(err => console.log(err));
  };

  const handleAddLeave = (id) => {
    const days = prompt("Enter number of leave days:");
    if (days) {
      fetch(`http://localhost:3003/add_leave/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ days: parseInt(days) })
      })
      .then(response => response.json())
      .then(result => {
        if (result.Status) {
          alert("Leave added successfully");
        } else {
          alert(result.Error);
        }
      })
      .catch(err => console.log(err));
    }
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/admin-page/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Working Hours</th>
              <th>Leaves</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr key={e._id}>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                <td>{e.salary}</td>
                <td>{e.workingHours}</td>
                <td>{e.leaves}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleClockIn(e._id)}
                  >
                    Clock In
                  </button>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleClockOut(e._id)}
                  >
                    Clock Out
                  </button>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleAddLeave(e._id)}
                  >
                    Add Leave
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
