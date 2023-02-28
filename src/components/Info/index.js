import { useSelector, useDispatch } from 'react-redux'

import { setToPublic } from '../../redux/reducers/chatSlice.js'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

const Info = (props) => {
  const { toPublic } = useSelector(state => state.chat)
  const dispatch = useDispatch()

  const changeToPublic = (ev) => {
    dispatch(setToPublic(ev.target.checked))
  }
  return (
    <Box>
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
  );
};

export default Info
