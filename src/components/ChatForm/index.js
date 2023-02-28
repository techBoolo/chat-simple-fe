import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const ChatForm = (props) => {

  return (
    <Stack>
      <form>
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
          />
          <Button variant='outlined' size='small' sx={{ alignSelf: 'center' }}>
            { 'send' }
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default ChatForm
