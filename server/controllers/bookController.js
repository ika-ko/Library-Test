const { NotFoundError } = require("../errors/NotFoundError");
const { ValidationError } = require("../errors/ValidationError");
const {books,authors,getNextBookId} = require('../db');
async function getAllBooks(req,res){
    let result = books;
    const {releasedAfter} = req.query;
    if(releasedAfter){
        result = result.filter(a=>a.publishedYear > Number(releasedAfter));
    }
    res.json(result);
}
async function getBookById(req,res){
    const id = req.parsedId;
    const book = books.find(a=>a.id===id);
    if(!book){
        throw new NotFoundError(`Book with id ${id} not found`);
    }
    res.json(book);
}
async function createBook(req,res){
    const {title,genre,authorId,publishedYear}= req.body;
    const authorExists = authors.find(a=>a.id===authorId);
    if(!authorExists){
        throw new ValidationError(`Author with id ${authorId} not found`);
    }
    const book = {
        title : title,
        genre : genre,
        publishedYear:publishedYear,
        id : getNextBookId(),
        authorId : authorId,
    }
    books.push(book);
    res.status(201).json(book);
}
async function updateBook(req,res){
    const {title,genre,authorId,publishedYear}= req.body;
    const id = req.parsedId;
    const book = books.find(a=>a.id === id);
    if(!book){
        throw new NotFoundError(`Book with ID ${id} not found`);
    }
    const author = authors.find(a => a.id === authorId);  
    if (!author) throw new ValidationError(`No author exists with ID ${authorId}`);
    book.title = title;
    book.genre = genre;
    book.authorId = authorId;
    book.publishedYear = publishedYear;
    res.json(book);
}
async function deleteBook(req,res){
    const id = req.parsedId;
    const bookIndex = books.findIndex(a => a.id ===id);
    if(bookIndex===-1){
        throw new NotFoundError(`Book with ID ${id} not found`);
    }
    books.splice(bookIndex,1);
    res.status(204).end();
}

module.exports = {getAllBooks,getBookById,updateBook,deleteBook,createBook};