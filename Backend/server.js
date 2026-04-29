const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// 📁 FILE PATH (simple persistence)
const DATA_PATH = path.join(__dirname, "userData.json");

// ==========================
// 🌍 SYSTEM DATA (PUBLIC)
// ==========================
let systemShades = [
  { id: 1, name: "Terracotta Red", hex: "#C65A3A", family: "Warm" },
  { id: 2, name: "Coral Clay", hex: "#D96C4A", family: "Warm" },
  { id: 3, name: "Mustard Gold", hex: "#C99A3B", family: "Warm" },
  { id: 4, name: "Sage Green", hex: "#8AA89F", family: "Cool" },
  { id: 5, name: "Ocean Blue", hex: "#6F8FAF", family: "Cool" },
  { id: 6, name: "Mint Frost", hex: "#A8C3BC", family: "Cool" },
  { id: 7, name: "Warm Taupe", hex: "#6E5E56", family: "Neutral" },
  { id: 8, name: "Sand Beige", hex: "#D6C8B0", family: "Neutral" },
  { id: 9, name: "Charcoal Black", hex: "#2E2E2E", family: "Dark" },
  { id: 10, name: "Deep Slate", hex: "#3A3A3A", family: "Dark" }
];

// ==========================
// 👤 USER DATA (PERSISTENT)
// ==========================
let userShades = [];

// 🔥 Load from file if exists
if (fs.existsSync(DATA_PATH)) {
  const raw = fs.readFileSync(DATA_PATH);
  userShades = JSON.parse(raw);
}

// 🔥 Save helper
function saveData() {
  fs.writeFileSync(DATA_PATH, JSON.stringify(userShades, null, 2));
}

// ==========================
// 🌍 PUBLIC ROUTES
// ==========================
app.get("/shades", (req, res) => {
  res.json(systemShades);
});

app.get("/trending", (req, res) => {
  const sorted = [...systemShades].sort(() => 0.5 - Math.random());
  res.json(sorted.slice(0, 5));
});

// ==========================
// 👤 USER ROUTES
// ==========================

// upload CSV data
app.post("/upload", (req, res) => {
  const data = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ error: "Invalid format" });
  }

  userShades = data.map((item, i) => ({
    id: i,
    name: item.name,
    value: Number(item.value) || 0,
    category: item.category || "Unknown",
    trend: item.trend || "Normal"
  }));

  saveData();

  res.json({ message: "Saved successfully", count: userShades.length });
});

// get uploaded data
app.get("/user-shades", (req, res) => {
  res.json(userShades);
});

// 🔥 CLEAR DATA (useful for testing)
app.delete("/user-shades", (req, res) => {
  userShades = [];
  saveData();
  res.json({ message: "Data cleared" });
});

// ==========================
// START SERVER
// ==========================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}); 