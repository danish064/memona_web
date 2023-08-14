// ./src/index.js
// importing the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const technicianRoutes = require("./routes/technician");
const supervisorRoutes = require("./routes/supervisor");

const connection = require("./db");
const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use("/api", authRoutes);
app.use("/api", technicianRoutes);
app.use("/api", supervisorRoutes);

app.get("/api/categories", async (req, res) => {
  const [categories, _] = await connection.query("SELECT * FROM categories");
  res.send(categories);
});
app.post("/api/complaint", async (req, res) => {
  const user_id = req.body.user_id;
  const category_id = req.body.category_id;
  const title = req.body.title;
  const description = req.body.description;
  const [rows, fields] = await connection.query(
    `INSERT INTO complaints (user_id, category_id, title, description) VALUES ('${user_id}', '${category_id}', '${title}', '${description}')`
  );
  console.log(rows);
  if (rows.affectedRows > 0) {
    res.send({ status: "success", data: rows });
  } else {
    res.send({ status: "failed", data: rows });
  }
});
app.get("/api/:user_id/complaints", async (req, res) => {
  const user_id = req.params.user_id;
  const [rows, fields] = await connection.query(
    `SELECT * FROM complaints WHERE user_id='${user_id}'`
  );
  console.log(rows);
  if (rows.length > 0) {
    res.send({ status: "success", data: rows });
  } else {
    res.send({ status: "failed", data: rows });
  }
});
// });
// app.get("/api/tech_roles", (req, res) => {
//   connection.query("SELECT * FROM roles", (err, results, fields) => {
//     if (err) throw err;
//     console.log(results);
//     res.status(200).send(results);
//   });
// });
// app.post("/api/assign_role", (req, res) => {
//   console.log(req.body);
//   connection.query(
//     `INSERT INTO technician_assignment (rid, uid) VALUES ('${req.body.rid}', '${req.body.uid}')`,
//     (err, results, fields) => {
//       if (err) throw err;
//       console.log(results);
//       res.status(200).send(results);
//     }
//   );
// });

// starting the server
app.listen(3001, () => {
  console.log("listening on port 3001");
});
