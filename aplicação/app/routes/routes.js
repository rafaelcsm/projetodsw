const ConvidadosController = require('../controllers/listaConvidados');

module.exports = {
    
    getListaConvidados: (app) =>{
        app.get('/api/listaDeConvidados', ConvidadosController.getTodosConvidadosController);
    },
    getConvidado: (app) =>{
        app.get('/api/listaDeConvidados/:id', ConvidadosController.getConvidadoById);
    },
    addConvidado: (app) =>{
        app.post('/api/listaDeConvidados', ConvidadosController.addConvidado);
    },
    removerConvidado: (app) =>{
        app.delete('/api/listaDeConvidados/:id',ConvidadosController.removerConvidado);
    },
    editarConvidado: (app) =>{
        app.put('/api/listaDeConvidados/:id', ConvidadosController.editarConvidado);
    },
    alterarStatusConvidado: (app) =>{
        app.patch('/api/listaDeConvidados/:id', ConvidadosController.alterarStatusConvidado);
    },
    removerTodosOsConvidados: (app) =>{
        app.delete('/api/listaDeConvidados', ConvidadosController.removerTodosOsConvidados);
    }
};

