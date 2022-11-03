const Course = require("../models/course");

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
}

async function updateCourse(req, res){
    const { id } = req.params;

    // const _user = await User.findById(id);
    // if(!_user) return res.status(400).send({ msg: "Usuário não encontrado!"})

    const courseData = req.body;
    console.log(courseData);

    //avatar
    if(req.files.miniature){
        const imagePath = image.getFilePath(req.files.miniature);
        courseData.miniature = imagePath;
    }else{
        delete courseData.miniature;
    }

    Course.findByIdAndUpdate({ _id: id }, courseData, (error) => {
        if(error){
            return res.status(400).send({ msg: "Erro ao atualizar o curso!", erro: {error}});
        }else{
            return res.status(200).send({ msg: "Curso atualizado com sucesso!" });
        }
    });
}

async function deleteCourse(req, res){
    const { id } = req.params;

    // const _course = await Course.findById(id);
    // if(!_course) return res.status(400).send({ msg: "Curso não encontrado!"})

    Course.findOneAndDelete({ _id: id }, (error) => {
        if(error){
            return res.status(400).send({ msg: "Erro ao deletar o curso!", erro: {error}});
        }else{
            return res.status(200).send({ msg: "Curso deletado com sucesso!" });
        }
    });
}

module.exports = {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse,
}
