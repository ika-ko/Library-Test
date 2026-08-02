require("dotenv").config();
const {Pool} = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

// A client can fail while sitting idle in the pool (server restart, network drop). That
// surfaces as an 'error' event with no listener, which takes the whole process down.
pool.on('error', (err) => {
    console.error('Unexpected idle client error', err);
});

async function getAllAuthors(){
    const {rows} = await pool.query(`SELECT id,name,bio,born_year as "bornYear" FROM authors ORDER BY id`);
    return rows;
}
async function getAuthorById(id){
    const {rows} = await pool.query(`SELECT id,name,bio,born_year AS "bornYear" FROM authors WHERE id = $1`, [id]);
    return rows[0];
}
async function createAuthor({name,bio,bornYear}){
    const {rows} = await  pool.query(`
        INSERT INTO authors (name,bio,born_year)
        VALUES ($1,$2,$3) RETURNING id,name,bio,born_year AS "bornYear"`,
    [name,bio,bornYear]);
    return rows[0];
}
async function deleteAuthor(id){
    const {rowCount} = await pool.query("DELETE FROM authors WHERE id = $1",[id]);
    return rowCount>0;
}
async function updateAuthor(id, { name, bio, bornYear }) {
  const { rows } = await pool.query(
    `UPDATE authors SET name = $1, bio = $2, born_year = $3
     WHERE id = $4
     RETURNING id, name, bio, born_year AS "bornYear"`,
    [name, bio, bornYear, id]
  );
  return rows[0];
}
async function getBooksByAuthor(authorId){
    const {rows} =await pool.query(`
            SELECT b.id, b.title, b.genre,
                   b.published_year AS "publishedYear",
                   b.author_id      AS "authorId",
                   a.name           AS "authorName"
            FROM books b
            LEFT JOIN authors a ON b.author_id = a.id
            WHERE b.author_id = $1
            ORDER BY b.id
        `,[authorId]);
    return rows;
}
async function getAllBooks(){
    const {rows} = await pool.query(`SELECT b.id, b.title, b.genre,
        b.published_year AS "publishedYear",
        b.author_id      AS "authorId",
        a.name           AS "authorName"
        FROM books b
        LEFT JOIN authors a ON b.author_id = a.id
        ORDER BY b.id`)
    return rows;
}
async function getBookById(id){
    const {rows} = await pool.query(`SELECT b.id, b.title, b.genre,
        b.published_year AS "publishedYear",
        b.author_id      AS "authorId",
        a.name           AS "authorName"
        FROM books b
        LEFT JOIN authors a ON b.author_id = a.id
        WHERE b.id = $1`,[id]);
    return rows[0];
}
async function createBook({title,genre,authorId,publishedYear}){
    const {rows} = await pool.query(`
        INSERT INTO books(title,genre,author_id,published_year) 
        VALUES ($1,$2,$3,$4)
        RETURNING id, title, genre, author_id AS "authorId", published_year AS "publishedYear"
        `,[title,genre,authorId,publishedYear]);
    return rows[0];
}
async function updateBook(id,{title,genre,authorId,publishedYear}){
    const {rows} = await pool.query(`
        UPDATE books SET title = $1, genre = $2, author_id = $3, published_year = $4
        where id = $5 
        returning id, title,genre,author_id as "authorId", published_year as "publishedYear"
        `,[title,genre,authorId,publishedYear,id]);
    return rows[0];
}
async function deleteBook(id){
    const {rowCount} = await pool.query(`
            delete from books where id = $1
        `,[id]);
    return rowCount>0;
}
module.exports = {getAllBooks,getBookById,updateBook,createBook,deleteBook,updateAuthor,deleteAuthor,getAllAuthors,getAuthorById,getBooksByAuthor,createAuthor}