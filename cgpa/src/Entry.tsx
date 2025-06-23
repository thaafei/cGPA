import React from "react";
export default function Entry({id, course, grade, credit, updateCourse, updateGrade, updateCredit, onRemove}) {
    return (
        <div className="p-3 border rounded">
            <input
                type="text"
                placeholder="Course Name"
                className=""
                value={course}
                onChange={(e) => updateCourse(id, e.target.value)}
            />
            <input
                type="text"
                placeholder="Grade"
                className=""
                value={grade}
                onChange={(e) => updateGrade(id, e.target.value)}
            />
            <input
                type="text"
                placeholder="Credit"
                className=""
                value={credit}
                onChange={(e) => updateCredit(id, e.target.value)}
            />
            <button className="" onClick={() => onRemove(id)}>X</button>
        </div>
    )
}