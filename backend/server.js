const express = require("express");
const app = express();
const PORT = 5000;

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Test API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend API!" });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
