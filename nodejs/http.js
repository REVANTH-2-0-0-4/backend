const http = require('http');
const server = http.createServer(function(req,res){
    res.end("mod_gud");
})

server.listen(3000);
