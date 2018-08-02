const notify = `CREATE TABLE IF NOT EXISTS notification
  (id uuid PRIMARY KEY NOT NULL, user_id uuid NOT NULL, 
  value BOOLEAN DEFAULT false , FOREIGN KEY (user_id) references "users" (id))`;

export default notify;
