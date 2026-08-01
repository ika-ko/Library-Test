const {NotFoundError} = require('../errors/NotFoundError') 
const db = require('../db');
async function getAllAuthors(req,res){
    let result = await db.getAllAuthors();
    const {bornAfter} = req.query;
    if(bornAfter){
        result = result.filter(a=>a.bornYear> Number(bornAfter));
    }
    res.json(result);
}


async function getAuthorById(req,res){
    const id = req.parsedId;
    const author = await db.getAuthorById(id);

    if(!author){
        throw new NotFoundError(`Author with ID ${id} not found`);
    }
    res.json(author);
}
async function createAuthor(req,res){
    const {name,bio,bornYear} = req.body;
    const newAuthor = await db.createAuthor({name,bio,bornYear});
    res.status(201).json(newAuthor);
}
async function deleteAuthor(req,res){
    const id = req.parsedId;
    const success = await db.deleteAuthor(id);
    if(!success){
        throw new NotFoundError(`Author With ID ${id} not found`)
    }
    res.status(204).end();
}
async function updateAuthor(req,res){
    const id = req.parsedId;
    const { name, bio, bornYear } = req.body;
    const author = await db.updateAuthor(id,{name,bio,bornYear});
    if(!author){
        throw new NotFoundError(`Author with ID : ${id} not found`);
    }
    res.json(author);
}
async function getAuthorBooks(req, res) {
  const id = req.parsedId;

  const author = await db.getAuthorById(id);        
  if (!author) throw new NotFoundError(`Author with ID ${id} not found`);
  const authorBooks = await db.getBooksByAuthor(id); 
  res.json(authorBooks);  
}                           
module.exports = {getAuthorById,getAuthorBooks,getAllAuthors,createAuthor,deleteAuthor,updateAuthor};