const app = require('./config/server');
const routes = require('./app/routes/routes');
const usersRoutes = require('./app/routes/usersRoutes');

usersRoutes.authUser(app);
usersRoutes.authUserForm(app);
routes.home(app);
routes.addConvidado(app);
routes.inserirConvidado(app);
routes.getListaConvidados(app); 
routes.getConvidado(app);