import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [job, setJob] = useState("");
  const [score, setScore] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [minScoreFilter, setMinScoreFilter] = useState("");
  const [maxScoreFilter, setMaxScoreFilter] = useState("");

  useEffect(() => {
    setData(StudentData);
  }, []);

  const StudentData = [];

  const handleEdit = (id) => {
    const dt = data.find(item => item.id === id);
    if (dt) {
      setIsUpdate(true);
      setId(id);
      setName(dt.name);
      setAge(dt.age);
      setJob(dt.job);
      setScore(dt.score);
    }
  }

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to delete this item?")) {
        const dt = data.filter(item => item.id !== id);
        setData(dt);
      }
    }
  }

  const handleSave = (e) => {
    let error = '';
    if (name === '') error += " Name is required, ";
    if (age <= 0) error += " Age is required, ";
    if (job === '') error += " Job is required, ";
    if (score <= 0) error += " Score is required.";

    if (error) {
      alert(error);
      return;
    }
    e.preventDefault();
    const dt = [...data];
    const newObject = {
      id: data.length + 1,
      name: name,
      age: age,
      job: job,
      score: score
    }
    dt.push(newObject);
    setData(dt);
    handleClear();
  }

  const handleUpdate = () => {
    const dt = data.map(item => 
      item.id === id ? { ...item, name, age, job, score } : item
    );
    setData(dt);
    handleClear();
  }

  const handleClear = () => {
    setId(0);
    setName("");
    setAge(0);
    setJob("");
    setScore(0);
    setIsUpdate(false);
  }

  const filteredData = data.filter(item => {
    const matchName = item.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchScore = (minScoreFilter === "" || item.score >= parseInt(minScoreFilter)) &&
      (maxScoreFilter === "" || item.score <= parseFloat(maxScoreFilter));
    return matchName && matchScore;
  });

  const handleFieldChange = (id, field, value) => {
    const dt = data.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setData(dt);
  }

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <label>Name:
          <input type='text' placeholder='Enter Students Name' onChange={(e) => setName(e.target.value)} value={name} />
        </label>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <label>Age:
          <input type='number' placeholder='Enter Students Age' onChange={(e) => setAge(parseInt(e.target.value))} value={age} />
        </label>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <label>Job:
          <input type='text' placeholder='Enter Students Job' onChange={(e) => setJob(e.target.value)} value={job} />
        </label>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <label>Score:
          <input type='number' placeholder='Enter Students Score' onChange={(e) => setScore(parseInt(e.target.value))} value={score} />
        </label>
      </div>
      {
        !isUpdate ? <button onClick={(e) => handleSave(e)}>Save</button> :
          <button onClick={() => handleUpdate()}>Update</button>
      }
      <button onClick={() => handleClear()}>Clear</button>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <label>Filter the name:
          <input type='text' placeholder='Write name to filter' onChange={(e) => setNameFilter(e.target.value)} value={nameFilter} />
        </label>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <label>Minimum score filter:
            <input type='number' placeholder='Enter minimum score' onChange={(e) => setMinScoreFilter(e.target.value)} value={minScoreFilter} />
          </label>
          <label>Maximum score filter:
            <input type='number' placeholder='Enter maximum score' onChange={(e) => setMaxScoreFilter(e.target.value)} value={maxScoreFilter} />
          </label>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Age</td>
              <td>Job</td>
              <td>Score</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {
              filteredData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input
                      type='text'
                      value={item.name}
                      onChange={(e) => handleFieldChange(item.id, 'name', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      value={item.age}
                      onChange={(e) => handleFieldChange(item.id, 'age', parseInt(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      value={item.job}
                      onChange={(e) => handleFieldChange(item.id, 'job', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      value={item.score}
                      onChange={(e) => handleFieldChange(item.id, 'score', parseInt(e.target.value))}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleEdit(item.id)}>Edit</button>&nbsp;
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
