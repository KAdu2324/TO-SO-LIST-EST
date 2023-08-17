//rotas que esta sendo inportado para TaskController
const routes = require("express").Router();
const TaskController = require("../controller/TaskController");

routes.get("/", TaskController.getAllTasks);//get pode inserir nome da rota e o metodo onde fazemos a importação
routes.post("/create", TaskController.createTask);
routes.get("/getById/:id/:method", TaskController.getById);
routes.post("/updateOne/:id", TaskController.updateOneTask);
routes.get("/deleteOne/:id", TaskController.deleteOneTask);
routes.get("/check/:id", TaskController.taskCheck);

module.exports = routes //aqui so exporta a rota que vem la do TaskController