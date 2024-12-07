const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    fs.readdir("./files", function (err, files) {
        res.render("index", { files: files });
    })
})
app.get('/show/:filename', (req, res) => {
    fs.readFile(`./files${req.params.filename}`, (err, ds) => {
        if (err) console.log(err);
        else res.render("show", { filename: req.params.filename, data: ds });


    })
})

app.post('/submit', (req, res) => {
    fs.writeFile(`./files/${req.body.filename.split(' ').join('')}.txt`, req.body.description, function (err) {
        if (err) {
            console.error('Error writing file:', err);
            // return res.status(500).send('Failed to write file');
        } else {
            console.log(' file  created successfully!');
            res.redirect("/");
        }
    });



})

app.listen(3000, () => { console.log("server running with port number 3000") });

