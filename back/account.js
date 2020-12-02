const mongoClient = require('mongodb').MongoClient;
const config = require("./config.json");
const md5 = require('md5');
const jwt = require('jsonwebtoken');

class Account{

    constructor(){

        this.mongo = new mongoClient(config.mongo.url,{ useUnifiedTopology: true });
        this.mongo.connect();

    }

    async login(login,password){
        
        try{
            var db = this.mongo.db("docker");
            var user = db.collection("user");
            var res = await user.findOne({name:login,password:md5(password)});

            if(!res){
                return -1
            }

            var token = jwt.sign({name:login},config.privateKey,{expiresIn: "1m"});
            return token;0

        } catch(err){
            console.log(err.stack);
        }

    }

    async register(login,password){
        
        try{
            var signedUp = await this.isSignedUp(login);
            if(signedUp){
                return -1;
            }
            var db = this.mongo.db("docker");
            var user = db.collection("user");
            await user.insertOne({name: login,password: md5(password)});
            return 1;
        } catch(err){  
            return -2;
        }

    }

    async isSignedUp(login){

        try{
            var db = this.mongo.db("docker");
            var user = db.collection("user");
            var res = await user.findOne({name:login});
            return res!=null;
        }catch(err){
            console.log(err);
        }

    }

    async auth(token){

        try{
            var decoded = await jwt.verify(token,config.privateKey);
            return decoded;
        }catch(err){
            return false;
        }

    }

}

exports.Account = Account;