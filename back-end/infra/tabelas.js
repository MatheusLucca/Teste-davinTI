class Tabelas{
    init(conexao){
        this.conexao = conexao;
        this.criarTabelaContatos();
        this.criarTabelaTelefones();
    }

    criarTabelaContatos(){
        const sql = `
        CREATE TABLE IF NOT EXISTS Contatos (
            ID BIGINT PRIMARY KEY AUTO_INCREMENT,
            NOME VARCHAR(100) NOT NULL,
            IDADE SMALLINT NOT NULL
          );`;
        this.conexao.query(sql, (erro) => {
            if(erro){
                console.log(erro);
                return;
            } 
        });
    }
    criarTabelaTelefones(){
        const sql = `
        CREATE TABLE IF NOT EXISTS Telefones (
            IDCONTATO BIGINT NOT NULL,
            ID BIGINT PRIMARY KEY AUTO_INCREMENT,
            NUMERO VARCHAR(16) NOT NULL,
            FOREIGN KEY (IDCONTATO) REFERENCES Contatos(ID)
          );`;
        this.conexao.query(sql, (erro) => {
            if(erro){
                console.log(erro);
                return;
            } 
        });
    }
}

module.exports = new Tabelas();