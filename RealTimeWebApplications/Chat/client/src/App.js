import React, { useState, useEffect } from "react"
import io from "socket.io-client"
import Input from "./Input"
const socket = io("http://localhost:3000")

export default function App() {

  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [isLoggedIn, setLogged] = useState(false)


  useEffect(() => {
    socket.on('message', data => {
      setMessages(m => [...m, data])
    })
    socket.on('user', users => {
      setUsers(u => [...u, users])
    })
  }, [])

  useEffect(() =>{
    socket.on('disconnect', users => {
      setUsers(users)
      socket.emit('message', 'disappeared')
    })
  },[])


  const send = (message) => {
    socket.emit('message', message)
  }

  const login = (users) => {
    socket.emit('login', users)
    setLogged(true)
    socket.emit('message', ' just logged')
  }

  if (isLoggedIn) {
    return (
      <div>
        <h2>Active users</h2>
        <ul>
          {users.map( u => <li>{u}</li>)}
        </ul>
        <h2>Messages</h2>
        <ul>
          {messages.map(m => <li>{m.user} {m.message}</li>)}
          <Input send={send} />
        </ul>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Enter username to log in</h2>
        <Input send={login}/>
      </div>
    )
  }
}