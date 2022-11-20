const Menu = require("../models/menu");

async function createMenu(req, res){
    const menu = new Menu(req.body);

    menu.save((error, menuStored) => {
        if(error){
            return res.status(400).send({ msg: "Erro ao criar menu!"});
        }else{  
            return res.status(201).send({ menuStored });
        }
    }) 
}

async function getMenus(req, res){
    const { active } = req.query;
    let response = null;
     if(active === undefined) {
        response = await Menu.find().sort({ order: "asc"});
     }else {
        response = await Menu.find({ active }).sort({ order: "asc"});
     }
     if(!response){
        return res.status(400).send({ msg: "Nenhum menu encontrado!"} );
     }else{
        return res.status(200).send(response);
     }
    
}

async function updateMenu(req, res){
    const { id } = req.params;

    //const _menu = await Menu.findById(id);
    //if(!_menu) return res.status(400).send({ msg: "Menu não encontrado!"})
    //console.log(id);
    const menuData = req.body;
    //console.log(menuData);
    Menu.findByIdAndUpdate({ _id: id }, menuData, (error) => {
        if(error){
            return res.status(400).send({ msg: "Erro ao atualizar o menu!", erro: {error}});
        }else{
            return res.status(200).send({ msg: "Menu atualizado com sucesso!" });
        }
    });
}

async function deleteMenu(req, res){
    const { id } = req.params;

    // const _nenu = await Menu.findById(id);
    // if(!_menu) return res.status(400).send({ msg: "Menu não encontrado!"})

    Menu.findOneAndDelete({ _id: id }, (error) => {
        if(error){
            return res.status(400).send({ msg: "Erro ao deletar o mu!", erro: {error}});
        }else{
            return res.status(200).send({ msg: "Menu deletado com sucesso!" });
        }
    });
}

module.exports = {
    createMenu,
    getMenus,
    updateMenu,
    deleteMenu,
}