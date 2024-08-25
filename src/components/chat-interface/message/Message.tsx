// ** Next Imports
import { useEffect, useRef } from 'react'

// ** MUI Imports
import { Box, Typography } from '@mui/material'

// ** Type Imports
import type { Message } from '@/utils/types'

// ** Style Imports
import { useTheme } from '@mui/material/styles'
import React from 'react'

const Message = ({ message }: { message: Message }) => {
  const isAssistant = message.role === 'assistant';

  const theme = useTheme()

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [message]);

  if (isAssistant) {
    return (
        <Box className="flex flex-col pb-[15px]">
          <Box className="flex flex-col justify-start items-start mr-10 ">
            <Typography fontSize={14.5} className='text-white ml-[5px]' mb={1}>HouseSnap<span className="bg-gradient-to-r from-purple-400 via-pink-500 fade-in-on-scroll to-red-500 text-transparent bg-clip-text">AI</span></Typography>
            <Box className='bg-[#222222] py-[10px] pr-[10px] pl-[12px] w-[100%] rounded-md shadow-md'>
              <Typography align='left' sx={{wordWrap: 'break-word'}} fontSize={13.5} color='text.primary'>{message.content}</Typography>
            </Box>
          </Box>
          <div ref={chatEndRef} className='bg-red-500'></div>
        </Box>
    )
  } else if(message.role === 'user') {
      return (
        <Box className="items-end flex-col flex ml-10 pb-[5px]">
            <Box className='py-[10px] pr-[10px] pl-[12px] rounded-md' sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
              <Typography align='left' fontSize={13.5} color='#d4d4d4'>{message.content}</Typography>
            </Box>
        </Box>
      )
  } else if (message.role === 'system') {
    return (
      <Box className="flex flex-col pb-[15px]">
        <Box className="flex flex-col justify-start items-start mr-10 ">
          <Typography fontSize={14.5} className='text-white ml-[5px]' mb={1}>HouseSnap<span className="bg-gradient-to-r from-purple-400 via-pink-500 fade-in-on-scroll to-red-500 text-transparent bg-clip-text">AI</span></Typography>
          <Box className='bg-[#222222] py-[10px] pr-[10px] pl-[12px] rounded-md shadow-md'>
            <Typography align='left' fontSize={13.5} color='text.primary'>Hi! How can I help you?</Typography>
          </Box>
        </Box>
        <div ref={chatEndRef} className='bg-red-500'></div>
      </Box>
  )
  } else {

    // console.log(message)

    return (
      <Box className="flex flex-col pb-[15px]">
        <Box className="flex flex-col justify-start items-start mr-10 ">
          <Typography fontSize={14.5} className='text-white ml-[5px]' mb={1}>HouseSnap<span className="bg-gradient-to-r from-purple-400 via-pink-500 fade-in-on-scroll to-red-500 text-transparent bg-clip-text">AI</span></Typography>
          <Box className='bg-[#222222] py-[10px] pr-[10px] pl-[12px] rounded-md shadow-md'>
            <Typography align='left' fontSize={13.5} color='text.primary'>Hi! Welcome to {message.role}</Typography>
          </Box>
        </Box>
        <div ref={chatEndRef} className='bg-red-500'></div>
      </Box>
  )
  }

}

export default Message