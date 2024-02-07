const {Router} = require('express');
const router = Router();
const contatoController = require('../controllers/contatoController');

router.get('/contatos', contatoController.get);

router.get('/contato/:id', contatoController.getById);

router.post('/contatos', contatoController.post);

router.put('/contato/:id', contatoController.put);

router.delete('/contato/:id', contatoController.delete);

module.exports = router;