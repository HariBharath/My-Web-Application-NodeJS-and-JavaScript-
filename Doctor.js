var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var cors = require('cors');
var array = [];
module.exports = function(app){

mongoose.connect('mongodb://admin:appleiphone8plus@ds135966.mlab.com:35966/doctor');

var todoSchema = new mongoose.Schema({
    Name: String,
    Department : String,
    Days: [String]
});

var Todo = mongoose.model('Todo',todoSchema);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())


app.post('/display',function(req,res){
    var newTodo = Todo(req.body).save(function(err,data){
        if(err) throw err;
        res.json(data);
    });

});
app.get('/home',function(req,res){
    res.render('home');
});

app.get('/docavail',function(req,res){
    res.render('redirect');
});
app.get('/redirect',function(req,res){
    res.render('Info');
})

app.get('/redirect1',function(req,res){
    res.render('days');
})


app.get('/data',function(req,res){
    array = [];
    if(req.query.avail === "" || req.query.avail1 === ""){
        Todo.find({$or:[{Name: req.query.avail},{Department : req.query.avail1}]},function(err,data){
            if (err) throw err;
            
            if(data.length === 0){
                res.render('Info');
            
            }else{
                res.render('backup1',{todos:data})
            }
        })

}else if(req.query.avail != "" && req.query.avail1 !== ""){
    Todo.find({$and:[{Name: req.query.avail},{Department : req.query.avail1}]},function(err,data){
        if (err) throw err;
         
        if(data.length === 0){
            res.render('Info');
        
        }else{
            res.render('backup2',{todos : data});
        }
        
    })
}
})
app.get('/days',function(req,res){
    var array = [];
    Todo.find({},function(err,data){
        
        for(var i=0;i<data.length;i++){
            if(data[i]["Days"].includes(req.query.avail2)){
                

                var obj = {
                    "Name" : data[i]["Name"],
                    "Department" : data[i]["Department"],
                    "Days" : data[i]["Days"]
                }
                array.push(obj);
            }
                
            
        }
        res.render('backup',{data : array})
    })
})

}



