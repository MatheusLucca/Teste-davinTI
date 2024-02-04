const routerContato = require('./contatoRoute');
module.exports = (app) => {
    app.use(routerContato);
};