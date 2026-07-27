const {Router} = require('express');
const authorController = require('../controllers/authorController');
const validateAuthorInputs = require('../middleware/validateAuthorInputs');
const validateId = require('../middleware/validateId');
const authorRouter = Router();

authorRouter.get('/',authorController.getAllAuthors);
authorRouter.post('/',validateAuthorInputs,authorController.createAuthor);
authorRouter.get('/:id',validateId,authorController.getAuthorById);
authorRouter.delete("/:id",validateId,authorController.deleteAuthor)
authorRouter.put("/:id",validateId,validateAuthorInputs,authorController.updateAuthor)
authorRouter.get("/:id/books",validateId,authorController.getAuthorBooks)

module.exports=authorRouter;