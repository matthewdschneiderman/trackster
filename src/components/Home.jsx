import React, {useState} from 'react'

const Home = () => {

  const [toDoTasks, setToDoTasks] = useState([]);

  const addToDo = () => {
    setToDoTasks([...toDoTasks, 'Another Task'])
  }

  return (
    <div>
      <h3>Welcome to your Trackster Page</h3>
      <button onClick={addToDo}>+</button>
      <div>{toDoTasks.map((task) => 
        <div>{task}</div>)}
      </div>
    </div>
  )
}

export default Home
