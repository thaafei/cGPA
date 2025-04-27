import { useState } from 'react';

function App() {
  const [transcript, setTranscript] = useState('');
  const [cGPA, setCGPA] = useState(null);

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:8081/parse-transcript', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcriptText: transcript }),
    });
    const data = await response.json();
    setCGPA(data.cGPA);
  };

  return (
    <div style={{ padding: 20 }}>
      <textarea
        placeholder="Paste your transcript here"
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        style={{ width: '100%', height: 200 }}
      />
      <br />
      <button onClick={handleSubmit}>Calculate cGPA</button>
      {cGPA && <h2>Your cGPA is: {cGPA}</h2>}
    </div>
  );
}

export default App;
