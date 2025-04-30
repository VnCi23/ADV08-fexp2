const express = require("express");
const mongoose = require("mongoose");
const Employee = require("./employee.model");
const cors = require("cors");
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.post("/employees", async (req, res) => {
  const { name, position, basic_salary, allowance, deductions } = req.body;
  const total_salary = (basic_salary + allowance) - deductions;
  const employee = new Employee({ name, position, basic_salary, allowance, deductions, total_salary });
  await employee.save();
  res.json(employee);
});

app.get("/employees", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// Catch-all handler for any request that doesn't match an API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(5000, () => console.log("Server running on port 5000"));