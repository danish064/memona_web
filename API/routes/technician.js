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
  //   console.log(result);
  res.send({ status: "success" });
});

module.exports = router;
