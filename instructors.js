const fs = require('fs');

const data = require('./data/data.json');


// Show
exports.show = function(req,res) {

    const { id } = req.params;

    const findInstructor = data.instructors.find(function(instructor) {
        return instructor.id == id;
    })


    if(!findInstructor) {
        return res.send("Instructor not found");
    }

    function getAge(timestamp) {
        const today = new Date();
        const birthDate = new Date(timestamp);

        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();

        if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
            age = age - 1;
        }

        return age;
    }

    const instructor = {
        ...findInstructor,
        age: getAge(findInstructor.birth),
        skills: findInstructor.skills.split(","),
        created_at: ""
    }

    console.log(instructor.age);

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