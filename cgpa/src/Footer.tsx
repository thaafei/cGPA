import React from 'react'

export default function Footer() {
    return (
        <div className="container-fluid" style={{
            height: "8vh",
            backgroundColor: "rgb(122, 0, 60)",
        }}>
            <footer className="d-flex flex-wrap justify-content-between align-items-center my-3">
                <div className="col-md-4 d-flex align-items-center">
                    <span style={{ color: "#FFFFFF" }}>
                        Built For Fun by © Thaafei
                    </span>
                </div>
                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li className="ms-3">
                        <a className="text-body-secondary" href="https://www.linkedin.com/in/feixie03/" aria-label="LinkedIn" target="_blank">
                            <img src="/linkedin-app-white-icon.svg" alt="LinkedIn Icon"></img>
                        </a>
                    </li>
                </ul>
            </footer>
        </div>
    )
}