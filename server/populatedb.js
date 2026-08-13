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

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(55) UNIQUE NOT NULL,
  password VARCHAR(256) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

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