import { MouseEvent, ChangeEvent, useState, useEffect } from "react";
import "./App.css";

function App() {
  const localActivitiesList = localStorage.getItem("activities");
  const [activity, setActivity] = useState('');
  const activitiesListInitialValue: string[] = []
  const [activitiesList, setActivitiesList] = useState(() => 
    localActivitiesList ? JSON.parse(localActivitiesList) : activitiesListInitialValue
  );

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activitiesList));
  }, [activitiesList])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setActivity(event.target.value)
  }

  const createTask = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActivitiesList([...activitiesList, activity])
  }

  return (
    <>
      <h1>To do List</h1> 
      <form className="form">
        <div className="input">
          <label htmlFor="activity">Atividade</label>
          <input type="text" id="activity" value={activity} onChange={handleChange} placeholder="Atividade" className="text-input"/> 
        </div>
        <button onClick={createTask} className="form-btn">Create task</button> 
      </form>

      <ul>
        {activitiesList && activitiesList.map((activity: string )=> {
          return <li>{activity}</li>
        })}
      </ul>
    </>
  )
}

export default App;
