const id = document.getElementById("ID");
const Fname = document.getElementById("FirstName");
const Mname = document.getElementById("MiddleName");
const Lname = document.getElementById("LastName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const bloodtype = document.getElementById("bloodType");
const form = document.getElementById("Form")
const submit = document.getElementById("submit");

const { MongoClient } = require("mongodb");

const data = {"ID":id.value , "Firstname":Fname.value ,
    "MiddleName":Mname.value,"Lastname":Lname.value,
    "Email":email.value,"Phone" : phone.value,
    "Bloodtype":bloodtype.value};
// Replace the uri string with your connection string.
const uri = "mongodb+srv://lilo:123@cluster0.bonii93.mongodb.net/";
const client = new MongoClient(uri);

async  function cansign(data){
  try {
    const database = client.db('Blood_bank');
    const person = database.collection('Person');

    // Query for a person 
    const record = await person.findOne({"ID":data.ID});
    if(record === null){
        alert("NOOO")
        console.log("not found");
        return false;
    }
    else{
      alert("signed");
        person.insertOne(data);
        return true;
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
form.addEventListener('click',()=>{
    cansign(data);
})