const { NotFoundError } = require("../errors/NotFoundError");
const { ValidationError } = require("../errors/ValidationError");
const db = require('../db');
async function getAllBooks(req,res){
    let result = await db.getAllBooks();
    const {releasedAfter} = req.query;
    if(releasedAfter){
        result = result.filter(a=>a.publishedYear > Number(releasedAfter));
    }
    res.json(result);
}
async function getBookById(req,res){
    const id = req.parsedId;
    const book = await db.getBookById(id);
    if(!book){
        throw new NotFoundError(`Book with id ${id} not found`);
    }
    res.json(book);
}
async function createBook(req,res){
    const {title,genre,authorId,publishedYear}= req.body;
    const authorExists = await db.getAuthorById(authorId)
    if(!authorExists){
        throw new ValidationError(`Author with id ${authorId} not found`);
    }
    const book = await db.createBook({title,genre,authorId,publishedYear});
    res.status(201).json(book);
}
async function updateBook(req,res){
    const {title,genre,authorId,publishedYear}= req.body;
    const id = req.parsedId;
    const author = await db.getAuthorById(authorId);  
    if (!author) throw new ValidationError(`No author exists with ID ${authorId}`);
    const book = await db.updateBook(id,{title,genre,authorId,publishedYear});
    if(!book){
        throw new NotFoundError(`Book with ID ${id} not found`);
    }
    res.json(book);
}
async function deleteBook(req,res){
    const id = req.parsedId;
    const book = await db.deleteBook(id);
    if(!book){
        throw new NotFoundError(`Book with id:${id} not found`)
    }
    res.status(204).end();
}

module.exports = {getAllBooks,getBookById,updateBook,deleteBook,createBook};