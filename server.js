const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const { mongoURI } = require("./config/keys");

/* -------------------------------------------------------------------------- */

const app = express();

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Use Routes
app.get("/", (req, res) => res.send("Helloooooo"));

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

/* -------------------------------------------------------------------------- */

const port = process.env.port || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
