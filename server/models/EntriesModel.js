const EntryQueries = {
  createEntryQuery: 'INSERT INTO entries (title, story, user_id) VALUES ($1, $2, $3) RETURNING *',
  getEntriesQuery: '',
};

export default EntryQueries;
