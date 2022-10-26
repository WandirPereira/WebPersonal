function register(req, res) {
    console.log("Executou o rgistro!");

    res.status(200).send({msg: "Tudo Ok!"});
}

module.exports = {
    register,
};