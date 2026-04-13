const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/v1/tasks", taskRoutes);

app.use((err, req, res, next) => {
  if (err.message === "NOT_FOUND") {
    return res.status(404).json({ message: "Resource not found" });
  }

  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
});

module.exports = app;