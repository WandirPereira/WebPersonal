const User = require("../models/user");

async function getMe(req, res) {
    //console.log("dadops");
    //console.log(req.user);
    //console.log(` Dados do usuário getME: ${req.user.exp}`);

    const { user_id } = req.user;
    const response = await User.findById(user_id);

    if(!response){
        return res.status(400).send({ msg: "Usuário não encontrado!"})
    } else {
        return res.status(200).send(response);
    }
}

async function getUsers(req, res){
    //console.log("000");
    const { active } = req.query;
    //console.log("111");
    let response = null;
     if(active === undefined) {
        //console.log("222");
        response = await User.find();
     }else {
        //console.log("333");
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