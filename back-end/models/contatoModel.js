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
        const sql = `SELECT contatos.id, contatos.nome, contatos.idade, GROUP_CONCAT(telefones.numero) AS numeros_telefone
            FROM contatos LEFT JOIN telefones ON contatos.id = telefones.idcontato GROUP BY contatos.id`;
        return this.executaQuery(sql);
    }


    post(contato, telefones){
        const sql = 'INSERT INTO contatos SET ?';
        const resultado = this.executaQuery(sql, contato);
        return resultado.then((resultado) => {
            const idInserido = resultado.insertId;
            const sql = 'INSERT INTO telefones (idContato, numero) VALUES ?';
            const valores = telefones.map(telefone => [idInserido, telefone.NUMERO]);
            return this.executaQuery(sql, [valores]);
          });
    }   

    put(contato, id, telefones){
        const sql = 'UPDATE contatos SET ? WHERE id = ?';     
        const idTelefones = []
        for (let i = 0; i < telefones.length; i++) {
            const sql = 'UPDATE telefones SET ? WHERE idContato = ? and id = ?';

            this.executaQuery(sql, [telefones[i], id, telefones[i].ID]);
            idTelefones.push(telefones[i].ID);
        }
        const sqltelefones = 'DELETE FROM telefones WHERE idContato = ? and id not in (?)';
        this.executaQuery(sqltelefones, [id, idTelefones]);
        return this.executaQuery(sql, [contato, id]);
    }

    delete(id){
        const sql = 'DELETE FROM contatos WHERE id = ?';
        const sqltelefones = 'DELETE FROM telefones WHERE idContato = ?';
        this.executaQuery(sqltelefones, id);
        return this.executaQuery(sql, id);
    }
    

}

module.exports = new ContatoModel();