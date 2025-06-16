const mysql = require(`mysql2`);

// keys require

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const port = process.env.DB_PORT;

// connection to db
const connection = mysql.createConnection({
  host: `${host}`,
  user: `${user}`,
  password: `${password}`,
  database: `${database}`,
  port: `${port}`,
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connect to sql`);
});

module.exports = connection;
