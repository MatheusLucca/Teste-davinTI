const {Router} = require('express');
const router = Router();

router.get('/contatos', (req, res) => {
    res.send('Contato');
});

router.post('/contatos', (req, res) => {
    res.send('Post');
});

router.put('/contato/:id', (req, res) => {
    const {id} = req.params;
    res.send(`put ${id}`);
});

router.delete('/contato/:id', (req, res) => {
    const {id} = req.params;
    res.send(`delete ${id}`);
});

module.exports = router;