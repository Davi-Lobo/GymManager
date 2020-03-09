const fs = require('fs');

const data = require('./data/data.json');

// Create
exports.post = function(req, res) {

    const keys = Object.keys(req.body);

    for(key of keys) {
        if (req.body[key] == "") {
            return res.send("Por favor, insira todos os campos.")
        }
    }

    data.instructors.push(req.body);

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


// Update

// Delete