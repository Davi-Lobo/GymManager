const fs = require('fs');

const data = require('../data/data.json');

const { getAge, parseDate } = require('../utils/dates');

// Index
exports.index = function(req, res) {
    return res.render('members/index', { members: data.members });
};


// Show
exports.show = function(req,res) {

    const { id } = req.params;

    const findMember = data.members.find(function(member) {
        return member.id == id;
    })


    if(!findMember) {
        return res.send("Member not found");
    }

    const member = {
        ...findMember,
        age: getAge(findMember.birth),  
    };

    member.gender = member.gender=="M" ? "Masculino" : "Feminino";

    return res.render("members/member", { member });

};

exports.create = function(req, res) {
    return res.render('members/create');
};


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
    const id = Number(data.members.length + 1);

    data.members.push({
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

        return res.redirect("/members");
    });

};


// Edit
exports.edit = function(req, res) {
    const { id } = req.params;

    const findMember = data.members.find(function(member) {
        return member.id == id;
    });

    if(!findMember) {
        return res.send("Member not found");
    }


    const member = {
        ...findMember,
        birth: parseDate(findMember.birth)
    };
    
    return res.render('members/edit', { member });
};


// Put
exports.put = function(req, res) {
    const { id } = req.body;

    let index = 0;

    const findMember = data.members.find(function(member, foundIndex) {
        if (id == member.id) {
            index = foundIndex;
            
            return true;
        }
    });

    if(!findMember) {
        return res.send("Member not found");
    }

    const member = {
        ...findMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    };

    data.members[index] = member;

    fs.writeFile("data/data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.send("Write file error!");
        }

        return res.redirect(`/members/${id}`);
    });
};


// Delete
exports.delete = function(req, res) {
    const { id } = req.body;

    const filteredMembers = data.members.filter(function(member) {
        return member.id != id;
    });

    data.members = filteredMembers;

    fs.writeFile("data/data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.send("Write file error!");
        }

        return res.redirect("/members");
    });
};