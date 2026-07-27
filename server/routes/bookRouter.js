const {Router} = require('express');
const bookController = require('../controllers/bookController');
const validateBookInputs = require('../middleware/validateBookInputs');
const validateId = require('../middleware/validateId');

const bookRouter = Router();

bookRouter.get('/',bookController.getAllBooks);
bookRouter.get('/:id',validateId,bookController.getBookById);
bookRouter.post('/',validateBookInputs,bookController.createBook);
bookRouter.delete('/:id',validateId,bookController.deleteBook);
bookRouter.put('/:id',validateId,validateBookInputs, bookController.updateBook);

module.exports = bookRouter;