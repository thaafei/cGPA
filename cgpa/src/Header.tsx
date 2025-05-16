import React from 'react'

export default function Header(){
    return (
        <div className="container-fluid" style={{
            height: "10vh",
            backgroundColor: "#7A003C"
        }}>
            <h1 className="display-4 fw-bold mb-1" style={{ 
                color: "#FFFFFF"
            }}
            >cGPA Grade Calculator</h1>
        </div>
    )
}