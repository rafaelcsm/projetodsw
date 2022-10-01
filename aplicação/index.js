const app = require('./config/server');
const routes = require('./app/routes/routes');

routes.home(app);
routes.addFoto(app);
routes.inserirFoto(app);