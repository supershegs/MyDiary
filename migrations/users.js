const users = `CREATE TABLE IF NOT EXISTS users(
id uuid PRIMARY KEY,
name TEXT NOT NULL,
username VARCHAR(40) UNIQUE NOT NULL,
password TEXT NOT NULL)`;

export default users;
