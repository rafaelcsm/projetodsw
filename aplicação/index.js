const app = require('./config/server');
const routes = require('./app/routes/routes');
const usersRoutes = require('./app/routes/usersRoutes');
const { route } = require('./config/server');

usersRoutes.authUser(app);

routes.addConvidado(app);
routes.editarConvidado(app);
routes.getListaConvidados(app); 
routes.getConvidado(app);
routes.removerConvidado(app);
routes.alterarStatusConvidado(app);
routes.removerTodosOsConvidados(app);



module.exports = app;