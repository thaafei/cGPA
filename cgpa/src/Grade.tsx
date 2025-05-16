import React from 'react'

export default function Grade({showGrade, grade, className}){
    if (showGrade){
        return (
            <div class={className}>
                <h2>Your cGPA is:</h2>
                <p class="grade">{grade.four_scale} based on the 4.0 scale</p>
                <p class="grade">{grade.twelve_scale} based on the 12.0 scale</p>
            </div>
        )
    }else{
        return (
            <div class={className}>
                <h2>TBD</h2>
                <p>Enter some grades or upload your transcript to see your cGPA!</p>
            </div>
        )
    }
}