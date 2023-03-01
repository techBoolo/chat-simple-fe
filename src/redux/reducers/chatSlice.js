import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toPublic: true,
  clientCount: 0,
  publicConversation: [],
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
    }
  }
})

export const { setToPublic, setClientCount, addPublicConversation } = chatSlice.actions
export default chatSlice.reducer
