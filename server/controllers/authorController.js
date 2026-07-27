const {authors, getNextAuthorId,books} = require('../db');
const {NotFoundError} = require('../errors/NotFoundError') 

async function getAllAuthors(req,res){
    let result = authors;
    const {bornAfter} = req.query;
    if(bornAfter){
        result = result.filter(a=>a.bornYear> Number(bornAfter));
    }
    res.json(result);
}


async function getAuthorById(req,res){
    const id = req.parsedId;
    const author = authors.find(a=>a.id===id);

    if(!author){
        throw new NotFoundError(`Author with ID ${id} not found`);
    }
    res.json(author);
}
async function createAuthor(req,res){
    const {name,bio,bornYear} = req.body;
    const newAuthor = {
        id : getNextAuthorId(),
        name: name,
        bio: bio,
        bornYear : bornYear
    }
    authors.push(newAuthor);
    res.status(201).json(newAuthor);

}
async function deleteAuthor(req,res){

    const id = req.parsedId;
    const index = authors.findIndex(a => a.id === id);
    if(index===-1){
        throw new NotFoundError(`author with ${id} not found`)
    }
    authors.splice(index,1);
    res.status(204).end();

}
async function updateAuthor(req,res){
    const id = req.parsedId;
    const author = authors.find(a=>a.id === id);
    if(!author){
        throw new NotFoundError(`Author with ID : ${id} not found`);
    }
    const {name,bio,bornYear} = req.body;
    author.name = name;
    author.bio = bio;
    author.bornYear = bornYear;
    res.json(author);
}
async function getAuthorBooks(req,res){
    const id = req.parsedId;
    const author = authors.find(a => a.id ===id);
    if(!author) throw new NotFoundError(`Author with ID:${id} not found`);
    const authorBooks = books.filter(b => b.authorId===id);
    res.json(authorBooks);
}
module.exports = {getAuthorById,getAuthorBooks,getAllAuthors,createAuthor,deleteAuthor,updateAuthor};