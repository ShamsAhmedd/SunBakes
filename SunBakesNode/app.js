const express = require("express");
require("dotenv").config();
const logger = require("./middlewares/Logger");
const error = require("./middlewares/error");
const connectToDb = require("./config/db");
const cors = require("cors");
const path = require("path");
connectToDb();

// Initialize Express app
const app = express();
app.use('/assets', express.static(path.join(__dirname, './assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use CORS middleware
app.use(cors());

// Use logger middleware
app.use(logger);

// API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/auth", require("./routes/authStyle"));
app.use("/api",require("./routes/HeaderAndFooter"));
app.use("/api", require("./routes/password"));
app.use("/api/category",require("./routes/category"));
app.use("/api/about", require("./routes/about"));
app.use("/api/team", require("./routes/team"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/products", require("./routes/product"));
app.use("/api/cart", require("./routes/cart"));
// Error handling middleware
app.use(error.notFound);
app.use(error.errorHandler);

// Run the server
const port = process.env.PORT || 5002;
app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
