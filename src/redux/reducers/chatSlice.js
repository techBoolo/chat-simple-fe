import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toPublic: true,
  clientCount: 0,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setToPublic: (state, action) => {
      state.toPublic = action.payload 
    },
    setClientCount: (state, action) => {
      state.clientCount = action.payload
    },
  }
})

export const { setToPublic, setClientCount } = chatSlice.actions
export default chatSlice.reducer
