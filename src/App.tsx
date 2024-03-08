import Form from "./components/Form/Form";
import TaskList from "./components/TaskList/TaskList";
import "./index.css";

function App() {

  return (
    <>
      <h1>To do List</h1> 
      <Form
        type="create" 
        formClassName="form" 
        htmlFor="task"
        label="Tarefa"
        formId="task"
      />
      <TaskList/>
    </>
  )
}

export default App;
