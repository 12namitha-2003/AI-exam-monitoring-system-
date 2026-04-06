require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", require("./routes/auth"));
// ✅ NEW ROUTES 
app.use("/api/exam", require("./routes/examRoutes"));
app.use("/api", require("./routes/submitRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
// ✅ Optional test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});


app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});