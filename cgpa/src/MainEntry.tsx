import React, { useState } from 'react';

const gpa_mapping = {
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
  "D-": 1
}

interface Entry {
  key: number;
  courseName: string;
  grade: string;
}

function MyEntries() {
  const [entries, setEntry] = useState(Array<Entry>);
  const [result, showResult] = useState(false);

  const addEntry = () => {
    setEntry([...entries, { id: Date.now() }]);
  };

  const removeEntry = (id) => {
    setEntry(entries.filter(entries => entries.id !== id));
  };

  const submitEntries = (entries) => {
    <SubmitEntries entries={entries}/>
  }

  return (
    <div>
      <button onClick={addEntry}>Add Entry</button>
      {entries.map(entry => (<Entry key={entry.id} onRemove={() => removeEntry(entry.id)} />))}
      <button onClick={submitEntries(entries)}>Submit</button>
    </div>
  );
}

function Entry({ onRemove }){
  const [courseName, setCourseName] = useState()
  const [grade, setGrade] = useState('')

  const handleCourseName = (event) => {
    setCourseName(event.target.value)
  }
  const handleGrade = (event) => {
    setGrade(event.target.value)
  }

  return (
    <div>
      <input type="text" name="course" value={courseName} onChange={handleCourseName}/>
      <input type="grade" name="grade" value={grade} onChange={handleGrade}/>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
}

function SubmitEntries(entries: Array<Entry>){
  let numEntry = entries.length
  let totalGPA = 0
  for (let entryID in entries){
    let entry = Entry[entryID]
    let result: number;
    if (Number.isNaN(entry.grade)){
      result = gpa_mapping[entry.grade]
    }else{
      result = Number(entry.grade)
    }
    totalGPA += result
  }
  return (
    <div>
      <p>Your GPA is {totalGPA/numEntry}</p>
    </div>
  );
}
  
export default MyEntries;