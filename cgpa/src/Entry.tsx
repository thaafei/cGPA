import React from "react";
interface EntryProp {
    id: number,
    course: string
    grade: string
    updateCourse: (key: number, value: string) => void
    updateGrade: (key: number, value: string) => void
    onRemove: (key: number) => void
}
export default function Entry({id, course, grade, updateCourse, updateGrade, onRemove}): EntryProp {
    return (
        <div className="p-3 border rounded">
            <input
                type="text"
                placeholder="Course Name"
                value={course}
                onChange={(e) => updateCourse(id, e.target.value)}
            />
            <input
                type="text"
                placeholder="Grade"
                value={grade}
                onChange={(e) => updateGrade(id, e.target.value)}
            />
            <button onClick={() => onRemove(id)}>Remove</button>
        </div>
    )
}