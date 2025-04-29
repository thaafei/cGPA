import Entry from "./Entry.js"


const gpa_mapping = {
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
  "D-": 1
}

function App() {
  function search(formData) {
    const course = formData.get("course");
    const grade = formData.get("grade");
    const gpa = gpa_mapping[grade]
    const gpa_four_point = gpa/3
    alert(`Your grade for ${course} is ${gpa_mapping[grade]}, which is gpa: ${gpa_four_point.toFixed(1)}`);
  }

  return (
    <form action={search}>
      <Entry />
      <button type="submit">Search</button>
    </form>
  );
}

export default App;
