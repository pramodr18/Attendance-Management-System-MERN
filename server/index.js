const express = require("express");
const dbconnect = require("./mongodb");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, createPassword } = req.body;
    const db = await dbconnect();
    const usersCollection = db.collection('users');
    const existingData = await usersCollection.findOne({ email });

    if (existingData) {
      console.log("Email already exists");
      return res.status(400).json({ error: "Email already exists" });
    }

    const data = await usersCollection.insertOne({
      firstName,
      lastName,
      email,
      createPassword,
    });

    if (data.acknowledged) {
      console.log("Data saved successfully");
      return res.status(200).json({ message: "Signup successful" });
    } else {
      return res.status(500).json({ error: "Failed to save data" });
    }
  } catch (error) {
    console.error("Error occurred", error);
    return res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await dbconnect();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email, createPassword: password });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error occurred", error);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});

app.get('/employees', async (req, res) => {
  try {
    const db = await dbconnect();
    const employeesCollection = db.collection('employees');
    const employees = await employeesCollection.find({}).toArray();
    res.json({ Status: true, Result: employees });
  } catch (error) {
    console.error("Error occurred", error);
    res.json({ Status: false, Error: "Query Error" });
  }
});

app.delete('/delete_employee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await dbconnect();
    const employeesCollection = db.collection('employees');
    const result = await employeesCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      res.json({ Status: true });
    } else {
      res.json({ Status: false, Error: "Failed to delete employee" });
    }
  } catch (error) {
    console.error("Error occurred", error);
    res.json({ Status: false, Error: "Query Error" });
  }
});


app.post('/add_employee', async (req, res) => {
  try {
    const { name, email, password, salary, address, category_id } = req.body;
    const db = await dbconnect();
    const employeesCollection = db.collection('employees');
    const result = await employeesCollection.insertOne({
      name,
      email,
      password,
      salary,
      address,
    });

    if (result.acknowledged) {
      res.json({ Status: true });
    } else {
      res.status(500).json({ Status: false, Error: "Failed to add employee" });
    }
  } catch (error) {
    console.error("Error occurred", error);
    res.status(500).json({ Status: false, Error: "An error occurred. Please try again later." });
  }
});

app.get('/user', async (req, res) => {
  const db = await dbconnect();
  const employeesCollection = db.collection('users');
  const employees = await employeesCollection.find({}).toArray();
  res.send(employees)
})

app.post('/user', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  try {
    const db = await dbconnect();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email: email });

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send('User not found');
    }
    
  } catch (error) {
    console.error('Error fetching user:');
    res.status(500).send('Internal server error');
  }
});

app.post('/track-time', async (req, res) => {
  const { email, loginTime, logoutTime, duration } = req.body;

  if (!email || !loginTime || !logoutTime || !duration) {
    return res.status(400).send('Invalid data');
  }

  try {
    const db = await dbconnect();
    const trackingCollection = db.collection('userTracking');
    await trackingCollection.insertOne({
      email,
      loginTime,
      logoutTime,
      duration,
    });

    res.status(200).send('User time tracked successfully');
  } catch (error) {
    console.error('Error tracking user time:', error);
    res.status(500).send('Internal server error');
  }
});

app.post('/apply_leave', async (req, res) => {
  const {name, email, startdate, enddate, reason} = req.body;
  const db = await dbconnect() 
  try {
    const result = db.collection('leave_requests');
    await result.insertOne({
      name,
      email,
      startdate,
      enddate,
      reason,
    })
    res.status(201).json({ Status: 'Leave applied successfully' });
  } catch (error) {
    console.error('Error applying leave:', error);
    res.status(500).json({ Error: 'Failed to apply leave' });
  }
});

app.get('/leave_requests', async (req, res) => {
  try{
    const db = await dbconnect();
    const leaverequest = db.collection('leave_request');
    const leavedata = await leaverequest.find({}).toArray();
    res.status(200).send(leavedata);
  }catch (error) {
    console.error('Error fetching tracking data:', error);
    res.status(500).send('Internal server error');
  }
})

app.get('/tracking-data', async (req, res) => {
  try {
    const db = await dbconnect();
    const trackingCollection = db.collection('userTracking');
    const trackingData = await trackingCollection.find({}).toArray();
    res.status(200).send(trackingData);
  } catch (error) {
    console.error('Error fetching tracking data:', error);
    res.status(500).send('Internal server error');
  }
});




app.listen(3003, () => {
  console.log("Server running at port 3003");
});

app.get('/admin_count', async (req, res) => {
  try {
    const db = await dbconnect();
    const adminCount = await db.collection('admins').countDocuments();
    res.json({ Status: true, Result: [{ admin: adminCount }] });
  } catch (error) {
    console.error("Error occurred", error);
    res.json({ Status: false, Error: "Query Error" });
  }
});

app.get('/employee_count', async (req, res) => {
  try {
    const db = await dbconnect();
    const employeeCount = await db.collection('employees').countDocuments();
    res.json({ Status: true, Result: [{ employee: employeeCount }] });
  } catch (error) {
    console.error("Error occurred", error);
    res.json({ Status: false, Error: "Query Error" });
  }
});

app.get('/salary_count', async (req, res) => {
  try {
    const db = await dbconnect();
    const salarySum = await db.collection('employees').aggregate([
      { $group: { _id: null, salaryOFEmp: { $sum: "$salary" } } }
    ]).toArray();
    res.json({ Status: true, Result: salarySum });
  } catch (error) {
    console.error("Error occurred", error);
    res.json({ Status: false, Error: "Query Error" });
  }
});


