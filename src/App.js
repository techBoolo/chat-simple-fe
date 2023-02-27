import io from 'socket.io-client'
const socketio_server = process.env.REACT_APP_SOCKETIO_SERVER_URL
const socket = io(socketio_server)

const App = () => {
  return (
    <div>
      hello
    </div>
  );
}

export default App;
