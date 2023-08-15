const express = require("express");
const router = express.Router();
const connection = require("../db");

// router.get("/supervisor/available_categories", async (req, res) => {});
// router.post("/supervisor/assign", async (req, res) => {});
// router.postt("/supervisor/technicians/assign", async (req, res) => {});

router.post("/supervisor/get_complaints", async (req, res) => {
  const [complaints, _] = await connection.query(
    `SELECT * FROM complaints WHERE status='pending' AND category_id='${req.body.category_id}'`
  );
  res.send(complaints);
});

router.post("/supervisor/get_technicians", async (req, res) => {
  const [technicians, _] = await connection.query(
    `SELECT * FROM users where user_id IN (SELECT user_id FROM technician_assignments WHERE category_id='${req.body.category_id}')`
  );
  res.send(technicians);
});
router.post("/supervisor/assign_technician", async (req, res) => {
  const [result, _] = await connection.query(
    `UPDATE complaints SET assinged_to='${req.body.user_id}' WHERE complaint_id='${req.body.complaint_id}'`
  );
  const [result2, __] = await connection.query(
    `UPDATE complaints SET status='assigned' WHERE complaint_id='${req.body.complaint_id}'`
  );
  res.send({ status: "success" });
});

module.exports = router;
