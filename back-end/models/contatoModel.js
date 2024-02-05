const conexao = require('../infra/conexao');

class ContatoModel{

    executaQuery(sql, parametros = ''){
        return new Promise((resolve, reject) => {
            conexao.query(sql,parametros,  (erro, resultado) => {
                if(erro){
                    reject(erro);
                }
                resolve(resultado);
            });
        }) 
    }
    get(){
        const sql = 'SELECT * FROM contatos';
        return this.executaQuery(sql);
    }

    post(contato){
        const sql = 'INSERT INTO contatos SET ?';
        return this.executaQuery(sql, contato);
    }

    put(contato, id){
        const sql = 'UPDATE contatos SET ? WHERE id = ?';
        return this.executaQuery(sql, [contato, id]);  
    }

    delete(id){
        const sql = 'DELETE FROM contatos WHERE id = ?';
        return this.executaQuery(sql, id);
    }
    

}

module.exports = new ContatoModel();