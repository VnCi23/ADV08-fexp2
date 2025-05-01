import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    basic_salary: 0,
    allowance: 0,
    deductions: 0,
  });
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState("insert");

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("https://adv08-fexp2-server.vercel.app/employees");
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://adv08-fexp2-server.vercel.app/employees", form);
      fetchEmployees();
      setForm({
        name: "",
        position: "",
        basic_salary: 0,
        allowance: 0,
        deductions: 0,
      });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div style={{ backgroundColor: "#1f1f1f", color: "#e5e5e5", minHeight: "100vh" }}>
      <header
        style={{
          backgroundColor: "#2a2a2a",
          color: "#e5e5e5",
          border: "1px solid #3a3a3a",
          padding: "1rem",
          borderRadius: "0.5rem",
          marginBottom: "1.5rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold capitalize mb-4 md:mb-0">FExp 2</h1>
          <nav className="flex space-x-2 md:space-x-4">
            <button
              onClick={() => setCurrentPage("insert")}
              className={`button ${currentPage === "insert" ? "active" : ""}`}
            >
              Insert Page
            </button>
            <button
              onClick={() => setCurrentPage("display")}
              className={`button ${currentPage === "display" ? "active" : ""}`}
            >
              Display Page
            </button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto p-4 md:p-6">
        {currentPage === "insert" && (
          <div className="flex justify-center items-center">
            <div>
              <div className="w-full max-w-lg bg-gray-800 text-gray-200 border border-gray-600 p-4 md:p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold capitalize mb-4">Employee Salary Form</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium mb-1" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      placeholder="Enter employee name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium mb-1" htmlFor="position">
                      Position
                    </label>
                    <input
                      id="position"
                      placeholder="Enter employee position"
                      value={form.position}
                      onChange={(e) => setForm({ ...form, position: e.target.value })}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="basic_salary">
                      Basic Salary
                    </label>
                    <input
                      id="basic_salary"
                      placeholder="Enter basic salary"
                      type="number"
                      value={form.basic_salary}
                      onChange={(e) => setForm({ ...form, basic_salary: +e.target.value })}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="allowance">
                      Allowance
                    </label>
                    <input
                      id="allowance"
                      placeholder="Enter allowance"
                      type="number"
                      value={form.allowance}
                      onChange={(e) => setForm({ ...form, allowance: +e.target.value })}
                      className="input"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium mb-1" htmlFor="deductions">
                      Deductions
                    </label>
                    <input
                      id="deductions"
                      placeholder="Enter deductions"
                      type="number"
                      value={form.deductions}
                      onChange={(e) => setForm({ ...form, deductions: +e.target.value })}
                      className="input"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <button type="submit" className="button">
                      Add Employee
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {currentPage === "display" && (
          <div className="flex justify-center items-center">
            <div>
              <div className="w-full max-w-4xl bg-gray-800 text-gray-200 border border-gray-600 p-8 md:p-12 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold capitalize mb-6">Employee List</h3>
                <table className="w-full border-collapse border border-gray-600 shadow-md text-base md:text-lg">
                  <thead>
                    <tr className="bg-gray-700 text-white">
                      <th className="border border-gray-600 px-4 md:px-6 py-3">Name</th>
                      <th className="border border-gray-600 px-4 md:px-6 py-3">Position</th>
                      <th className="border border-gray-600 px-4 md:px-6 py-3">Total Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp, i) => (
                      <tr
                        key={i}
                        className={`${
                          i % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                        } hover:bg-gray-600 transition`}
                      >
                        <td className="border border-gray-600 px-4 md:px-6 py-3">{emp.name}</td>
                        <td className="border border-gray-600 px-4 md:px-6 py-3">{emp.position}</td>
                        <td className="border border-gray-600 px-4 md:px-6 py-3">{emp.total_salary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
