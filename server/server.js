const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config()
// const MONGO_PW = process.env.MONGO_PW;
// const uri = `mongodb+srv://thaafei:${MONGO_PW}@cluster0.bu4d4r6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();
const PORT = 8081;
const gradeMap = {
  "A+": 12,
  "A": 11,
  "A-": 10,
  "B+": 9,
  "B": 8,
  "B-": 7,
  "C+": 6,
  "C": 5,
  "C-": 4,
  "D+": 3,
  "D": 2,
  "D-": 1,
  "F": 0
}

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.post("/calculate", (req, res) => {
    const { entries } = req.body
    let total_units = 0
    let total_grades = 0
    entries.forEach(entry => {
        let unit_weight = entry.course[3]
        let grade = gradeMap[entry.grade]
        total_grades += (unit_weight*grade)
        total_units += (unit_weight*12)
    });
    let cgpa = total_grades/total_units
    let cgpa_as_twelve_scale = cgpa.toFixed(2)
    let cgpa_as_four_scale = (cgpa*4).toFixed(2)
    res.json({four_scale: cgpa_as_four_scale, twelve_scale: cgpa_as_twelve_scale})
  })

app.post('/parse-transcript', (req, res) => {
  const { transcriptText } = req.body;
  
  console.log(transcriptText);
});

app.get('/test', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.post("/submit-grades", (req, res) => [
    
])