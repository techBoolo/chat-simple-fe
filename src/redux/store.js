import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './reducers/chatSlice.js'

export default configureStore({
  reducer: {
    chat: chatReducer
  }
})
