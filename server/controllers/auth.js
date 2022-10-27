const bcrypt = require("bcryptjs");
const User = require("../models/user");

function register(req, res) {
    console.log(req.body);
    const {firstname, lastname, email, password, role} = req.body;

    if (!email) res.status(400).send( {msg : "O email é obrigatório!"});
    if (!password) res.status(400).send( {msg : "A senha é obrigatória!"});

    const user = new User({
        firstname,
        lastname,
        email : email.toLowerCase(),
        role : "user",
        active: false,
    });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user. password = hashPassword;

    //console.log(user);
    //console.log(password);
    //console.log(hashPassword);
    //res.status(200).send({msg: "Tudo Ok!"});

    user.save((error, userStoraged) => {
        if(error) {
            res.status(400).send({ msg : "Erro ao criar o usuário! "});
        } else {
            res.status(200).send(userStoraged);
        }
    })
}

module.exports = {
    register,
};