const express = require('express');
const account = require("./account");
const cors = require("cors");
const data = require("./data");

const app = express();
const mongo = new account.Account();
const port = 8000;
const redis = new data.Data();

app.use(cors());
app.use(express.json());

app.post('/register',async function(req,res) {

    var login = req.body.login;
    var password = req.body.password;

    if(!password||!login){
        res.status(400).json(JSON.stringify("Data not valid"));
        return;
    }

    mongo.register(login,password).then((returnCode) => {

        if(returnCode==-1){
            res.status(400).json(JSON.stringify("Account already exists"));
        }else if(returnCode==-2){
            res.status(500).json(JSON.stringify("Server error"));
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
        return;
    }

    mongo.login(login,password).then((token) => {

        if(token==-1){
            res.status(400).json(JSON.stringify("Account does not exists"));
        }else{
            res.status(200).json({
                token: token
            });
        }

    }).catch( error => {

        res.status(500).json(JSON.stringify("Server error"));

    });


})

app.post("/auth",function(req,res){

    var token = req.body.token;
    if(!token){
        res.status(200).json({auth:false});
        return;
    }

    mongo.auth(token).then( answer => {

        res.status(200).json({auth:answer});

    }).catch( error => {

        res.status(500).json(JSON.stringify("Server error"));

    })

})

app.get("/post",async function(req,res){

    var data = await redis.getAllPost();

    res.status(200).json(data);

})

app.post("/post",function(req,res){

    var token = req.headers.token;
    var text = req.body.message;

    if(!token||!text){
        res.status(400).json(JSON.stringify("Data not valid"));
        return;
    }

    mongo.auth(token).then( (answer) => {

        if(answer){

            var message = {

                name : answer.name,
                text : text

            }
            
            redis.addPost(message);
            res.status(201).json(JSON.stringify("Post added"));

        }else{

            res.status(403).json(JSON.stringify("Unauthorized"));

        }

    }).catch( error => {

        res.status(500).json(JSON.stringify("Server error"));

    });

})

app.listen(port,() => {

    console.log(`listening on port ${port}`);

});