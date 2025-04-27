const express = require("express");
const dotenv = require("dotenv")
dotenv.config()
const MONGO_PW = process.env.MONGO_PW;
const uri = `mongodb+srv://thaafei:${MONGO_PW}@cluster0.bu4d4r6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();
const PORT = 8081;

app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);