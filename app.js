var express=require('express');
var bodyParser = require('body-parser');
const { Pool,Client} =require('pg')
var path=require('path')
/*  end      */



/* Configuration to connect to database */


const connectionString ="postgres://st:shyam02@localhost:5432"

const client = new Client({
    connectionString:connectionString
})

client.connect()
/*  end      */



//creating express object
app=express();



//seting view engine to ejs
app.set('view engine','ejs');


// using bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));

//file handeling

app.get('/',function(req,res){
    res.render("login");
   });
   app.get('/register', function(req, res) {
    res.render('register');
  });
  app.get('/about', function(req, res) {
    res.render('about');
  });
  app.get('/details', function(req, res) {
    res.render('details');
  });
  app.get('/home', function(req, res) {
    res.render('first');
  });
  app.get('/about', function(req, res) {
    res.render('about');
  });
  app.post('/home',function(req,res){
    console.log(req.body.email);
 client.query("INSERT INTO login(email,password)values($1,$2);",[req.body.email,req.body.password],function(err,result)
  {
    if(err)
    {
        res.status(500).send(err.toString());
    }
    else{res.render("first");}
});

});
app.post('/home',function(req,res){
    console.log(req.body.email);
 client.query("INSERT INTO login(name,email,pIassword)values($1,$2,$3);",[req.body.name,req.body.email,req.body.password],function(err,result)
  {
    if(err)
    {
        res.status(500).send(err.toString());
    }
    else{res.render("first");}
});

});
//port
app.listen(8080); //our app is running on port no 8080
console.log('Server started at port 8080');