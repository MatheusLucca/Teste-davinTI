const router = require("../routers");
const conexao = require("../infra/conexao");
const tabelas = require("../infra/tabelas");

module.exports = (app, express) => {
  router(app, express);
  tabelas.init(conexao);
};