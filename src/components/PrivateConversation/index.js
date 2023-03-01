import { useSelector } from 'react-redux'

import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

const PrivateConversation = (props) => {
  const { currentRoom } = useSelector(state => state.chat)
  const privateConversation = useSelector(state => state.chat.privateConversation.filter(con => con.room === currentRoom))

  return (
    <Stack divider={<Divider />} spacing={1}>
      {
        privateConversation.map(conversation => (
          <Stack key={conversation.id} sx={{
            textAlign: `${conversation.own ? 'left' : 'right'}`,
            alignItems: `${conversation.own ? 'start' : 'end'}`,
            px: '10px'
          }}>
            <Typography sx={{ width: '25ch', mb: '0.3rem' }}>{ conversation.message }</Typography>
            <Typography sx={{ fontSize: '0.6rem'}}>{ new Date(conversation.date).toDateString() }</Typography>
          </Stack>
        ))
      } 
    </Stack>
  );
};

export default PrivateConversation
