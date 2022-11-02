const bcrypt = require("bcryptjs");
const Course = require("../models/course");
const image = require("../utils/image");

async function createCourse(req, res){
    const course = new Course(req.body);
    console.log(course);

    const imagePath = image.getFilePath(req.files.miniature);
    course.miniature = imagePath;

    course.save((error, courseStored) => {
        if(error){
            return res.status(400).send({ msg: "Erro ao criar o curso!"});
        }else{  
            return res.status(200).send({ courseStored });
        }
    });
}


async function getCourses(req, res){
    const {page = 1, limit = 10} = req.query;
    
    const options = {
        page: parseInt(page),
        limit: parseInt(limit)
    };

    Course.paginate({}, options, (error, courses) => {
        if(error){
            return res.status(400).send({ msg: "Erro ao buscar o curso!"});
        }else{  
            return res.status(200).send({ courses });
        }
    });

    // Course.find((error, courses) => {
    //     if(error){
    //         return res.status(400).send({ msg: "Erro ao buscar o curso!"});
    //     }else{  
    //         return res.status(200).send({ courses });
    //     }
    // });
}


module.exports = {
    createCourse,
    getCourses,
}
