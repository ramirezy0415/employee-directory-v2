const express = require("express");
const app = express();
const { employees, addEmployee } = require("../db/employees");

app.route("/").get((req, res) => {
  res.send(employees);
});

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
app.route("/random").get((req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

app.route("/:id").get((req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});

app.route("/").post((req, res) => {
  const name = req.body;
  const addedEmployee = addEmployee(name);
  if (!addedEmployee) {
    return res.status(400).json({ error: "Failed to add employee" });
  }
  return res
    .status(201)
    .json({ message: "Added Employee. ", data: addedEmployee });
});

module.exports = app;
