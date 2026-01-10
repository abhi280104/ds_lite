const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);



module.exports = app;
