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
  courseName: string;
  grade: string;
}

function MyEntries() {
  const [entries, setEntry] = useState([]);

  const addEntry = () => {
    setEntry([...entries, { id: Date.now() }]);
  };

  const removeEntry = (id) => {
    setEntry(entries.filter(entries => entries.id !== id));
  };

  const submitEntries = () => {
    let sum; 
    entries.forEach((entry, index, arr) => {
      console.log(entry)
    })
  };

  return (
    <div>
      <button onClick={addEntry}>Add Entry</button>
      {entries.map(entry => (
        <NewEntry key={entry.id} onRemove={() => removeEntry(entry.id)} />
      ))}
      <button onClick={submitEntries}>Submit</button>
    </div>
  );
}

function NewEntry({ onRemove }) {
  const [courseName, setCourseName] = useState('')
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
      <p>{courseName}</p>
      <p>{grade}</p>
    </div>
  );
}
  
  
export default MyEntries;