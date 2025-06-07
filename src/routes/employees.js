// src/routes/employees.js
const express = require('express')
const router = express.Router()

// In-memory employee array (for now)
let employees = [
  { id: 1, name: 'Alice Johnson', phone: '021 123 4567', department: 'HR', jobRole: 'Manager' },
  { id: 2, name: 'Bob Smith', phone: '022 234 5678', department: 'Sales', jobRole: 'Sales Rep' },
]

// GET /employees
router.get('/', (req, res) => {
  res.json(employees)
})

// POST /employees
router.post('/', (req, res) => {
  const { name, phone, department, jobRole } = req.body

  if (!name) return res.status(400).json({ message: 'Name is required' })

  const newEmployee = {
    id: employees.length + 1,
    name,
    phone,
    department,
    jobRole,
  }

  employees.push(newEmployee)
  res.status(201).json(newEmployee)
})

module.exports = router
