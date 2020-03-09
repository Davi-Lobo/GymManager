const fs = require('fs');

// Create
exports.post = function(req, res) {

    const keys = Object.keys(req.body);

    for(key of keys) {
        if (req.body[key] == "") {
            return res.send("Por favor, insira todos os campos.")
        }
    }

    fs.writeFile("data/data.json", JSON.stringify(req.body), function(err){
        if (err) {
            return res.send("Write file error");
        }

        return res.redirect("/instructors");
    });

};


// Update

// Delete