const fs = require('fs');

const data = require('./data/data.json');

const { getAge, parseDate } = require('./utils/dates');


// Show
exports.show = function(req,res) {

    const { id } = req.params;

    const findInstructor = data.instructors.find(function(instructor) {
        return instructor.id == id;
    })


    if(!findInstructor) {
        return res.send("Instructor not found");
    }

    const instructor = {
        ...findInstructor,
        age: getAge(findInstructor.birth),
        skills: findInstructor.skills.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(findInstructor.created_at)
    };

    instructor.gender = instructor.gender=="M" ? "Masculino" : "Feminino";

    return res.render("instructors/instructor", { instructor });

}


// Create
exports.post = function(req, res) {

    const keys = Object.keys(req.body);

    for(key of keys) {
        if (req.body[key] == "") {
            return res.send("Por favor, insira todos os campos.")
        }
    }

    let { avatar_url, name, birth, gender, skills } = req.body;

    birth = Date.parse(req.body.birth);
    const created_at = Date.now();
    const id = Number(data.instructors.length + 1);

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        skills,
        created_at
    });

    const dataDir = './data';

    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }


    fs.writeFile("data/data.json", JSON.stringify(data, null, 2), function(err){

        if (err) {
            return res.send("Write file error");
        }

        return res.redirect("/instructors");
    });

};


// Edit
exports.edit = function(req, res) {
    const { id } = req.params;

    const findInstructor = data.instructors.find(function(instructor) {
        return instructor.id == id;
    });

    if(!findInstructor) {
        return res.send("Instructor not found");
    }


    const instructor = {
        ...findInstructor,
        birth: parseDate(findInstructor.birth)
    };
    
    return res.render('instructors/edit', { instructor });
};


// Put
exports.put = function(req, res) {
    const { id } = req.body;

    let index = 0;

    const findInstructor = data.instructors.find(function(instructor, foundIndex) {
        if (id == instructor.id) {
            index = foundIndex;
            
            return true;
        }
    });

    if(!findInstructor) {
        return res.send("Instructor not found");
    }

    const instructor = {
        ...findInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth)
    };

    data.instructors[index] = instructor;

    fs.writeFile("data/data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.send("Write file error!");
        }

        return res.redirect(`/instructors/${id}`);
    });
}