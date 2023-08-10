const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "jinnahdb",
//   waitForConnections: true,
//   connectionLimit: 10, // Adjust as needed
//   queueLimit: 0,
// });
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jinnahdb",
});
// module.exports = pool.promise(); // Export the promise-based pool
module.exports = connection.promise(); // Export the promise-based pool
