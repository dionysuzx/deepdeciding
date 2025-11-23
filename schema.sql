-- Create a simple counter table
DROP TABLE IF EXISTS counter;
CREATE TABLE IF NOT EXISTS counter (
  id INTEGER PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0
);

-- Initialize with a single counter row
INSERT INTO counter (id, count) VALUES (1, 0);
