import React from 'react'

export default function Grade({showGrade, grade}){
    if (showGrade){
        return (
            <div class="grades-container">
                <h2>Your cGPA is:</h2>
                <p class="grade">{grade.four_scale} based on the 4.0 scale</p>
                <p class="grade">{grade.twelve_scale} based on the 12.0 scale</p>
            </div>
        )
    }else{
        return
    }
}