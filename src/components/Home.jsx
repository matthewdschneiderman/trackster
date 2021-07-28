import React, {useEffect, useState} from 'react'
import Modal from 'react-modal';
import axios from 'axios'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

const Home = () => {

  var subtitle;
  
  const [modalIsOpen, setIsOpen] = useState(false);
  const [toDoTasks, setToDoTasks] = useState([]);
  const [goal, setGoal] = useState("");
  const [days, setDays] = useState(1);
  // let [compDays, setCompDays] = useState(0);
  
  function openModal() {
    setIsOpen(true);
  }
  
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00ff';
  }
  
  function closeModal(){
    setIsOpen(false);
  }
  
  const goalInput = (e) => {
    setGoal(e.target.value)
  }
  
  const dayInput = (e) => {
    setDays(e.target.value)
  }
  ///////////////////Modal////////////////////////
  
  useEffect(() => {
    getGoals();
  }, [])
  
  
  
  const getGoals = () => {
    axios.get('/goals').then(({data}) => {
      setToDoTasks(data)
    }).catch((err) => {
      console.error(err)
    })
  }


  
  const addToDo = (e) => {
    e.preventDefault();
    let newGoal = {
      goal,
      days,
      compDays: 0,
    }
    axios.post('/goals', newGoal).then(() => {
      getGoals();
    }).catch((err) => {
      console.error(err)
    })

    closeModal()
  }
  

  
  // const goalCompleted = () => {
  //   setCompDays(compDays += 1)
  // }

  const goalCompleted = (updateObj) => {
    axios.put('/goals', ({goalUpdates: updateObj})).then((compDay) => {
      console.log("compDay", compDay)
      // setCompDays(compDay)
      getGoals();
    }).catch((err) => {
      console.error(err)
    })
  }

  const deleteGoal = (idx) => {
    axios.delete(`/goals?idx=${idx}`).then(() => {
      console.log('deleted!!')
    }).catch((err) => {
      console.error(err)
    })
    getGoals()
  }

  return (
    <div>
      <h3>Welcome to your Trackster Page</h3>
      <button onClick={openModal}>+</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <button onClick={closeModal}>close</button>
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Create a Habit</h2>
          <form onSubmit={addToDo}>
            <label htmlFor="goal">What is your goal:</label>
            <input id="goal" name="goal" placeholder="Goal..." onChange={goalInput}/>
            <label htmlFor="days">How many days/week</label>
            <select id="days" name="days" onChange={dayInput}>
              <option value={1}>1 Day</option>
              <option value={2}>2 Days</option>
              <option value={3}>3 Days</option>
              <option value={4}>4 Days</option>
              <option value={5}>5 Days</option>
              <option value={6}>6 Days</option>
              <option value={7}>7 Days</option>
            </select>
            <input type="submit" />
          </form>
        </Modal>
      {/* <button onClick={addToDo}>+</button> */}
      <div>{toDoTasks.map((task, idx) => 
        <div key={idx}>
          <button onClick={() => deleteGoal(task._id)}>X</button>
          <div>{task.goal}</div>
          <div>{task.compDays}/{task.days}</div>
          { task.compDays < task.days ?
          <span>
          <button onClick={() => goalCompleted({id: task._id, currGoalNum: task.compDays, increase: false})}>Decrease Counter</button>
          <button onClick={() => goalCompleted({id: task._id, currGoalNum: task.compDays, increase: true})}>Increase Counter</button> 
          </span> :
          <div>
            <button onClick={() => goalCompleted({id: task._id, currGoalNum: task.compDays, increase: false})}>Decrease Counter</button>
            <div>Goal Completed!!!!!!!!!</div>
          </div>
          }
      </div>
        )}
    </div>
  </div>
  )
}

export default Home
