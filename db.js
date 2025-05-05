const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nissan",  // Cambia esto a tu contrase�a de MySQL
  database: "alfajores_db"
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexi�n a la base de datos:", err.stack);
    return;
  }
  console.log("Conexi�n a la base de datos exitosa.");
});

module.exports = db;
