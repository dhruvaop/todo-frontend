import ToDo from "./components/ToDo";
import { deleteToDo, updateToDo, addToDo, getAllToDo } from "./utils/HandleApi";
import { useEffect, useState } from 'react';

function App() {

  const [toDo, setToDo] = useState([])
  const [text, setText] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [toDoId, setToDoId] = useState("")

  useEffect(() => {
    getAllToDo(setToDo)
  }, [])

  const updateMode = (_id, text) => {
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)
  }

  return (
    <div className="App">
      

      <div className = "container">
        <h1>To-Do App</h1>

        <div className="top">
          <input 
            type="text" 
            placeholder="Add ToDo..."
            value={text}
            onChange={(e)=>setText(e.target.value)}
          />

            {/* <div className="top">
            <input type="text" placeholder="Add ToDo..."/>
            </div> */}

            {/*The above commented portion is basically providing the text box one-after the other */}

            <div 
            className="add" 
            onClick={isUpdating ? 
              () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating) 
              : () => addToDo(text, setText, setToDo)}>
              {isUpdating ? "Update" : "Add"}
            </div>

        </div>

        <div className="list">

          {toDo.map((item) => <ToDo 
          key={item._id} 
          text={item.text}
          updateMode = {() => updateMode(item._id, item.text)}  
          deleteToDo = {() => deleteToDo(item._id, setToDo)} />)}

        </div>

      </div>

    </div>
    
  );
}

export default App;
