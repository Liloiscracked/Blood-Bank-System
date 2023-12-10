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
    var Fname = req.body.FirstName;
    var Middlename = req.body.MiddleName;
    var LastName = req.body.LastName;
    var email = req.body.email;
    var phone = req.body.phone;
    var bloodType = req.body.bloodType;
    var ID = req.body.ID;

    var data = {
        "Fname": Fname,
        "Mname":Middlename,
        "Lname":LastName,
        "email" : email,
        "phone": phone,
        "Blood_type":bloodType,
        "ID": ID
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

//the recipient applicaation details
app.post("/recipient",(req,res)=>{
  var Fname = req.body.FirstName;
  var Middlename = req.body.MiddleName;
  var LastName = req.body.LastName;
  var email = req.body.email;
  var phone = req.body.phone;
  var bloodType = req.body.bloodType;
  var ID = req.body.ID;

  var data = {
      "Fname": Fname,
      "Mname":Middlename,
      "Lname":LastName,
      "email" : email,
      "phone": phone,
      "Blood_type":bloodType,
      "ID": ID
  }
    async function Handle(data){  
        try {
          const query = data;
          const document = await db.collection('recipient').findOne(query);
          if (document){
            console.log('Document exists:', document);
            return res.redirect('recepient.html');
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