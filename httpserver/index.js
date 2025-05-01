const http =  require("http");
const fs = require('fs');
const url = require('url');

const myServer = http.createServer((req, res)=>{
    if(req.url==='/favicon.ico') return res.end();
    const log = `${Date.now()}: ${req.url} New request received\n`;
    const myUrl = url.parse(req.url);
    console.log(myUrl);
    fs.appendFile("log.txt", log, (err,data) =>{
        switch(myUrl.pathname){
            case "/": res.end("homePage");
            break;
            case "/about": res.end("about");
            break;
            default: res.end("404 Not Found!");
        }
    });
});

myServer.listen(8001, () => console.log("server started!"));