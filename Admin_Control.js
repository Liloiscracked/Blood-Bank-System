//Here is where the admin writes queries
//Connection section
// var mongoose = require("mongoose")


// mongoose.connect('mongodb+srv://lilo:123@cluster0.bonii93.mongodb.net/Blood_bank',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// var db = mongoose.connection;

// db.on('error',()=>console.log("Error in Connecting to Database"));
// db.once('open',()=>console.log("Connected to Database"))

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://lilo:123@cluster0.bonii93.mongodb.net/";
// End of connection code

//Querying
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Blood_bank");
    dbo.collection("Donor").findOne({Blood_type : "A-"}, function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });


//update one 
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("Bloodbank");
//     var myquery = { email: "z@gmail.com" };
//     var newvalues = { $set: {email: "z1@gmail.com" } };
//     dbo.collection("recipient").updateOne(myquery, newvalues, function(err, res) {
//       if (err) throw err;
//       console.log("1 document updated");
//       db.close();
//     });
//   });

//update many 
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb");
//     var myquery = { address: /^S/ };
//     var newvalues = {$set: {name: "Minnie"} };
//     dbo.collection("customers").updateMany(myquery, newvalues, function(err, res) {
//       if (err) throw err;
//       console.log(res.result.nModified + " document(s) updated");
//       db.close();
//     });
//   });

//drop a collection:
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("Blood_bank");
//     dbo.dropCollection("user", function(err, delOK) {
//       if (err) throw err;
//       if (delOK) console.log("Collection deleted");
//       db.close();
//     });
//   });

  //limiting queries
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("Blood_bank");
//     dbo.collection("Donor").find().limit(5).toArray(function(err, result) {
//       if (err) throw err;
//       console.log(result);
//       db.close();
//     });
//   });

  //join Donor and recipient
  MongoClient.connect(url, function(err, db) {
    if (err){
        console.log("Err");
         throw err;
        }

    var dbo = db.db("Blood_bank");
    dbo.collection('Donor').aggregate([
      { $lookup:
         {
           from: 'recipient',
           localField: 'Blood_type',
           foreignField: 'Blood_type',
           as: 'match'
         }
       }
      ]).toArray(function(err, res) {
      if (err) throw err;
      console.log(JSON.stringify(res));
      db.close();
    });
  });
//End of querying
