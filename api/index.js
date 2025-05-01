const express = require("express");
const mongoose = require("mongoose");
const Employee = require("./employee.model");
const cors = require("cors");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:3000", "https://adv08-fexp2.vercel.app"],
  methods: "GET,POST", 
  allowedHeaders: "Content-Type,Authorization", 
};

app.use(cors(corsOptions));

mongoose.connect("mongodb+srv://vincegaurino:vincegaurino1823*@mstipgrading.jfugg.mongodb.net/fexp2")
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

// Export the app for Vercel
module.exports = app;