// ** Next Imports
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Message from './message/Message'

// ** Type Imports
import { Chat, ChatHistoryType } from '@/utils/types'

// ** Custom Components Imports
import SpinnerComponent from '../common/CustomSpinner'

type ChatWindowProps = {
  chatHistory: Chat
  loading: boolean
}

const ChatWindow = ({chatHistory, loading}: ChatWindowProps) => {
  
  return (
    <Box className='w-full h-full overflow-x-hidden overflow-y-auto flex items-center justify-center'>
      <Box className='w-[90%] h-full py-3 gap-[15px] flex flex-col'>
        {chatHistory.chat_history.map((chat, index) => (
          <Message key={`${chat.role}-${index}`} message={chat} />
        ))}
      {loading && 
        <div className="banter-loader">
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
        </div>
      }
        

      </Box>
    </Box>
  )
}

export default ChatWindow