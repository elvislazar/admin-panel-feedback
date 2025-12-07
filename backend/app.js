const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/connection");
const feedbackRoutes = require("./routes/feedbackRoutes");

dotenv.config();
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use("/feedback", feedbackRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
