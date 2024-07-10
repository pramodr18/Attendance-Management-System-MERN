// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from 'react-router-dom';

// function ApplyLeave() {
//   const location = useLocation();
//   const email = location.state?.email || ""; // Retrieve email from the location state

//   const navigate = useNavigate();

//   const [leave, setLeave] = useState({
//     startDate: "",
//     endDate: "",
//     reason: "",
//   });

//   const [status, setStatus] = useState("pending");
//   const [name, setName] = useState("");
//   const [userEmail, setUserEmail] = useState("");

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
//         setName(`${data.firstName} ${data.lastName}`);
//         setUserEmail(data.email);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserName();
//   }, [email]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     applyLeave();
//   };

//   const applyLeave = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:3003/apply_leave", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, ...leave, status }),
//       });
//       if (!response.ok) {
//         throw new Error(`Error applying leave: ${response.statusText}`);
//       }
//       const data = await response.json();
//       if (data.Status) {
//         alert("Leave applied successfully. Status is pending.");
//       } else {
//         alert(data.Error);
//       }
//     } catch (error) {
//       console.error("Error applying leave:", error);
//     }
//   };

//   const cancelLeave = () => {
//     setLeave({
//       startDate: "",
//       endDate: "",
//       reason: "",
//     });
//     setStatus("cancelled");
//     navigate('/dashboard');
//   };

//   return (
//     <>
//       <p> Leave Status: <span className="leave-clr"> Pending</span> </p>
//       <div className="mcard">
//         <div className="maincard">
//           <div className="d-flex justify-content-center align-items-center mt-3">
//             <div className="p-3 rounded w-50 border">
//               <h3 className="text-center">Apply for Leave</h3>
//               <form className="row g-1" onSubmit={handleSubmit}>
//                 <div className="col-12">
//                   <label htmlFor="inputName" className="form-label">Name</label>
//                   <input
//                     type="text"
//                     className="form-control rounded-0"
//                     id="inputName"
//                     value={name}
//                     readOnly
//                   />
//                 </div>
//                 <div className="col-12">
//                   <label htmlFor="inputEmail" className="form-label">Email</label>
//                   <input
//                     type="email"
//                     className="form-control rounded-0"
//                     id="inputEmail"
//                     value={userEmail}
//                     readOnly
//                   />
//                 </div>
//                 <div className="col-12">
//                   <label htmlFor="inputStartDate" className="form-label">Start Date</label>
//                   <input
//                     className="form-control"
//                     type="date"
//                     value={leave.startDate}
//                     onChange={(e) => setLeave({ ...leave, startDate: e.target.value })}
//                     required
//                   />
//                 </div>
//                 <div className="col-12">
//                   <label htmlFor="inputEndDate" className="form-label">End Date</label>
//                   <input
//                     className="form-control"
//                     type="date"
//                     value={leave.endDate}
//                     onChange={(e) => setLeave({ ...leave, endDate: e.target.value })}
//                     required
//                   />
//                 </div>
//                 <div className="col-12">
//                   <label htmlFor="inputReason" className="form-label">Reason</label>
//                   <input
//                     className="form-control"
//                     type="text"
//                     placeholder="Reason"
//                     value={leave.reason}
//                     onChange={(e) => setLeave({ ...leave, reason: e.target.value })}
//                     required
//                   />
//                 </div>
//                 <div className="col-12 text-center mt-3">
//                   <button type="submit" className="btn btn-success me-2">
//                     Apply
//                   </button>
//                   <button type="button" onClick={cancelLeave} className="btn btn-warning">
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ApplyLeave;
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

function ApplyLeave() {
  const location = useLocation();
  const email = location.state?.email || ""; // Retrieve email from the location state

  const navigate = useNavigate();

  const [leave, setLeave] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [status, setStatus] = useState("pending");
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");

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
        setName(`${data.firstName} ${data.lastName}`);
        setUserEmail(data.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserName();
  }, [email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    applyLeave();
  };

  const applyLeave = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3003/apply_leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...leave, status }),
      });
      if (!response.ok) {
        throw new Error(`Error applying leave: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.Status) {
        alert("Leave applied successfully. Status is pending.");
      } else {
        alert(data.Error);
      }
    } catch (error) {
      console.error("Error applying leave:", error);
    }
  };

  const cancelLeave = () => {
    setLeave({
      startDate: "",
      endDate: "",
      reason: "",
    });
    setStatus("cancelled");
    navigate('/dashboard');
  };

  return (
    <>
      <p> Leave Status: <span className="leave-clr"> Pending</span> </p>
      <div className="mcard">
        <div className="maincard">
          <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
              <h3 className="text-center">Apply for Leave</h3>
              <form className="row g-1" onSubmit={handleSubmit}>
                <div className="col-12">
                  <label htmlFor="inputName" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="inputName"
                    value={name}
                    readOnly
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="inputEmail" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control rounded-0"
                    id="inputEmail"
                    value={userEmail}
                    readOnly
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="inputStartDate" className="form-label">Start Date</label>
                  <input
                    className="form-control"
                    type="date"
                    value={leave.startDate}
                    onChange={(e) => setLeave({ ...leave, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="inputEndDate" className="form-label">End Date</label>
                  <input
                    className="form-control"
                    type="date"
                    value={leave.endDate}
                    onChange={(e) => setLeave({ ...leave, endDate: e.target.value })}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="inputReason" className="form-label">Reason</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Reason"
                    value={leave.reason}
                    onChange={(e) => setLeave({ ...leave, reason: e.target.value })}
                    required
                  />
                </div>
                <div className="col-12 text-center mt-3">
                  <button type="submit" className="btn btn-success me-2">
                    Apply
                  </button>
                  <button type="button" onClick={cancelLeave} className="btn btn-warning">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplyLeave;
