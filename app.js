const express = require('express');
const app = express();
const port = 3000;
const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://lilo:123@cluster0.bonii93.mongodb.net/";

const client = new MongoClient(uri);

async function exist() {
  try {
    const database = client.db('Blood_bank');
    const person = database.collection('Person');

    // Query for a person 
    const query = { _id: 'new ObjectId("6560a17ba068377f5ffc1c5a")'};
    const record = await person.findOne(query);
    if(record === null){
        console.log("not found");
        return false;
    }
    else{
        console.log(record);
        return true;
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
exist()
.catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});