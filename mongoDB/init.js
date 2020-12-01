db = db.getSiblingDB("docker");

db.user.save(

    {
        name: "Franck",
        password : "a1a8887793acfc199182a649e905daab"
    }

);

db.user.save(

    {
        name: "Lucas",
        password : "70dc9794fd98431263b895f1344860c7"
    }

);
