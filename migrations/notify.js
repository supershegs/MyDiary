const notify = `CREATE TABLE IF NOT EXISTS notification(
  id SERIAL PRIMARY KEY, value BOOLEAN DEFAULT false,);`;

export default notify;
