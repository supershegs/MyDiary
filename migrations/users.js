const users = `CREATE TABLE IF NOT EXISTS users(
id uuid PRIMARY KEY,
name TEXT,
username VARCHAR(40) UNIQUE,
password TEXT)`;

export default users;
