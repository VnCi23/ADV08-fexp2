const mongoose = require("mongoose");
const EmployeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  basic_salary: Number,
  allowance: Number,
  deductions: Number,
  total_salary: Number
});
module.exports = mongoose.model("Employee", EmployeeSchema);