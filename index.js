/* cd desktop
cd 401-node.js
cd churros
git init
git config user.name "Priscila Andreani"
git config user.email "priscilaandreani@gmail.com"
npm init >>> enter >>> yes
npm  install express  
npm install express-mongo-db   ((no package-lock.json aparece as bibliotecas que foram instaladas))

POSTMAN ((teste de API))
post >> raw >>
{
    "sabor": [chocolate, morango],          //array
    "recheio": "chocolate"                  //objeto
}

robo3t >> ler os dados inseridos nos dados
*/

const express = require('express');  //importa de biblioteca
const expressMongoDb = require('express-mongo-db'); 
const bodyParser = require('body-parser');
const ObjetctID = require('mongodb').ObjetctID; //

const app = express();

app.use(expressMongoDb('mongodb://localhost/churros'));  //mondodb://localhost/nomeDoBanco
app.use(bodyParser.json());

app.get('/', (req, res) => {
    req.db.collection('sabores').find().toArray((err, data) => {
        if(err){  //tratamento de erros
            res.status(500).send('Erro ao acessar banco de dados com SET');
            return;
        }
        res.send(data);
    });
});

app.post('/', (req, res) => {
    req.db.collection('sabores').insert(req.body, (err) => {
        if(err){    //tratamento de erros
            res.status(500).send('Erro ao acessar o banco com o GET')
            return
        }
        console.log(err);
        res.send('Deu certo!');  //resposta 
    });
});

app.get('/churros:id', (req, res) => {
    let query = {
        _id: req.params.id
    };
    req.db.collection('sabores').findOne(query), ((err, data) => {
        if(err){  //tratamento de erros
            res.status(500).send('Erro ao acessar banco de dados com SET');
            return;
        }

        if (!data) {
            res.status(404).send;
            return;
        }
        res.send(data);
    });
});

app.listen(3000);