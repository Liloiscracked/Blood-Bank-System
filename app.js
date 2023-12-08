var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://lilo:123@cluster0.bonii93.mongodb.net/Blood_bank',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))


//the donor applicaation details
app.post("/donor",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;
    var Blood_type = req.body.Blood_type;
    var Ssn = req.body.Ssn;

    var data = {
        "ID": name,
        "email" : email,
        "phno": phno,
        "password" : password,
        "Blood_type":Blood_type,
        "Ssn": Ssn
    }
    async function Handle(data){  
        try {
          const query = data;
          const document = await db.collection('Donor').findOne(query);
          if (document){
            console.log('Document exists:', document);
            return res.redirect('donor.html');
          } else {
            db.collection('Donor').insertOne(data);
            return res.redirect('Done.html');
          }
        } finally {
          console.log('Your application has been recieved');
        }
      }
      Handle(data);
})

//the donor applicaation details
app.post("/recipient",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;
    var Blood_type = req.body.Blood_type;
    var Ssn = req.body.Ssn;

    var data = {
        "ID": name,
        "email" : email,
        "phno": phno,
        "password" : password,
        "Blood_type":Blood_type,
        "Ssn": Ssn
    }
    async function Handle(data){  
        try {
          const query = data;
          const document = await db.collection('recipient').findOne(query);
          if (document){
            console.log('Document exists:', document);
            return res.redirect('donor.html');
          } else {
            db.collection('recipient').insertOne(data);
            return res.redirect('Done.html');
          }
        } finally {
          console.log('Your application has been recieved');
        }
      }
      Handle(data);
})


app.get('/donor',(req,res)=>{
  res.sendFile('public/donor.html');
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('Home.html');
}).listen(3000);


console.log("Listening on PORT 3000");