const express = require('express');
const account = require("./account");
const cors = require("cors");

const app = express();
const mongo = new account.Account();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', async function (req, res) {
    res.send('Hello World');
  })

app.post('/register',async function(req,res) {

    var login = req.body.login;
    var password = req.body.password;

    if(!password||!login){
        res.status(400).json(JSON.stringify("Data not valid"));
    }

    mongo.register(login,password).then((returnCode) => {

        if(returnCode==-1){
            res.status(400).json(JSON.stringify("Account already exists"));
        }

        res.status(201).json(JSON.stringify("Account created"));

    }).catch( error => {

        res.status(500).json(JSON.stringify("Server error"));

    })


})

app.post('/login',async function(req,res) {

    var login = req.body.login;
    var password = req.body.password;

    if(!password||!login){
        res.status(400).json(JSON.stringify("Data not valid"));
    }

    mongo.login(login,password).then((token) => {

        if(token==-1){
            res.status(400).json(JSON.stringify("Account does not exists"));
        }

        res.status(200).json({
            token: token
        });

    }).catch( error => {

        res.status(500).json(JSON.stringify("Server error"));

    });


})

app.post("/auth",function(req,res){

    var token = req.body.token;
    if(!token){
        res.status(400).json(JSON.stringify("Data not valid"));
    }

    mongo.auth(token).then( answer => {

        res.status(200).json({correct:answer});

    }).catch( error => {

        res.status(500).json(JSON.stringify("Server error"));

    })

})

app.listen(port,() => {

    console.log(`listening on port ${port}`);

});