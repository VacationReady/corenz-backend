const express = require('express');
const router = express.Router();

// GET /api/employees
router.get('/', async (req, res) => {
  const prisma = req.app.get('prisma');
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(employees);
  } catch (err) {
    console.error('GET /api/employees failed:', err);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// POST /api/employees
router.post('/', async (req, res) => {
  const prisma = req.app.get('prisma');
  const { name, phone, department, jobRole } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  try {
    const newEmployee = await prisma.employee.create({
      data: { name, phone, department, jobRole }
    });
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error('POST /api/employees failed:', err);
    res.status(500).json({ error: 'Failed to create employee' });
  }
});

module.exports = router;
