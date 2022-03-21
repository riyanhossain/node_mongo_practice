const express = require("express");
var bodyParser = require("body-parser");

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://mehrabriyan:Cr6J4QfXRe3rBPn@cluster0.f6ym0.mongodb.net/practiceDatabase?retryWrites=true&w=majority";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("practiceDatabase").collection("prData");
  console.log("database connected");
  // perform actions on the collection object
  //   collection.insertOne(
  //     { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
  //  ).then(console.log('inserted'))
  app.post("/formSub", (req, res) => {
    const data = req.body;
    collection.insertOne(data).then(console.log('data inserted'))
    res.send('inserted')
  });
  app.get('/formData', (req,res)=>{
     collection.find({})
     .toArray((err ,documents)=>{
        res.send(documents)
     })
  })
});

app.listen(4000);
