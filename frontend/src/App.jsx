import { useState } from "react";

import {MdOutlineDone, MdOutlineMobileFriendly} from "react-icons/md";
import {IoClose} from "react-icons/io5";
import { MdModeEditOutline} from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { IoClipboardOutline } from "react-icons/io5";
import axios from "axios";
import { useEffect } from "react";
function App() {
  const [newTodo,setNewTodo] =useState("")
  const [todos,setTodos]=useState([])
  const [editingTodo,setEditingTodo] =useState(null)
  const [editedText,setEditText]=useState("")
  const addTodo = async(e)=>{
    e.preventDefault();
    if(!newTodo.trim()) return;
    try{
      const response = await axios.post("/api/todos",{text:newTodo})
      setTodos([...todos,response.data])
      setNewTodo("")
    }
    catch(error)
    {
      console.log("error loading task :",error)
    }
  }
  const fetchTodos = async ()=>
  {
    try{
      const response=await axios.get("/api/todos")
      setTodos(response.data)

    }catch(error)
    {
        console.log("error in  fetching",error)
    }
  }
  useEffect(()=>
  {
    fetchTodos();
  },[])
  const startEditing=(Todo)=>
  {
    setEditingTodo(Todo._id)
    setEditText(Todo.text)
  }
    const saveEdit = async (id) => {
    try {
      const response = await axios.patch(`/api/todos/${id}`, {
        text: editedText,
      });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setEditingTodo(null);
    } catch (error) {
      console.log("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      const response = await axios.patch(`/api/todos/${id}`, {
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      console.log("Error toggline todo:", error);
    }
  };
  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100
  flex items-center justify-center p-4 ">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
      <h2 className="text-4xl font-bold text-gray-700 mb-8 text-center">Task Manager</h2>
      <form onSubmit={addTodo} className=" flex items-center gap-2 shadow-sm border border-gray-200
       p-2 rounded-2xl">
        <input className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400" 
        type="text" placeholder="Write your task here" required
        value={newTodo} onChange={(e) => setNewTodo(e.target.value)}></input>
       <button type="submit" className="bg-blue-500 hover:bg-blue-200
       text-amber-50 px-4 py-2 rounded-3xl font-medium cursor-pointer">
        Add
      </button>
      </form>
     <div className="mt-4">
      {
        todos.length ===0 ?(
          <div></div>
        ):
        (
          <div className="flex flex-col gap-4">
            {todos.map((Todo)=>(
              <div key={Todo._id}>
                {editingTodo===Todo._id ?
                (<div className=" flex items-center gap-x-3">
                  <input className="text-gray-800 shadow-inner flex-1 p-3 border border-gray-200 outline-none rounded-2xl focus:ring-1 focus:ring-blue-300" type="text" value={editedText} onChange={(e)=>
                    setEditText(e.target.value)
                  }></input>
               <div className="flex  gap-x-2">
                   <button className="px-3 py-2 bg-green-600 rounded-xl hover:bg-green-400" onClick={() => saveEdit(Todo._id)}
><MdOutlineDone/></button>
                  <button className="px-3 py-2 bg-red-600 rounded-xl hover:bg-red-400" onClick={()=> setEditingTodo(null)}><IoClose/></button>
               </div>
                </div>):
                <div>
                
                  <div className="flex items-center justify-between overflow-hidden">
                      <div className="flex  gap-x-4">
                    <button onClick={() => toggleTodo(Todo._id)} className={`flex-shrink-0 h-6 w-6 border border-gray-500 rounded-full flex items-center justify-center ${Todo.completed ? ("border-green-400 bg-green-300"):("border-blue-300 hover:bg-blue-200")}    `} >
                      {Todo.completed && <MdOutlineDone/>}
                    </button>
                     <span className="text-gray-900 font-medium truncate"> {Todo.text}</span>
                  </div>
                    <div className="flex  gap-x-2">
                      <button className="p-2 text-blue-500 hover:text-blue-300 rounded-xl hover:bg-blue-50 duration-200" onClick={()=> startEditing(Todo)}>
                      <MdModeEditOutline/>
                    </button>
                    <button onClick={() => deleteTodo(Todo._id)}  className="p-2 text-gray-500 hover:text-gray-300 rounded-xl hover:bg-gray-50 duration-200">
                      <FaTrash/>
                    </button>
                    </div>
                  </div>
                  </div>}
              </div>
            ))}
          </div>
        )
        
      }
     </div>
      </div>
  </div>
  )
}

export default App
