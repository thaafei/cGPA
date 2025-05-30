import React, { useState } from 'react';
import axios from 'axios'
import Entry from "./Entry.tsx"
import Grade from "./Grade.tsx"
import UploadForm from './UploadForm.tsx';
import './App.css';

interface EntryData {
    key: number
    id: number
    course: string
    grade: string
}
interface Grade{
    four_scale: number
    twelve_scale: number
}

export default function EntryContainer() {
    const [index, updateIndex] = useState(0);
    const [entries, editEntries] = useState<EntryData[]>([]);
    const [grade, setGrade] = useState<Grade>(null);
    const [showGrade, setShowGrade] = useState(false)

    function newEntry( course: "", grade: "") {
        setShowGrade(false)
        editEntries([...entries, {key: index, id: index, course: course, grade: grade}])
        updateIndex(index + 1)
    }

    const updateCourse = (id: number, value: string) => {
        setShowGrade(false)
        editEntries(
            entries.map((entry) =>
            entry.id === id ? { ...entry, course: value } : entry
            )
        );
    };

    const updateGrade = (id: number, value: string) => {
        setShowGrade(false)
        editEntries(
            entries.map((entry) =>
            entry.id === id ? { ...entry, grade: value } : entry
            )
        );
    };

    const removeEntry = (id: number) => {
        setShowGrade(false)
        editEntries(entries.filter((entry) => entry.id !== id));
      };

    async function calculateGrades(e) {
        e.preventDefault()
        try{
            let response = await axios.post("http://localhost:8081/calculate", {entries})
            setGrade({
                four_scale: response.data.four_scale,
                twelve_scale: response.data.twelve_scale
            })
            setShowGrade(true)
        }catch(error){
            console.log(error)
        }
    }

    return (
  <div className="container-fluid" style={{ height: "82vh" }}>
    <div className="row h-100">
      <div
        className="col-lg-6 entries-input"
        style={{
          height: '100%',
          overflowY: 'auto'
        }}
      >
        {entries.map((entry) => (
          <Entry
            key={entry.id}
            id={entry.id}
            course={entry.course}
            grade={entry.grade}
            updateCourse={updateCourse}
            updateGrade={updateGrade}
            onRemove={removeEntry}
          />
        ))}
      </div>
      <div
        className="col-lg-6 d-flex justify-content-center align-items-center"
        style={{ height: '100%' }}
      >
        <div>
          <Grade showGrade={showGrade} grade={grade} className="container py-5" />
          <button className="new-btn" onClick={newEntry}>
            New Class
          </button>
          <button className="submit-btn" onClick={calculateGrades}>
            Submit
          </button>
          <UploadForm newEntry={newEntry}/>
        </div>
      </div>
    </div>
  </div>
);

}