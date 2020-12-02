const redis = require('async-redis');
const config = require('./config.json');

class Data{

    constructor(){
        this.client = redis.createClient(config.redis.url);
    }

    addPost(post){

        var id = (new Date().getTime()).toString(36)
        this.client.hmset("post",id,JSON.stringify(post));

    }

    async getAllPost(){

        var res = await this.client.hgetall("post")

        if(!res){
            return [];
        }
        return Object.values(res).map( (obj) => {
            return JSON.parse(obj);
        });

    }

}

exports.Data = Data;