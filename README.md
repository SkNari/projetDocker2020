# projetDocker2020

Simple project. You can register, login and post message.

## Set up

```bash
git clone https://github.com/SkNari/projetDocker2020.git
cd projetDocker2020
docker-compose up
```

now go  http://localhost:4200.

## Project structure

This project uses : 
* **angular** container for frontend.
* **nodejs** container for backend. 
* **redis** container. 
* **mongodb** container.

Redis contains persistant data from messages

Mongodb contains users account

Nodejs interracts with mongodb and redis to proide an authentification service and messages data.

Angular provides a browser app

## Connecting to databases
```
Connecting to the **redis** database :
```bash
docker exec -it redis redis-cli
```

Connecting to the **MongoDB** database :
```bash
docker exec -it mongodb mongo
```


