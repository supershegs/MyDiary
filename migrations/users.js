const users = `CREATE TABLE users(
id SERIAL PRIMARY KEY not null,
name TEXT,
username VARCHAR(40),
password TEXT)`;

export default users;
