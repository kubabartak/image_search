
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Bing = require('node-bing-api')({ accKey: "6cb4180f37e749dba9ddb41a9df5cba0" });
const app = express();

const image_db = require('./models/image_db');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));
//home page


// connect to db 

var mongodbUri= 'mongodb://testowy:test@ds157809.mlab.com:57809/image_search';
const mongoose = require('mongoose');
 
const options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };       
 
// uncomment fo heroku var mongodbUri = process.env.MONGODB_URI;
 
mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;             
 
conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', function() {

    console.log("connected to db");
// img search. * to allow adding additional queries

app.get('/api/imagesearch/:photoString(*)', function(req, res){
    var searchString= req.params.photoString;
    if (req.query.offset) {
    var offset = req.query.offset;} else {offset= 0;}
    // save to db
    var dbRecord = new image_db({
        term: searchString,
                      when: new Date()
    });
    dbRecord.save(function(err){
                if (err) {
                    return res.send("Error saving to database");
                } console.log("db entry successfull")
            });
    
   // get search info 
    Bing.images(searchString, {
        top: 10, //number of results
      skip: offset
    }, function(error, response, body){
     if (error) {return console.log("error searching web");
                }  else
     var data=[];
       for (var i=0; i<10; i++){
           data.push({"image_url": body.value[i].webSearchUrl,
                      "snippet": body.value[i].name,
                      "thmubnail": body.value[i].thumbnail,
                      "context": body.value[i].hostPageDisplayUrl
                     })
           }
       res.json(data);  
    })
});
    // view latest queries
    app.get('/api/latest/imagesearch', function(req, res){    
   image_db.
  find({}).
  limit(10). //display last 10 queries
   select('-_id term when'). // do not display _id item, just term and when
  sort('-when'). //sort descending
  exec(function(err, docs){if (err) return console.log("Error reading data"); 
                           res.json(docs)});
            })      
    })

// app listen

app.listen(process.env.PORT || 3000, function(){
    console.log ('server runs');
});