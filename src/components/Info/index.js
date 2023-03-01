import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setToPublic, setCurrentRoom } from '../../redux/reducers/chatSlice.js'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const Info = ({ socket }) => {
  const [ roomNameText, setRoomNameText ] = useState('')
  const { toPublic, clientCount, currentRoom } = useSelector(state => state.chat)
  const dispatch = useDispatch()

  const handleTextChange = (ev) => {
    if(ev.target.name === 'room') {
      setRoomNameText(ev.target.value)
    }
  }
  
  const changeToPublic = (ev) => {
    dispatch(setToPublic(ev.target.checked))
  }

  const handleRoomNameChange = (ev) => {
    ev.preventDefault()
    if(roomNameText.trim().match(/^\s*$/) || (currentRoom === roomNameText)) {
      setRoomNameText('')
      return
    }
    socket.emit('join-room', { room: roomNameText }, (err, data) => {
      if(!err) {
        dispatch(setCurrentRoom(data))
        setRoomNameText('')
      }
    })
  }

  // prevent event from propagating when pressing on text field
  // planned to use it as a selector for already joined rooms and new room
  const handleKey = (ev) => {
    if(ev.code === 'Enter') {
      ev.preventDefault()
    }
  }

  return (
    <Stack sx={{ mb: '0.5rem'}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '0.5rem' }}>
        <Stack>
          <Typography variant='caption'>Connected client(s): { clientCount }</Typography>
          { !toPublic && currentRoom && <Typography variant='caption'>Current room: {currentRoom}</Typography> }
        </Stack>
        <FormControlLabel
          control={
            <Checkbox
              checked={toPublic}
              onChange={ev => changeToPublic(ev)}
            />
          }
          label={`To Public`}
        />
      </Box>

      { !toPublic && 
        <Stack>
          <form onSubmit={handleRoomNameChange}>
            <Box sx={{ display: 'flex' }}>
              <TextField
                type='text'
                name='room'
                label='Room Name'
                placeholder='Please enter the room name'
                size='small'
                fullWidth
                value={roomNameText}
                onChange={(ev) => handleTextChange(ev) }
                onKeyPress={(ev) => handleKey(ev)}
              />
              <Button sx={{ ml: '0.5rem' }} variant='outlined' type='submit'>join</Button>
            </Box>
          </form>
        </Stack>
      }
    </Stack>
  );
};

export default Info
