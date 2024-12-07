const fs = require('fs'); 

function createFile(fileName, content) {
    fs.writeFile(fileName, content, function(err) {
        if (err) console.log(err);
        else console.log("File created successfully");
    });
}

function appendToFile(fileName, data) {
    fs.appendFile(fileName, data, (err) => {
        if (err) console.log(err);
        else console.log("Append file operation performed successfully");
    });
}

function renameFile(oldName, newName) {
    fs.rename(oldName, newName, (err) => {
        if (err) console.log(err.message);
        else console.log("Rename operation performed successfully");
    });
}

function copyFile(source, destination) {
    fs.copyFile(source, destination, (err) => {
        if (err) console.log(err.message);
        else console.log("Copy operation performed successfully");
    });
}

function deleteFile(fileName) {
    fs.unlink(fileName, function(err) {
        if (err) console.log(err);
        else console.log("Delete file operation performed successfully");
    });
}

function removeDirectory(dirPath) {
    fs.rm(dirPath, { recursive: true }, function(err) {
        if (err) console.log(err);
        else console.log("Folder removed successfully");
    });
}

function createDirectory(dirPath) {
    fs.mkdir(dirPath, { recursive: true }, function(err) {
        if (err) console.log(err);
        else console.log("Directory created successfully");
    });
}

function readFile(fileName) {
    fs.readFile(fileName, "utf8", (err, data) => {
        if (err) console.log(err);
        else console.log("File content:", data);
    });
}

function readDirectory(dirPath) {
    fs.readdir(dirPath, (err, files) => {
        if (err) console.log(err);
        else console.log("Files in directory:", files);
    });
}
function stats(filename){
    fs.stat(filename, (err, stats) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stats);
    console.log("Is file?", stats.isFile());
    console.log("Is directory?", stats.isDirectory());
});
}


// createFile("hey.txt", "Hi, this is Revanth");
// appendToFile("hey.txt", " an undergraduate in IIIT Lucknow");
// renameFile("hey.txt", "hello.txt"); // Ensure hey.txt exists before running this
// createDirectory("./copy");
// createFile("./copy/copy.txt","");
// copyFile("hello.txt", "./copy/copy.txt");
// readFile("hello.txt"); 
// deleteFile("hello.txt");
// readDirectory("./copy");
// removeDirectory("./copy");
// stats("hey.txt");
// stats("copy");