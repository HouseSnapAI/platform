// ** Next Imports
import { useEffect, useRef } from 'react'

// ** MUI Imports
import { Box, Typography } from '@mui/material'

// ** Type Imports
import { MessageType } from '@/utils/types'

// ** Style Imports
import { useTheme } from '@mui/material/styles'

const Message = ({ message }: { message: MessageType }) => {
  const isAssistant = message.M?.role?.S === 'assistant';

  const theme = useTheme()

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [message]);

  if (isAssistant) {
    return (
        <Box className="flex flex-col">
          <Box className="flex flex-col mr-10">
            <Typography fontSize={16} className='text-white' mb={1}>Dream<span className="bg-gradient-to-r from-purple-400 via-pink-500 fade-in-on-scroll to-red-500 text-transparent bg-clip-text">RE</span></Typography>
            <Typography fontSize={16} color='text.secondary'>{message.M?.content?.S}</Typography>
          </Box>
          <div ref={chatEndRef} className='bg-red-500'></div>
        </Box>
    )
  } else if(message.M?.role?.S === 'user') {
      return (
        <Box className="items-end flex-col flex">
            <Box className='px-4 py-2' sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
              <Typography fontSize={16} color='text.primary'>{message.M?.content?.S}</Typography>
            </Box>
        </Box>
      )
  }

}

export default Message