const mongoose = require("mongoose");// mongoose e uma bliblioteca require que puxa ela donode_modulos

const connectToDb = () => {
  mongoose
    .connect(
      "mongodb+srv://root:admin@cluster0.cql2zwv.mongodb.net/?retryWrites=true&w=majority",//string de conexao
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,//evitar o erro de conexão
        
      }
    )
    .then(() => console.log("MongoDB Atlas CONECTADO!"))
    .catch((err) => console.log(err));
};

module.exports = connectToDb;
