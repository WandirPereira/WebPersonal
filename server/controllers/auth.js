const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt.js");

function register(req, res) {
    //console.log(req.body);
    const {firstname, lastname, email, password, role} = req.body;

    if (!email) return res.status(400).send( {msg : "O email é obrigatório!"});
    if (!password) return res.status(400).send( {msg : "A senha é obrigatória!"});

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
            return res.status(400).send({ msg : "Erro ao criar o usuário! "});
        } else {
            return res.status(201).send(userStoraged);
        }
    })
}

function login(req, res){
    const { email, password } = req.body;
    //console.log(email);
    //console.log(password);
    if(!email) return res.status(400).send({ msg: "O e-mail é obrigatório!"});
    if(!password) return res.status(400).send({ msg: "A senha é obrigatória!"});
    
    const emailLowerCase = email.toLowerCase();

    User.findOne({ email: emailLowerCase}, (error, userStore) => {
        //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        //console.log(`error = ${error}`);
        //console.log(`userStore = ${userStore}`);
        if(!error  && !userStore || error) {
            return res.status(500).send({msg: "Error interno no servidor ou e-mail não encontrado!"});
        } else {
            //console.log("Password: ", password);
            //console.log(userStore);
            bcrypt.compare(password, userStore.password, (bcryptError, check) => {
                if(bcryptError){
                    return res.status(500).send({msg: "Error interno no servidor!"});
                } else if (!check){
                    return res.status(400).send({msg: "Senha incorreta!"});
                } else if (!userStore.active) {
                    return res.status(401).send({msg: "Usuário não autorizado ou inativo!"});
                } else {
                    return res.status(200).send({
                        access: jwt.createAccessToken(userStore),
                        refresh: jwt.createRefreshToken(userStore),               
                    });
                }
            });
        }
    });
}

function refreshAccessToken(req, res) {
    const { refreshToken } = req.body;

    if(!refreshToken) return res.status(400).send({ msg: "Token requerido!"});    
    
    const { user_id } = jwt.decoder(refreshToken);

    User.findOne( {_id: user_id }, ( error, userStorage ) => {
        if(error) {
            return res.status(500).send({ msg: "Usuário não encontrado ou erro interno no servidor!"});
        }else {
            return res.status(200).send({ 
                accessToken: jwt.createAccessToken(userStorage), 
            });
        }
    });
}

module.exports = {
    register,
    login,
    refreshAccessToken,
};