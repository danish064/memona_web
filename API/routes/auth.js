const express = require("express");
const router = express.Router();
const connection = require("../db");
// Define your route(s) here

// const getTechnicianStatus = async (uid) => {
//   const results = await connection.query(
//     `SELECT * FROM technician_assignment WHERE uid='${uid}'`
//   );
//   return results[0].length > 0;
// };
const getTechnicianStatus = async (user_id) => {
  const [rows, fields] = await connection.query(
    `SELECT * FROM technician_assignments WHERE user_id='${user_id}'`
  );
  // return rows.length > 0;
  if (rows.length > 0) {
    return rows[0].category_id;
  } else {
    return null;
  }
};
router.get("/auth_test", (req, res) => {
  res.send("Auth Test");
});
router.post("/login", async (req, res) => {
  console.log(req.body);
  const [rows, fields] = await connection.query(
    `SELECT * FROM users WHERE email='${req.body.email}' AND user_type='${req.body.user_type}'`
  );
  const results = rows;
  if (results.length > 0) {
    if (results[0].password == req.body.password) {
      let response = {
        status: "success",
        data: {
          ...results[0],
          category_id: await getTechnicianStatus(results[0].user_id),
        },
      };
      response = JSON.stringify(response);
      res.status(200).send(response);
    } else {
      res.status(200).send({ status: "failed", data: "Invalid Password" });
    }
  } else {
    res.status(200).send({
      status: "failed",
      data: "Invalid Email, User doesn't exit.. please sign up",
    });
  }
});
router.post("/signup", async (req, res) => {
  //   console.log(req.body);
  const [results, _] = await connection.query(
    `SELECT * FROM users WHERE email='${req.body.email}' AND user_type='${req.body.user_type}'`
  );
  //   console.log(results);
  if (results.length > 0) {
    res.status(200).send({ status: "failed", data: "Email Already Exist" });
  } else {
    const [newUserDetails, _] = await connection.query(
      `INSERT INTO users (username, email, password, user_type) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.password}', '${req.body.user_type}')`
    );
    res.send({ status: "success", data: "New user created sucessfully" });
  }
});
module.exports = router;
