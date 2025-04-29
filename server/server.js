const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config()
// const MONGO_PW = process.env.MONGO_PW;
// const uri = `mongodb+srv://thaafei:${MONGO_PW}@cluster0.bu4d4r6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();
const PORT = 8081;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.post('/parse-transcript', (req, res) => {
  const { transcriptText } = req.body;
  
  console.log(transcriptText);

  res.json({ cGPA: 3.87 });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.post("/submit-grades", (req, res) => [
    
])