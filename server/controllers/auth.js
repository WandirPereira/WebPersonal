const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt.js");

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

function login(req, res){
    const { email, password } = req.body;
console.log(email);
console.log(password);
    if(!email) res.status(400).send({ msg: "O e-mail é obrigatório!"});
    if(!password) res.status(400).send({ msg: "A senha é obrigatória!"});
    
    const emailLowerCase = email.toLowerCase();

    User.findOne({ email: emailLowerCase}, (error, userStore) => {
        if(error) {
            res.status(500).send({msg: "Error interno no servidor!"});
        } else {
            //console.log("Password: ", password);
            //console.log(userStore);
            bcrypt.compare(password, userStore.password, (bcryptError, check) => {
                if(bcryptError){
                    res.status(500).send({msg: "Error interno no servidor!"});
                } else if (!check){
                    res.status(400).send({msg: "Senha incorreta!"});
                } else if (!userStore.active) {
                    res.status(401).send({msg: "Usuário não autorizado ou inativo!"});
                } else {
                    res.status(200).send({
                        access: jwt.createAccessToken(userStore),
                        refresh: jwt.createRefreshToken(userStore),               
                    });
                }
            });
        }
    });
}

module.exports = {
    register,
    login,
};