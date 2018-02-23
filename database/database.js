const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME || 'webster.cejo6xnl1nmu.us-east-1.rds.amazonaws.com',
  user: process.env.RDS_USERNAME || 'teamwebster',
  password: process.env.RDS_PASSWORD || '2hard2know',
  port: process.env.RDS_PORT || 3306,
  database: process.env.RDS_DB_NAME || 'webster'
});

connection.connect((error) => {
  if (error) {
    console.log('Error connecting to mySQL', error);
  }
  console.log('Succesfully Connected to mySQL DB');
});

const users = `CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(2000) NOT NULL,
  email VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT UC_users UNIQUE (username, email)
)`;

const favorites = `CREATE TABLE IF NOT EXISTS favorites (
  id INT NOT NULL AUTO_INCREMENT,
  drinks VARCHAR(5000) NOT NULL,
  music VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT UC_favorites PRIMARY KEY (id, music, user_id)
)`;

connection.query(users, (error) => {
  if (error) {
    console.log('There was an error creating table:', error);
  }
})

connection.query(favorites, (error) => {
  if (error) {
    console.log('There was an error creating table:', error);
  }
})

module.exports = connection;
