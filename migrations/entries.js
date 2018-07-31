const entries = `CREATE TABLE IF NOT EXISTS entries(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  story TEXT NOT NULL,
  created date (0) without time zone default now(),
  modified timestamp (0) without time zone default now(),
  )`;
export default entries;
