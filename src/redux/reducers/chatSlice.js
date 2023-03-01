import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toPublic: true,
  clientCount: 0,
  publicConversation: [],
  currentRoom: null
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
    addPublicConversation: (state, action) => {
      state.publicConversation.push(action.payload)
    },
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload
    },
  }
})

export const { setToPublic, setClientCount, addPublicConversation, setCurrentRoom } = chatSlice.actions
export default chatSlice.reducer
