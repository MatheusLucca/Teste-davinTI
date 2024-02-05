const contatoModel = require('../models/contatoModel');

class ContatoController{
    get(req,res){
        const listaContatos = contatoModel.get();
        return listaContatos.then(contatos => res.status(200).json(contatos)).
            catch(err => res.status(500).json(err.message));
    }
    post(req, res){
        const novoContato = req.body;
        const contato = contatoModel.post(novoContato);
        return contato.then(contatoCriado => res.status(201).json(contatoCriado)).
            catch(err => res.status(500).json(err.message));
    }
    put(req, res){
        const {id} = req.params;
        const contatoAtualizado = req.body;
        const contato = contatoModel.put(contatoAtualizado, id);
        return contato.then(contatoAtualizado => res.status(200).json(contatoAtualizado)).
            catch(err => res.status(500).json(err.message));
    }
    delete(req, res){
        const {id} = req.params;
        const contato = contatoModel.delete(id);
        return contato.then(contatoDeletado => res.status(200).json(contatoDeletado)).
            catch(err => res.status(500).json(err.message));
    }
}

module.exports = new ContatoController();