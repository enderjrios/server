import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import './App.css'
const socket = io('http://localhost:4000')

function App() {
  const [messages, setMessages]= useState([])
  const [message, setMessage]= useState("")

  useEffect(()=>{
    const reciveMessage = (message)=>{
      setMessages([message, ...messages])
    }
    socket.on('message', reciveMessage)
    return ()=>{
      socket.off("message", reciveMessage)
    }
  },[messages])

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages([newMessage, ...messages]);
    setMessage("");
    socket.emit("message", newMessage.body);
  };
  
 

  return (
    <div className="container mt-5">
      <div className="row justify-content-md-center">
      <div className="card"  style={{width: "18rem"}}>
        
        <div className="card-body">
        <form onSubmit={handleSubmit} className="form-group">
        <h1 className="title">Chat React</h1>
        <input
          name="message"
          type="text"
          placeholder="Write your message..."
          onChange={(e) => setMessage(e.target.value)}
          className="from-group"
          value={message}
          autoFocus
        />

        <ul className="list-group">
          {messages.map((message, index) => (
            <li
              key={index}
              className={`list-group-item ${
                message.from === "Me" ? "list-group-item list-group-item-primary" : "list-group-item list-group-item-warning"
              }`}
            >
              <b>{message.from}</b>:{message.body}
            </li>
          ))}
        </ul>
      </form>
        </div>
      </div>
      
    </div>
    </div>
    
  )
}

export default App
