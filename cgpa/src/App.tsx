import React from "react";
import EntryContainer from "./EntryContainer.tsx"
import Header from "./Header.tsx"
import Footer from "./Footer.tsx"
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="text-center" style={{ 
      height: "100%",
      overflowY: "hidden",
      overflowX: "auto"
    }}>
      <Header />
      <EntryContainer />
      <Footer />
    </div>
  );
}

export default App;