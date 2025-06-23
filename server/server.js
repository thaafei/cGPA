const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors");
const fs = require('fs')
const pdf = require('pdf-parse');
const multer = require("multer");

dotenv.config()

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
    console.log(entries)
    entries.forEach(entry => {
        let unit_weight = entry.credit
        let grade = gradeMap[entry.grade]
        total_grades += (unit_weight*grade)
        total_units += (unit_weight*12)
    });
    let cgpa = total_grades/total_units
    let cgpa_as_twelve_scale = (cgpa*12).toFixed(1)
    let cgpa_as_four_scale = (cgpa*4).toFixed(1)
    res.json({four_scale: cgpa_as_four_scale, twelve_scale: cgpa_as_twelve_scale})
  })

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

app.post('/parse-transcript', upload.single("file"), (req, res) => {
  try {
    const dataBuffer = req.file.buffer;
    pdf(dataBuffer).then((result) => parseTranscript(result.text, res));
  }catch{
    res.json({message: "Error"})
  }
    
});

function parseTranscript(transcript_string, res){
  let pattern = /(?=---\s*\d{4}\s+[A-Za-z]+(?:\/[A-Za-z]+)*\s*---)/;
  let semesters = transcript_string.split(pattern);
  semesters.shift();
  let result = [];
  semesters.forEach(semester => {
    let subresult = semester.split('\n');
    let first_course = true
    let course = ""
    let credit = ""
    let next_mark = false
    subresult.forEach(line => {
      if (first_course){
        if (/[A-Z]{4,}\s\d[A-Za-z][A-Za-z0-9]\d[A-Za-z]?/.test(line) && !next_mark) {
          course = line.trim()
          return
        }else if (/\d\.\d{2}\/\d\.\d{2}/.test(line) && !next_mark) {
          credit = line.trim()
          return
        }else if (line === "Grade"){
          next_mark = true
          return
        }else if (next_mark){
          first_course = false
          let grade = line.trim()
          if (!gradeMap[grade]){
            grade = ""
          }
          credit = credit.split(".")[0]
          result.push({ course, credit, grade })
          if (grade != ""){
            return
          }
        }
      }
      const line_pattern = /([A-Z]{4,}\s\d[A-Za-z][A-Za-z0-9]\d[A-Za-z]?)\s.*?(\d+\.\d{2}\/\d+\.\d{2})([A-Z+-]{1,4})?/
      const match = line.match(line_pattern)
      if (match) {
        let course = (match[1] ? match[1].trim() : match[1])
        let credit = (match[2] ? match[2].trim() : match[2])
        let grade = (match[3] ? match[3].trim() : match[3])
        credit = credit.split(".")[0]
        result.push({ course, credit, grade })
      }
    });
  });
  let cleanedResult = cleanupResults(result)
  res.json(cleanedResult)
}

const empty_credit = ["0", "", undefined]
function cleanupResults(result){
  let cleanedResult = []
  let disgardedResult = []
  result.forEach((entry) => {
    if (!( entry.credit in empty_credit)){
      cleanedResult.push(entry)
    }else{
      disgardedResult.push(entry)
    }
  })
  return { clean: cleanedResult, bad: disgardedResult}
}