// server/populatedb.js
require("dotenv").config();
const { Pool } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  born_year INTEGER
);

CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100),
  published_year INTEGER,
  author_id INTEGER REFERENCES authors(id) ON DELETE CASCADE
);

INSERT INTO authors (name, bio, born_year) VALUES
  ('J.R.R. Tolkien', 'English writer, poet, and academic.', 1892),
  ('George R.R. Martin', 'American novelist and screenwriter.', 1948),
  ('Agatha Christie', 'English writer known for detective novels.', 1890),
  ('Frank Herbert', 'American science fiction author.', 1920);

INSERT INTO books (title, genre, published_year, author_id) VALUES
  ('The Hobbit', 'Fantasy', 1937, 1),
  ('The Fellowship of the Ring', 'Fantasy', 1954, 1),
  ('A Game of Thrones', 'Fantasy', 1996, 2),
  ('A Clash of Kings', 'Fantasy', 1998, 2),
  ('And Then There Were None', 'Mystery', 1939, 3),
  ('Murder on the Orient Express', 'Mystery', 1934, 3),
  ('Dune', 'Sci-Fi', 1965, 4);
`;

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  await pool.query(SQL);
  await pool.end();
  console.log("done");
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exitCode = 1;
});