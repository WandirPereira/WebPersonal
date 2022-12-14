const Post = require("../models/post");
const image = require("../utils/image");


function createPost(req, res){
    const post = new Post(req.body);
    post.created_at = new Date();
    //console.log(post);

    const imagePath = image.getFilePath(req.files.miniature);
    post.miniature = imagePath;

    post.save((error, postStored) => {
        if(error){
            return res.status(400).send({ msg: "Erro ao criar o post!"});
        }else{  
            return res.status(201).send({ postStored });
        }
    });
}

function getPosts(req, res){
    const {page = 1, limit = 10} = req.query;
    
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { created_at: "desc"}, 
    };

    Post.paginate({}, options, (error, postsStored) => {
        if(error){
            return res.status(400).send({ msg: "Erro ao buscar o post!"});
        }else{  
            return res.status(200).send({ postsStored });
        }
    });
}

function updatePost(req, res){
    const { id } = req.params;
    const postData = req.body;

    if(req.files.miniature){
        const imagePath = image.getFilePath(req.files.miniature);
        postData.miniature = imagePath;
    }

    Post.findByIdAndUpdate({ _id: id }, postData, (error) => {
        if(error){
            return res.status(400).send({ msg: "Erro ao atualizar o post!", erro: {error}});
        }else{
            return res.status(200).send({ msg: "Post atualizado com sucesso!" });
        }
    });
}

function deletePost(req, res){
    const { id } = req.params;

    Post.findOneAndDelete({ _id: id }, (error) => {
        if(error){
            return res.status(400).send({ msg: "Erro ao deletar o post!", erro: {error}});
        }else{
            return res.status(200).send({ msg: "Post deletado com sucesso!" });
        }
    });
}

function getPostByPath(req, res) {
    const { path } = req.params;

    Post.findOne( {path: path }, ( error, postStored ) => {
            if(error) {
                return res.status(500).send({ msg: "Post n??o encontrado ou erro interno no servidor!"});
            }else 
                if(!postStored) {
                    return res.status(400).send({msg: "Post n??o encontrado!"});
                }else{
                    return res.status(200).send( postStored );
                }
        }
    );
}


module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    getPostByPath,
};
