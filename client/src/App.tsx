import { FormEvent, useEffect, useState } from "react";
import {io, Socket} from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents, MessageEvent} from '../../typings'
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:3000/');

function App() {

  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false)
  const [room, setRoom] = useState("");
  const [msg, setMsg] = useState("");

  const [messages, setMessages] = useState<MessageEvent[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(msg + ' '+ room + ' '+ username);
    socket.emit("clientMsg", { msg, room, username});
    setMsg('');
    setRoom('');
  }

  const handleUsernameSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsUsernameSet(true)  
  }
  useEffect(() => {
    socket.on("serverMsg", (data: MessageEvent) => {
      setMessages([...messages, data])
    })
  }, [socket, messages])

  return (
    <>
    {isUsernameSet ? (<>
      <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter room key" value={room} onChange={e => setRoom(e.target.value)}/>
        <input type="text" placeholder="Enter message" value={msg} onChange={e => setMsg(e.target.value)}/>
    <button>Send message</button>
      </form>

    </div>
    <div>
      <h1>Messages</h1>
      {messages.map((msgEv: MessageEvent, i) => (
        <p key={i}>[ROOM {msgEv.room}][USER {msgEv.username}] says: {msgEv.msg}</p>
      ))}
    </div>
    </>) : ( 
    <div>
      <form onSubmit={handleUsernameSubmit}>
      <input type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)}/>
      <button >Save username</button>
      </form>
    </div>
    )}
  </>
  );
}

export default App
