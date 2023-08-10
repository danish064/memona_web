// ./src/index.js
// importing the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const connection = require("./db");
const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use("/api", authRoutes);

// defining an endpoint to return all ads
app.get("/api/tech_roles", (req, res) => {
  connection.query("SELECT * FROM roles", (err, results, fields) => {
    if (err) throw err;
    console.log(results);
    res.status(200).send(results);
  });
});
app.post("/api/assign_role", (req, res) => {
  console.log(req.body);
  connection.query(
    `INSERT INTO technician_assignment (rid, uid) VALUES ('${req.body.rid}', '${req.body.uid}')`,
    (err, results, fields) => {
      if (err) throw err;
      console.log(results);
      res.status(200).send(results);
    }
  );
});
// app.post("/api/login", );

// starting the server
app.listen(3001, () => {
  console.log("listening on port 3001");
});
