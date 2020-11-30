db = db.getSiblingDB("docker");

db.user.save(

    {
        name: "Franck",
        password : "chen"
    }

);

db.user.save(

    {
        name: "Lucas",
        password : "augusto"
    }

);
