require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

// Route imports (corrected paths)
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const leaveRoutes = require('./routes/leave');
const onboardingRoutes = require('./routes/onboarding');
const offboardingRoutes = require('./routes/offboarding');
const auditRoutes = require('./routes/audit');
const employeeRoutes = require('./routes/employees'); // ✅ NEW

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Make Prisma available in all routes
app.set('prisma', prisma);

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/offboarding', offboardingRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/employees', employeeRoutes); // ✅ NEW

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ CoreNZ backend running on port ${PORT}`);
});
