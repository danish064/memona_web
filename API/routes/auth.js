const express = require("express");
const router = express.Router();
const connection = require("../db");

const getTechnicianCategory = async (user_id) => {
  const [rows, fields] = await connection.query(
    `SELECT * FROM technician_assignments WHERE user_id='${user_id}'`
  );
  if (rows.length > 0) {
    return rows[0].category_id;
  } else {
    return null;
  }
};
const getSupervisorcategory = async (user_id) => {
  const [rows, fields] = await connection.query(
    `SELECT * FROM supervisors WHERE user_id='${user_id}'`
  );
  if (rows.length > 0) {
    return rows[0].category_id;
  } else {
    return null;
  }
};
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
        },
      };
      if (results[0].user_type == "technician") {
        response.data.category_id = await getTechnicianCategory(
          results[0].user_id
        );
      } else if (results[0].user_type == "supervisor") {
        response.data.category_id = await getSupervisorcategory(
          results[0].user_id
        );
      }
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
  const [results, _] = await connection.query(
    `SELECT * FROM users WHERE email='${req.body.email}' AND user_type='${req.body.user_type}'`
  );
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
