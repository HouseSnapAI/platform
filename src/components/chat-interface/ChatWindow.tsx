// ** Next Imports
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Message from './message/Message'

// ** Type Imports
import { Chat, ListingType } from '@/utils/types'

type ChatWindowProps = {
  chatHistory: Chat
  loading: boolean
  selectedListing: ListingType | null | 'loading'
}

const ChatWindow = ({chatHistory, loading, selectedListing  }: ChatWindowProps) => {
  return (
    <Box className='w-full h-full overflow-x-hidden overflow-y-auto hide-scrollbar flex items-center justify-center'>
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