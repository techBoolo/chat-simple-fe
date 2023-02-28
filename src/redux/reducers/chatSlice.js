import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toPublic: true,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setToPublic: (state, action) => {
      state.toPublic = action.payload 
    },
  }
})

export const { setToPublic } = chatSlice.actions
export default chatSlice.reducer
