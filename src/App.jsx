import { useState, useEffect } from "react";
import "./styles/App.css";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const host = "http://assets.breatheco.de/apis/fake/todos/user/"
  const user = "ManuelPerez"
  const url = host + user

  async function getTodos() {
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json();
      console.log("Obteniendo data")
      setTodos(data)
      setIsActive(true)
    } else {
    } 
  }

  async function putTodos(data) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/ManuelPerez",
      options
    );
    if(data.legth < 1){
      deleteTodos()
    }
    if (response.ok) {
      const dataJSON = await response.json();
      getTodos();
      console.log("PUT success");
    } else {
      console.log("no fue posible realizar el PUT");
    }
  }

  async function createTodos() {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([]),
    };
    const response = await fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/ManuelPerez",
      options
    );
    if (response.ok) {
      const dataJSON = await response.json();
      console.log("Se crea usuario");
      await getTodos();
      setIsActive(true);
    } else {
      console.log("No se pudo crear usuario")
      setIsActive(false)
    }
  }

  async function deleteTodos() {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/ManuelPerez",options);
    if (response.ok) {
      const dataJSON = await response.json();
      console.log("Se elimino usuario");
      setIsActive(false);

    }
  }

  function handleKeyDown(event) {
    if (input === "") {
      return null;
    } else if (event.key === "Enter") {
      console.log(input, event.key);
      const arrTodos = [...todos];
      arrTodos.push({ label: input, done: false });
      putTodos(arrTodos);
      setInput("")
    }
  }

  async function deleteElement(task,index) {
    const newTodos = todos.filter((task, currentIndex) => index != currentIndex)
    console.log(newTodos)
    if (newTodos.length === 1 ){
      putTodos(newTodos)
    } else {
      deleteTodos()
    }
  }

  useEffect(() => {
    getTodos();
  },[]);

  return (
    <div className="App">
      <h1>My <em className="todo">Todo</em> List</h1>
      {isActive ? (
        <>
          <input
            autoFocus
            className="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <ul>
            {todos.map((item,index) => (
              <li key={index}>
                {item.label}
              <i 
              className="x fa-solid fa-x"
              onClick={()=> deleteElement(item,index)}
                >
              </i>
              </li>
            ))}
          </ul>
          <button type="button" onClick={isActive ? deleteTodos : createTodos}>
            Delete Todo
          </button>
        </>
      ) : (
        <>
          <button type="button" onClick={isActive ? deleteTodos : createTodos}>
            Create Todo
          </button>
        </>
      )}
    </div>
  );
}

export default App;
