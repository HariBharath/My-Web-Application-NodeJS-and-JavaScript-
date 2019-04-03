const express = require("express");
var cors = require('cors');


var todocontroller = require('./controller/Doctor');

let app = new express();
app.use(cors());
app.set('view engine', 'ejs');

todocontroller(app);

let port = 1200;


app.listen(port,function(){
    console.log("You are listening to port " + port);
});
