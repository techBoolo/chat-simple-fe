import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Header from './components/Header/'
import Footer from './components/Footer/'
import ChatForm from './components/ChatForm/'

import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
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
    <>
    <CssBaseline />
    <Container maxWidth='xs' sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <p>Client count: { clientCount }</p>
      <p style={{ flex: 1, overflowY: 'scroll'}}> Imperdiet arcu vitae ipsum. Duis dapibus, nisi non porttitor iaculis,
    ligula odio sollicitudin mauris, non luctus nunc massa a velit. Fusce ac
    nisi. Integer volutpat elementum metus. Vivamus luctus ultricies diam.
    Curabitur euismod. Vivamus quam. Nunc ante. Nulla mi nulla, vehicula nec,
    ultrices a, tincidunt vel, enim.

    Suspendisse potenti. Aenean sed velit. Nunc a urna quis turpis imperdiet
    sollicitudin. Mauris aliquam mauris ut tortor. Pellentesque tincidunt
    mattis nibh. In id lectus eu magna vulputate ultrices. Aliquam interdum
    varius enim. Maecenas at mauris. Sed sed nibh. Nam non turpis. Maecenas
    fermentum nibh in est. Pellentesque habitant morbi tristique senectus et
    netus et malesuada.  Porttitor quis, fringilla quis, purus.

    Duis sagittis dignissim eros. In sit amet lectus. Fusce lacinia mauris
    vitae nisl interdum condimentum. Etiam in magna ac nibh ultrices vehicula.
    Maecenas commodo facilisis lectus. Praesent sed mi. Phasellus ipsum. Donec
    quis tellus id lectus faucibus molestie. Praesent vel ligula. Nam venenatis
    neque quis mauris. Proin felis. Cum sociis natoque penatibus et magnis dis
    parturient montes, nascetur ridiculus mus. Aliquam quam. Nam felis velit,
    semper nec, aliquam nec, iaculis vel, mi. Nullam et augue vitae nunc
    tristique vehicula. Suspendisse eget elit. Duis adipiscing dui non quam.

    Duis posuere tortor sit amet est iaculis egestas. Ut at magna. Etiam dui
    nisi, blandit quis, fermentum vitae, auctor vel, sem. Cras et leo.
    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
    cubilia Curae; Proin luctus, odio eu porttitor adipiscing, ante elit
    tristique tortor, sit amet malesuada tortor nisi sit amet neque. Praesent
    rhoncus eros non velit. Pellentesque mattis. Sed sit amet ante. Mauris ac
    nibh eget risus volutpat tempor. Praesent volutpat sollicitudin dui. Sed in
    tellus id urna viverra commodo. Vestibulum enim felis, interdum non,
    sollicitudin in, posuere a, sem. Cras nibh.

    Sed facilisis ultrices dolor. Vestibulum pretium mauris sed turpis.
    Phasellus a pede id odio interdum elementum. Nam urna felis, sodales ut,
    luctus vel, condimentum vitae, est. Vestibulum ut augue. Nunc laoreet
    sapien quis neque semper dictum. Phasellus rhoncus est id turpis.
    Vestibulum in elit at odio pellentesque volutpat. Nam nec tortor.
    Suspendisse porttitor consequat nulla. Morbi suscipit tincidunt nisi. Sed
    laoreet, mauris et tincidunt facilisis, est nisi pellentesque ligula, sit
    amet convallis neque dolor at sapien. Aenean viverra justo ac sem.

    Pellentesque at dolor non lectus sagittis semper. Donec quis mi. Duis eget
    pede. Phasellus arcu tellus, ultricies id, consequat id, lobortis nec,
    diam. Suspendisse sed nunc. Pellentesque id magna. Morbi interdum quam at
    est. Maecenas eleifend mi in urna. Praesent et lectus ac nibh luctus
    viverra. In vel dolor sed nibh sollicitudin tincidunt. Ut consequat nisi
    sit amet nibh. Nunc mi tortor, tristique sit amet, rhoncus porta, malesuada
    elementum, nisi. Integer vitae enim quis risus aliquet gravida. Curabitur
    vel lorem vel erat dapibus lobortis. Donec dignissim tellus at arcu.
    Quisque molestie pulvinar sem.

    Nulla magna neque, ullamcorper tempus, luctus eget, malesuada ut, velit.
    Morbi felis. Praesent in purus at ipsum cursus posuere. Morbi bibendum
    facilisis eros. Phasellus aliquam sapien in erat. Praesent venenatis diam
    dignissim dui. Praesent risus erat, iaculis ac, dapibus sed, imperdiet ac,
    erat. Nullam sed ipsum. Phasellus non dolor. Donec ut elit.

    Sed risus.

    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Vestibulum sem
    lacus, commodo vitae, aliquam ut, posuere eget, dui. Praesent massa dui,
    mattis et, vehicula auctor, iaculis id, diam. Morbi viverra neque sit amet
    risus. Nunc pellentesque aliquam orci. Proin neque elit, mollis vel,
    tristique nec, varius consectetuer, lorem. Nam malesuada ornare nunc. Duis
    turpis turpis, fermentum a, aliquet quis, sodales at, dolor. Duis eget
    velit eget risus fringilla hendrerit. Nulla facilisi. Mauris turpis pede,
    aliquet ac, mattis sed, consequat in, massa. Cum sociis natoque penatibus
    et magnis dis parturient montes, nascetur ridiculus mus. Etiam egestas
    posuere metus. Aliquam erat volutpat. Donec non tortor. Vivamus posuere
    nisi mollis dolor. Quisque porttitor nisi ac elit. Nullam tincidunt ligula
    vitae nulla.

    Vivamus sit amet risus et ipsum viverra malesuada. Duis luctus. Curabitur
    adipiscing metus et felis. Vestibulum tortor. Pellentesque purus. Donec
    pharetra, massa quis malesuada auctor, tortor ipsum lobortis ipsum, eget
    facilisis ante nisi eget lectus. Sed a est. Aliquam nec felis eu sem
    euismod viverra. Suspendisse felis mi, dictum id, convallis ac, mattis non,
    nibh. Donec sagittis quam eu mauris. Phasellus et leo at quam dapibus
    pellentesque. In non lacus. Nullam tristique nunc ut arcu scelerisque
    aliquam. Nullam viverra magna vitae leo. Vestibulum in lacus sit amet
    lectus tempus aliquet. Duis cursus nisl ac orci. Donec non nisl. Mauris
    lacus sapien, congue a, facilisis at, egestas vel, quam. Vestibulum ante
    ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.

    Phasellus ipsum odio, suscipit nec, fringilla at, vehicula quis, tellus.
    Phasellus gravida condimentum dui. Aenean imperdiet arcu vitae ipsum. Duis
    dapibus, nisi non porttitor iaculis, ligula odio sollicitudin mauris, non
    luctus nunc massa a velit. Fusce ac nisi. Integer volutpat elementum metus.
    Vivamus luctus ultricies diam. Curabitur euismod. Vivamus quam. Nunc ante.
    Nulla mi nulla, vehicula nec, ultrices a, tincidunt vel, enim.

    Suspendisse potenti. Aenean sed velit. Nunc a urna quis turpis imperdiet
    sollicitudin. Mauris aliquam mauris ut tortor. Pellentesque tincidunt
    mattis nibh. In id lectus eu magna vulputate ultrices. Aliquam interdum
    varius enim. Maecenas at mauris. Sed sed nibh. Nam non turpis. Maecenas
    fermentum nibh in est. Pellentesque habitant morbi tristique senectus et
    netus et malesuada fames ac turpis egestas.

    Duis sagittis fermentum nunc. Nullam elementum erat. Quisque dapibus, augue
    nec dapibus bibendum, velit enim scelerisque sem, accumsan suscipit lectus
    odio ac justo. Fusce in felis a enim rhoncus placerat. Cras nec eros et mi
    egestas facilisis. In hendrerit tincidunt neque. Maecenas tellus. Fusce
    sollicitudin molestie dui. Sed magna orci, accumsan nec, viverra non,
    pharetra id, dui.

    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam placerat
    mi vitae felis. In porta, quam sit amet sodales elementum, elit dolor
    aliquam elit, a commodo nisi felis nec nibh. Nulla facilisi. Etiam at
    tortor. Vivamus quis sapien nec magna scelerisque lobortis.

    Curabitur tincidunt viverra justo. Cum sociis natoque penatibus et magnis
    dis parturient montes, nascetur ridiculus mus. Sed eros ante, mattis
    ullamcorper, posuere quis, tempor vel, metus. Maecenas cursus cursus lacus.
    Sed risus magna, aliquam sed, suscipit sit amet, porttitor quis, odio.
    Suspendisse cursus justo nec urna. Suspendisse potenti. In hac habitasse
    platea dictumst. Cras quis lacus. Vestibulum rhoncus congue lacus. Vivamus
    euismod, felis quis commodo viverra, dolor elit dictum ante, et mollis eros
    augue at est. Class aptent taciti sociosqu ad litora torquent per conubia
    nostra, per inceptos himenaeos. Nulla lectus sem, tristique sed, semper in,
    hendrerit non, sem. Vivamus dignissim massa in ipsum. Morbi fringilla
    ullamcorper ligula. Nunc turpis. Mauris vitae sapien. Nunc luctus bibendum
    velit.

    Morbi faucibus volutpat sapien. Nam ac mauris at justo adipiscing
    facilisis. Nunc et velit. Donec auctor, nulla id laoreet volutpat, pede
    erat feugiat.
    </p>
      <ChatForm />
      <Footer />
    </Container>
    </>
  );
}

export default App;
