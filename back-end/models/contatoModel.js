const conexao = require('../infra/conexao');
const fs = require('fs').promises;

class ContatoModel {

    executaQuery(sql, parametros = '') {
        return new Promise((resolve, reject) => {
            conexao.query(sql, parametros, (erro, resultado) => {
                if (erro) {
                    reject(erro);
                }
                resolve(resultado);
            });
        })
    }

    get() {
        const sql = `SELECT contatos.id, contatos.nome, contatos.idade, GROUP_CONCAT(telefones.numero SEPARATOR ', ') AS telefones
            FROM contatos LEFT JOIN telefones ON contatos.id = telefones.idcontato GROUP BY contatos.id`;
        return this.executaQuery(sql);
    }

    getById(id) {
        const sql = `SELECT contatos.id, contatos.nome, contatos.idade, GROUP_CONCAT(telefones.numero SEPARATOR ', ') AS telefones
            FROM contatos LEFT JOIN telefones ON contatos.id = telefones.idcontato WHERE contatos.id = ? GROUP BY contatos.id`;
        return this.executaQuery(sql, id);
    }

    getByField(field, value) {
        const sql = `SELECT contatos.id, contatos.nome, contatos.idade, GROUP_CONCAT(telefones.numero SEPARATOR ', ') AS telefones
            FROM contatos LEFT JOIN telefones ON contatos.id = telefones.idcontato WHERE ${field} LIKE ? GROUP BY contatos.id`;
        return this.executaQuery(sql, `%${value}%`);
    }


    post(contato, telefones) {
        const sql = 'INSERT INTO contatos SET ?';
        const resultado = this.executaQuery(sql, contato);
        return resultado.then((resultado) => {
            const idInserido = resultado.insertId;
            const sql = 'INSERT INTO telefones (idContato, numero) VALUES ?';
            const valores = telefones.map(telefone => [idInserido, telefone.NUMERO]);
            return this.executaQuery(sql, [valores]);
        });
    }

    put(contato, id, telefones) {
        const sql = 'UPDATE contatos SET ? WHERE id = ?';
        const sqlExcluiTelefones = 'DELETE FROM telefones WHERE idContato = ? AND numero not in (?)';
        this.executaQuery(sqlExcluiTelefones, [id, telefones.map(telefone => telefone.NUMERO)]);
        for (const element of telefones) {
            const sqlCheckTelefone = 'SELECT id FROM telefones WHERE idContato = ? AND numero = ?';
            const sqlInsertTelefone = 'INSERT INTO telefones (idContato, numero) VALUES (?, ?)';
            this.executaQuery(sqlCheckTelefone, [id, element.NUMERO])
                .then((resultado) => {
                    if (resultado.length === 0) {
                        return this.executaQuery(sqlInsertTelefone, [id, element.NUMERO]);
                    }
                })
                .catch((error) => {
                    throw error;
                });
        }

        return this.executaQuery(sql, [contato, id]);
    }
    
    delete(id) {
        const sqlContatos = 'DELETE FROM contatos WHERE id = ?';
        const sqlTelefones = 'DELETE FROM telefones WHERE idContato = ?';
      
        let informacoesContato;
      
        return this.executaQuery('SELECT * FROM contatos WHERE id = ?', id)
          .then((resultado) => {
            informacoesContato = resultado[0];
            return this.executaQuery(sqlTelefones, id);
          })
          .then(() => {
            return this.executaQuery(sqlContatos, id);
          })
          .then((resultadoContatos) => {
            if (resultadoContatos.affectedRows === 0) {
              return this.escreverLog(`Tentativa de excluir contato com ID ${id}, mas nenhum contato foi encontrado.`)
                .then(() => 'Nenhum contato com id: ' + id + ' encontrado.');
            }
            return this.escreverLog(`Contato excluído com sucesso. Informações: ${JSON.stringify(informacoesContato)}`)
              .then(() => 'Contato excluído com sucesso.');
          })
          .catch((error) => {
            return this.escreverLog(`Erro ao excluir contato com id: ${id}.` + error.message)
              .then(() => `Erro ao excluir contato com id: ${id}.` + error.message);
          });
      }

    escreverLog(mensagem) {
        const dataAtual = new Date();

        const dataFormatada = this.formatarData(dataAtual);
      
        const logMessage = `${dataFormatada} - ${mensagem}\n`;

        fs.mkdir('./logs', { recursive: true })
            .catch((error) => {
                throw error;
            });
            
        const caminhoArquivoLog = './logs/exclusoes.log';

        return fs.appendFile(caminhoArquivoLog, logMessage, 'utf-8')
            .catch((error) => {
                throw error;
            });
    }

    formatarData(data) {
        const dia = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
        const mes = data.getMonth() + 1 < 10 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1; 
        const ano = data.getFullYear();
        const horas = data.getHours() < 10 ? '0' + data.getHours() : data.getHours();
        const minutos = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes();
        const segundos = data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds();
    
        return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
    }

}

module.exports = new ContatoModel();