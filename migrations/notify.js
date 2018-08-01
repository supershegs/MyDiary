const notify = `CREATE TABLE IF NOT EXISTS notification(
  id uuid PRIMARY KEY, 
  value BOOLEAN DEFAULT false)`;

export default notify;
