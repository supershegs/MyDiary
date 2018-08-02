const entries = `CREATE TABLE IF NOT EXISTS entries
( id SERIAL PRIMARY KEY, 
title TEXT NOT NULL, story TEXT NOT NULL,user_id uuid,
createdDate timestamp (0) without time zone default now(), 
modified timestamp (0) without time zone default now() , 
FOREIGN KEY (user_id) references users(id))`;
export default entries;
