//index.js e meu servido aqui tenhos minhas path responsalvel por direcionar minhas pastas tudo que for criado sera direcionado por aqui onde e minhas rotas

const express = require("express");
const path = require("path");
const routes = require("./routes/routes");
const connectToDb = require("./database/db");// caminho do banco

//rota caminho da conexão com meu banco 
connectToDb();
const app = express();
const port = 27017; //conexão com a porta localhost:27017

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));// aqui esta nossos arquivos staticus
app.use(express.urlencoded());
app.use(routes);

app.listen(port, () =>
  console.log(` Servidor rodando em http://localhost:${port}`)// mensagem no guit bash onde ira mostra que esta funcionando 
);
