import React, { useState } from 'react';
import Entry from "./Entry.tsx"
interface EntryData {
    key: number
    id: number
    course: string
    grade: string
}
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
export default function EntryContainer() {
    const [index, updateIndex] = useState(0);
    const [entries, editEntries] = useState<EntryData[]>([]);
    const [result, setResult] = useState<number | null>(null);

    function newEntry() {
        editEntries([...entries, {key: index, id: index, course: "", grade: ""}])
        updateIndex(index + 1)
    }
    

    const submitEntries = () => {
        const total = entries.reduce(
            (sum, entry) => {
                let gradeValue = gradeMap[entry.grade]
                return sum + gradeValue
            }, 0);
        setResult(total);
      };

    const updateCourse = (id: number, value: string) => {
        editEntries(
            entries.map((entry) =>
            entry.id === id ? { ...entry, course: value } : entry
            )
        );
    };

    const updateGrade = (id: number, value: string) => {
        editEntries(
            entries.map((entry) =>
            entry.id === id ? { ...entry, grade: value } : entry
            )
        );
    };

    const removeEntry = (id: number) => {
        editEntries(entries.filter((entry) => entry.id !== id));
      };

    return (
        <>
            <ul>
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
            </ul>
            <button onClick={newEntry}>Add New Entry</button>
            <button onClick={submitEntries}>Submit</button>
            {result !== null && (
                <div>
                <h3>Total Grade Sum: {Math.round(result/entries.length)}</h3>
                </div>
            )}
        </>
    )
}