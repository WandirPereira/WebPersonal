const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST, IP_SERVER, API_VERSION } = require("./constants");

const PORT = process.env.POST || 3977;

mongoose.connect(
    `mongodb://localhost:27017/`, (error) => {
        if(error) throw error;
        //console.log("A conexão com a base de dados foi criada com sucesso!");
        app.listen(PORT, () => {
            console.log("##########################");
            console.log("######## API REST ########");
            console.log("##########################");
            console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`)
        });
    }
);

