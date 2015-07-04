//En las nuevas versiones de Sequelize el interfaz ha cambiado para usar "Promesas".
//A grandes rasgos hay que cambiar .success por .then, .error por .catch y .done por .finally.
var path = require('path');

// Cargar modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
                                {dialect: "sqlite", storage: "quiz.sqlite"}
                              );

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; // exportar definición de tabla Quiz

// sequelize.sync() crea e inicializa tabla de preguntas en BD
sequelize.sync().then(function(){
  // success(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function (count){
    if(count===0){
      Quiz.create({ pregunta: 'Capital de Italia',
                    respuesta: 'Roma'
                  }).then(function(){console.log('Base de datos inicializada')});
    };
  });
});