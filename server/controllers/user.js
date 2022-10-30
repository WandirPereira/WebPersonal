const User = require("../models/user");

async function getMe(req, res) {
    console.log("dadops");
    console.log(req.user);
    console.log(` Dados do usuário getME: ${req.user.exp}`);

    const { user_id } = req.user;
    const response = await User.findById(user_id);

    if(!response){
        return res.status(400).send({ msg: "Usuário não encontrado!"})
    } else {
        return res.status(200).send(response);
    }
}

async function getUsers(req, res){

    const { active } = req.query;

    let response = null;
     if(active === undefined) {
        response = await User.find();
     }else {
        response = await User.find({ active });
     }

    //console.log(' active -> ', active);
    //console.log(response);

    return res.status(200).send(response);
}

module.exports = {
    getMe,
    getUsers,
};