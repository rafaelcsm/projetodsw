const app = require('./config/server');
const routes = require('./app/routes/routes');
const usersRoutes = require('./app/routes/usersRoutes');

usersRoutes.authUser(app);
usersRoutes.authUserForm(app);
routes.home(app);
routes.addFoto(app);
routes.inserirFoto(app);
routes.getListaConvidados(app);