const { set } = require("mongoose");
const Task = require("../model/Task");

//quando nao preencher os dados no front aparecer a mensagem de alert
let message = ""; 
let type = "";


//motivo de usar Async e comunicaçao com o banco de pergunta e resposta
//getAll umas das forma de criar uma função 
const getAllTasks = async (req, res) => {
  try {
    setTimeout(() => {
      message = "";
    }, 1000);// aqui criei um deley ao clicar de um segundo 

    //aqui criaçao do dados para preencher no front os dados

    const tasksList = await Task.find();
    return res.render("index", { // abaixo sao os metodos que esta separado da rota 
      tasksList,
      task: null,
      taskDelete: null,
      message,
      type,
    });
    //se não preencher ficar como null, aparecer a messangem de erro 
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const createTask = async (req, res) => {
  const task = req.body;

  if (!task.task) {
    message = "Insira um texto, antes de adicionar a tarefa!";
    type = "danger";
    return res.redirect("/");
  }

  try {
    await Task.create(task);
    message = "Tarefa criada com sucesso!";
    type = "sucess";
    return res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
//criando o tabela no banco com dados inserido na tela
const getById = async (req, res) => {
  try {
    const tasksList = await Task.find();
    if (req.params.method == "update") {
      const task = await Task.findOne({ _id: req.params.id });
      res.render("index", { task, taskDelete: null, tasksList, message, type });
    } else {
      const taskDelete = await Task.findOne({ _id: req.params.id });
      res.render("index", { task: null, taskDelete, tasksList, message, type });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
// updateOneTask onde realiza alteração do texto e modificação ja altera no banco tambem
const updateOneTask = async (req, res) => {
  try {
    const task = req.body;
    await Task.updateOne({ _id: req.params.id }, task);
    message = "Tarefa Atualizada com sucesso!";
    type = "sucess";
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
// DeleteOneTask caso eu queira exluir algum dados inserido na minha lista
const deleteOneTask = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id });
    message = "Tarefa apagada com sucesso";
    type = "sucess";
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const taskCheck = async (req, res) => {
  try{
    const task = await Task.findOne({ _id: req.params.id});

 // Condicional Ternaria é um operador condicional do Javascript, normalmente utilizado como atalho para o if
    task.check ? task.check = false : task.check = true;
    await Task.updateOne({ _id: req.params.id}, task)
    res.redirect("/");
  }catch (err){
    res.status(500).send({ error: err.message });
  }
}
//aqui estao todos modulos que foram criados, conjuto de codigo separado no arquivos 
module.exports = {
  getAllTasks,
  createTask,
  getById,
  updateOneTask,
  deleteOneTask,
  taskCheck,
};
