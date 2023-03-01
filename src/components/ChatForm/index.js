import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addPublicConversation, addPrivateConversation } from '../../redux/reducers/chatSlice.js'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const ChatForm = ({ socket }) => {
  const [ message, setMessage ] = useState('')
  const { toPublic, currentRoom, publicConversation } = useSelector(state => state.chat)
  const dispatch = useDispatch()

  const sendMessage = (ev) => {
    ev.preventDefault()
    if(message.trim().match(/^\s*$/)) return
    if(toPublic) {
      socket.emit('public-message-sent', { message }, (err, data) => {
        if(!err) {
          // dispatch to own publicConversation
          // since we use broadcast when emitting from the server, 
          // we don't receive the emitted data from the server, instead we use
          // callback
          dispatch(addPublicConversation({ ...data, own: true }))
        }
      })
    } else {
      socket.emit('private-message-sent', { message, room: currentRoom }, (err, data) => {
        if(!err) {
          dispatch(addPrivateConversation({ ...data, own: true }))
        } else {
          // dispatch notification to show user, to join a room
          console.log(err.message);
        }
      })
    }
    setMessage('')
  }
  return (
    <Stack>
      <form onSubmit={ ev => sendMessage(ev) }>
        <Stack sx={{}}>
          <TextField 
            required
            type='text'
            name='message'
            label='message'
            multiline
            minRows={2}
            maxRows={2}
            inputProps={{ maxLength: 100 }}
            placeholder='Only 100 characters at a time'
            size='small'
            fullWidth
            margin='dense'

            value={message}
            onChange={ev => setMessage(ev.target.value)}
          />
          <Button type='submit' variant='outlined' size='small' sx={{ alignSelf: 'center' }}>
            { 'send' }
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default ChatForm
