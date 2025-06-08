const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const prisma = req.app.get("prisma");

  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });

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
