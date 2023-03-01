import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const ScrollToBottom = () => {
  const { toPublic, publicConversation, privateConversation} = useSelector(state => state.chat)
  const scrollRef = useRef()

  useEffect(() => {
    scrollRef.current.scrollIntoView(false)
  }, [toPublic, publicConversation, privateConversation])
  // include new message added dependencies aswell

    return <div ref={scrollRef} />
}


export default ScrollToBottom
