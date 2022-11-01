const bcrypt = require("bcryptjs");
const User = require("../models/user");
const image = require("../utils/image");

async function getMe(req, res) {
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
    return res.status(200).send(response);
}

async function createUser(req, res) {
    const { password } = req.body;
    const user = new User({ ...req.body, active: false });

    const salt = bcrypt.genSaltSync(10);
    const encodedPassword = bcrypt.hashSync(password, salt);
    user.password = encodedPassword;
    console.log(encodedPassword);
    console.log(req.files.avatar);

    if(req.files.avatar){
        const imagePath = image.getFilePath(req.files.avatar);
        user.avatar = imagePath;

        console.log(`imagePath = ${imagePath}`);
        console.log(imagePath);
    }
    console.log(user);

    const response = await User.findOne({email: req.body.email});
    if(response){
        return res.status(400).send({ msg: "E-mail já cadastrado!" });
    }

    user.save((error, userStored ) =>{
        if(error) {
            return res.status(400).send({ msg: "Erro ao criar o usuário!", erro: error })
        } else{
            return res.status(200).send( userStored );
        }
    });
}

async function updateUser(req, res){
    const { id } = req.params;

    const _user = await User.findById(id);
    if(!_user) return res.status(400).send({ msg: "Usuário não encontrado!"})

    const userData = req.body;

    //password
    if(userData.password){
        const salt = bcrypt.genSaltSync(10);
        const encodedPassword = bcrypt.hashSync(userData.password, salt);
        userData.password = encodedPassword;
    }else{
        delete userData.password;
    }

    //avatar
    if(req.files.avatar){
        const imagePath = image.getFilePath(req.files.avatar);
        userData.avatar = imagePath;
    }else{
        delete userData.avatar;
    }

    User.findByIdAndUpdate({ _id: id }, userData, (error) => {
        if(error){
            return res.status(400).send({ msg: "Erro ao atualizar o usuário!", erro: {error}});
        }else{
            return res.status(200).send({ msg: "Usuário atualizado com sucesso!" });
        }
    });
}

async function deleteUser(req, res){
    const { id } = req.params;

    const _user = await User.findById(id);
    if(!_user) return res.status(400).send({ msg: "Usuário não encontrado!"})

    User.findOneAndDelete({ _id: id }, (error) => {
        if(error){
            return res.status(400).send({ msg: "Erro ao deletar o usuário!", erro: {error}});
        }else{
            return res.status(200).send({ msg: "Usuário deletado com sucesso!" });
        }
    });

}

module.exports = {
    getMe,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};