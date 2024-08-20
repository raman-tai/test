import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [data,setData] = useState([]);
  const [id,setId] = useState(0);
  const [name,setName] = useState("");
  const [age,setAge] = useState(0);
  const [job,setJob] = useState("");
  const [score,setScore] = useState(0);
  const [isUpdate,setIsUpdate] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [minScoreFilter, setMinScoreFilter] = useState("");
  const [maxScoreFilter, setMaxScoreFilter] = useState("");
  

  useEffect(() => {
    setData(StudentData)
  },[]);

  const StudentData = [

  ]
  const handleEdit = (id) => {
    const dt = data.filter(item => item.id === id);
    if(dt !== undefined) {
      setIsUpdate(true);
      setId(id);
      setName(dt[0].name);
      setAge(dt[0].age);
      setJob(dt[0].job);
      setScore(dt[0].score);
    }
  }

  const handleDelete = (id) => {
    if(id>0) {
      if(window.confirm("Are you sure to delete this item?")) {
        const dt = data.filter(item => item.id !== id);
        setData(dt);
      }
    }
  }

  const handleSave = (e) => {
    let error ='';
    if(name === '')
    error += " Name is required ,"
    if(age <= 0)
    error += " Age is required ,"
    if(job === '')
    error += " Job is required ,"
    if(score <=0)
    error += " Score is required ."

    if(error) {
      alert(error);
      return;
    }
      e.preventDefault();
      const dt = [...data];
      const newObject = {
        id:StudentData.length+1,
        name:name,
        age:age,
        job:job,
        score:score
      }
      dt.push(newObject);
      setData(dt);
      handleClear();
  }

  const handleUpdate = () => {
    const index = data.map((item) => {
      return item.id
    }).indexOf(id);

    const dt =[...data];
    dt[index].name=name;
    dt[index].age=age;
    dt[index].job=job;
    dt[index].score=score;

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
  return (
    <div className="App">
      <div style={{display: 'flex', justifyContent:'center'}}>
        <label>Name :
        <input type='text' placeholder='Enter Students Name' onChange={(e) => setName(e.target.value)} value={name}/>
        </label>
      </div>
      <div style={{display: 'flex', justifyContent:'center'}}>
        <label>Age :
        <input type='number' placeholder='Enter Students Age' onChange={(e) => setAge(parseInt(e.target.value))} value={age} />
        </label>
      </div>
      <div style={{display: 'flex', justifyContent:'center'}}>
        <label>Job :
        <input type='text' placeholder='Enter Students Job' onChange={(e) => setJob(e.target.value)} value={job}/>
        </label>
      </div>
      <div style={{display: 'flex', justifyContent:'center'}}>
        <label>Score :
        <input type='number' placeholder='Enter Students Score' onChange={(e) => setScore(parseInt(e.target.value))} value={score} />
        </label>
      </div>
      {
        !isUpdate ? <button onClick={(e) => handleSave(e)}>Save</button> : 
        <button onClick={() => handleUpdate()}>Update</button>
      }
      <button onClick={() => handleClear()}>Clear</button>
      <div style = {{display: "flex", justifyContent: "center"}}>
        <label>Filter the name : 
          <input type='text' placeholder='Write name to filter' onChange={(e) => setNameFilter(e.target.value)} value={nameFilter} />
        </label>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <label>Minimum score filter:
          <input type='number' placeholder='Enter minimum score' onChange={(e) => setMinScoreFilter(e.target.value)} value={minScoreFilter}/>
        </label>
        <label>Maximum score filter:
          <input type='number' placeholder='Enter maximum score' onChange={(e) => setMaxScoreFilter(e.target.value)} value={maxScoreFilter}/>
        </label>
      </div>
    </div>
    <div>
      </div>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>age</td>
            <td>job</td>
            <td>score</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {
             filteredData.map((item, index) => (
                <tr key = {index}>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.job}</td>
                  <td>{item.score}</td>
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
  );
}

export default App;
