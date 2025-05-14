import React from "react";
import EntryContainer from "./EntryContainer.tsx"
import Header from "./Header.tsx"
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div class="text-center">
      <Header />
      <EntryContainer />
    </div>
  );
}

export default App;