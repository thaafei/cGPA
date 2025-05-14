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

    function newEntry() {
        setShowGrade(false)
        editEntries([...entries, {key: index, id: index, course: "", grade: ""}])
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
        <div class="container-fluid d-flex flex-column" style={{
            height: '100vh',
            overflowY: 'auto'
        }}>  
            <div class="row">
                <div class="col-md">
                    {entries.map(entry => (
                        <Entry
                            key={entry.id}
                            id={entry.id}
                            course={entry.course}
                            grade={entry.grade}
                            updateCourse={updateCourse}
                            updateGrade={updateGrade}
                            onRemove={removeEntry}/>
                        ))
                    }
                </div>
                <div class="col-md">
                    <button class="new-btn" onClick={newEntry}>New Class</button>
                    <button class="submit-btn" onClick={calculateGrades}>Submit</button>
                    <UploadForm/>
                    <Grade showGrade={showGrade} grade={grade}/>
                </div>
            </div>
        </div>
    )
}