import {io} from "socket.io-client";

const socket = io('http://localhost:3000/');
socket.on('connect', () => {
console.log(`Client socket ${socket.id}`)
});

function App() {

  return (
    <div>
      app

    </div>
  )
}

export default App
