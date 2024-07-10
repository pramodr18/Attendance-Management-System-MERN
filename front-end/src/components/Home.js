import React, { useEffect, useState } from 'react';

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    adminRecords();
  }, []);

  const adminRecords = () => {
    fetch('http://localhost:3003/admin_records')
      .then(response => response.json())
      .then(result => {
        if (result.Status) {
          setAdmins(result.Result);
        } else {
          alert(result.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const adminCount = () => {
    fetch('http://localhost:3003/admin_count')
      .then(response => response.json())
      .then(result => {
        if (result.Status) {
          setAdminTotal(result.Result[0].admin);
        }
      })
      .catch(err => console.log(err));
  };

  const employeeCount = () => {
    fetch('http://localhost:3003/employee_count')
      .then(response => response.json())
      .then(result => {
        if (result.Status) {
          setEmployeeTotal(result.Result[0].employee);
        }
      })
      .catch(err => console.log(err));
  };

  const salaryCount = () => {
    fetch('http://localhost:3003/salary_count')
      .then(response => response.json())
      .then(result => {
        if (result.Status) {
          setSalaryTotal(result.Result[0].salaryOFEmp);
        } else {
          alert(result.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>${salaryTotal}</h5>
          </div>
        </div>
      </div>
      <div className='mt-4 px-5 pt-3'>
        <h3>List of Admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(a => (
              <tr key={a._id}>
                <td>{a.email}</td>
                <td>
                  <button className="btn btn-info btn-sm me-2">Edit</button>
                  <button className="btn btn-warning btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
