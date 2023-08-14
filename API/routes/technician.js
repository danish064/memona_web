const express = require("express");
const router = express.Router();
const connection = require("../db");

router.post("/technician/assign", async (req, res) => {
  const [perviousAssingment, __] = await connection.query(
    `SELECT * FROM technician_assignments WHERE user_id='${req.body.user_id}'`
  );
  if (perviousAssingment.length > 0) {
    const [result, _] = await connection.query(
      `UPDATE technician_assignments SET category_id='${req.body.category_id}' WHERE user_id='${req.body.user_id}'`
    );
  } else {
    const [result, _] = await connection.query(
      `INSERT INTO technician_assignments (user_id, category_id) VALUES ('${req.body.user_id}', '${req.body.category_id}')`
    );
  }
  res.send({ status: "success" });
});
router.post("/technician/complaints", async (req, res) => {
  const [complaints, _] = await connection.query(
    `SELECT * FROM complaints WHERE assinged_to='${req.body.user_id}'`
  );
  res.send(complaints);
});
router.post("/technician/complaints/response", async (req, res) => {
  console.log("Technician Complaints Response");
  const [result, _] = await connection.query(
    `UPDATE complaints SET response='${req.body.response}' WHERE complaint_id='${req.body.complaint_id}'`
  );
  console.log("Result: ", result);
  res.send({ status: "success" });
});

router.post("/technician/complaints/mark_complete", async (req, res) => {
  console.log("Technician Complaints Mark Complete");
  const [result, _] = await connection.query(
    `UPDATE complaints SET status='completed' WHERE complaint_id='${req.body.complaint_id}'`
  );
  console.log("Result: ", result);
  res.send({ status: "success" });
});

module.exports = router;
