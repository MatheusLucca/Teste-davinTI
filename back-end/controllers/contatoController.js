const contatoModel = require('../models/contatoModel');

class ContatoController{
    get(req,res){
        const listaContatos = contatoModel.get();
        return listaContatos.then(contatos => res.status(200).json(contatos)).
            catch(err => res.status(500).json(err.message));
    }
    post(req, res){
        const novoContato = req.body.CONTATO;
        const telefones = req.body.TELEFONES;
        const contato = contatoModel.post(novoContato, telefones);
        return contato.then(contatoCriado => res.status(201).json(contatoCriado)).
            catch(err => res.status(500).json(err.message));
    }
    put(req, res){
        const {id} = req.params;
        const contatoAtualizado = req.body.CONTATO;
        const telefones = req.body.TELEFONES;
        const contato = contatoModel.put(contatoAtualizado, id, telefones);
        return contato.then(contatoAtualizado => res.status(200).json(contatoAtualizado)).
            catch(err => res.status(500).json(err.message));
    }
    delete(req, res){
        const {id} = req.params;
        const retorno = contatoModel.delete(id);
        return retorno.then((resultado) => res.status(200).json(resultado)).    
            catch(err => res.status(500).json(err.message));
    }
}

module.exports = new ContatoController();