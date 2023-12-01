async function fun(){
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://lilo:123@cluster0.bonii93.mongodb.net/";
const client = new MongoClient(uri);
    try {
      const database = client.db('Blood_bank');
      const person = database.collection('Person');
      person.insertOne({"username":"hi"});
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
}
fun();
console.log("Done");