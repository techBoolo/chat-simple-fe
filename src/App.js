import { useEffect, useState } from 'react'
import io from 'socket.io-client'
const socketio_server = process.env.REACT_APP_SOCKETIO_SERVER_URL
const socket = io(socketio_server)

const App = () => {
  const [ isConnected, setIsConnected ] = useState(socket.connected)
  const [ clientCount, setClientCount ] = useState(0)

  useEffect(() => {

    socket.on('connect', () => {
      setIsConnected(true)
    })
    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('new connection', params => {
      setClientCount(params.count)
    })
    socket.on('client left', ({ count }) => {
      setClientCount(count)
    })

    // registered listeners must be cleanedup, to prevent multiple event listener
    // registration, on the next rendering
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('new connection')
      socket.off('client left')
    }
  }, [])

  return (
    <div>
      <p>Client count: { clientCount }</p>
    </div>
  );
}

export default App;
