require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vtwnpfe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    //---------All collection Start here---------
    const DB = client.db("RRLLC");
    const websiteCollection = DB.collection("website");

    // ---------All collection End here----------

    //---------All API Start here---------

    // get all website

    app.get("/website", async (req, res) => {
      try {
        const result = await websiteCollection.find({}).toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    //---------All API End here---------
  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Job task Server!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
