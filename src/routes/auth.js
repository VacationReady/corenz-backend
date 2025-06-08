const express = require("express");
const router = express.Router();
const db = require("../db"); // or your Prisma instance if not using raw SQL

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    if (user.password === password) {
      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
