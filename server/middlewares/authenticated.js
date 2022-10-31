const jwt = require("../utils/jwt");

function assureAuth(req, res, next){

   if(!req.headers.authorization){
        return res.status(403).send( { msg: "A solicitação não possui o cabeçalho de authenticação!" } )
   };
    //res.status(500).send( { msg: "Bloqueado pelo middleware!"});
    //console.log("Executando assureAuth");

    const accessToken = req.headers.authorization.replace("Bearer ","");
    //console.log(accessToken);

    try {
        //console.log(accessToken);
        const payload = jwt.decoder(accessToken);
        //console.log(payload);
        const { exp } = payload;
        const currentData = new Date().getTime();
        //console.log(exp);
        //console.log(currentData);
        if(exp <= currentData){
            return res.status(400).send({ msg: "AccessToken expirado!"})
        }
        req.user = payload;
        next();
    } catch(error) {
        return res.status(400).send( {msg: "AccessToken inválido! "});
    }
}

module.exports = {
    assureAuth,
}