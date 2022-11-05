const Newsletter = require("../models/newsletter");

function subscribeEmail(req, res){
   const { email } = req.body;

   if (!email)  res.status(400).send({ msg: "Informe o email!"})

   const newsletter = new Newsletter({
    email: email.toLowerCase(),
   })

   newsletter.save((error, newsletterStored) => {
        if(error){
            return res.status(400).send({ msg: "O email já está registrado!"});
        }else{  
            return res.status(200).send({ newsletterStored });
        }
    });
}


function getEmails(req, res){
    const {page = 1, limit = 10} = req.query;
    
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        //sort: { created_at: "desc"}, 
    };

    Newsletter.paginate({}, options, (error, emailsStored) => {
        if(error){
            return res.status(400).send({ msg: "Erro ao buscar o e-mails!"});
        }else{  
            return res.status(200).send({ emailsStored });
        }
    });
}

function deleteEmail(req, res){
    const { id } = req.params;

    Newsletter.findOneAndDelete({ _id: id }, (error) => {
        if(error){
            return res.status(400).send({ msg: "Erro ao deletar o email!", erro: {error}});
        }else{
            return res.status(200).send({ msg: "Email deletado com sucesso!" });
        }
    });
}


module.exports = {
    subscribeEmail,
    getEmails,
    deleteEmail,
};
