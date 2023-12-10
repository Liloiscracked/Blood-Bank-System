//Here is where the admin writes queries
//Connection section
var mongoose = require("mongoose")


mongoose.connect('mongodb+srv://lilo:123@cluster0.bonii93.mongodb.net/Blood_bank',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

// End of connection code

//Querying

//End of querying
