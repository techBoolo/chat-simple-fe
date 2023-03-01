import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'
import { setClientCount, addPublicConversation } from './redux/reducers/chatSlice.js'
import Header from './components/Header/'
import Footer from './components/Footer/'
import ChatForm from './components/ChatForm/'
import Info from './components/Info/'
import ScrollToBottom from './components/ScrollToBottom/'
import PublicConversation from './components/PublicConversation/'

import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
const socketio_server = process.env.REACT_APP_SOCKETIO_SERVER_URL
const socket = io(socketio_server)

const App = () => {
  const [ isConnected, setIsConnected ] = useState(socket.connected)
  const { toPublic } = useSelector(state => state.chat)
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    })
    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('new connection', params => {
      dispatch(setClientCount(params.count))
    })
    socket.on('client left', ({ count }) => {
      dispatch(setClientCount(count))
    })
    socket.on('public-message-received', (data) => {
      data = { ...data, own: false }
      dispatch(addPublicConversation(data))
    })

    // registered listeners must be cleanedup, to prevent multiple event listener
    // registration, on the next rendering
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('new connection')
      socket.off('client left')
      socket.off('public-message-received')
    }
  }, [])


  return (
    <>
    <CssBaseline />
    <Container maxWidth='xs' sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Info />
      <Box sx={{ flex: 1, overflowY: 'scroll', border: '1px solid #ccc', pb: '1rem'  }}>
        { toPublic ? (
            <PublicConversation />
          ):(
            <></>
          ) 
        }
        <ScrollToBottom />
      </Box>
      <ChatForm socket={socket} />
      <Footer />
    </Container>
    </>
  );
}

export default App;
