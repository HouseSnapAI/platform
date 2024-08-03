// ** Next Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import { IconSend } from '@tabler/icons-react'

// ** Custom Imports
import ChatWindow from './ChatWindow'

// ** Types Imports
import { Chat, User} from '@/utils/types'

// ** Style Imports
import { useTheme } from '@mui/material/styles'

type ChatInterfaceProps = {
    setInputValue: (value: string) => void
    inputValue: string
    chatHistory: Chat
    handleClick: () => void
    userInfo: User | null
    chatId: string
    loading: boolean
  }
const ChatInterface = ({ setInputValue, inputValue, chatHistory, handleClick, userInfo, chatId, loading}: ChatInterfaceProps) => {

    const theme = useTheme();

  return (
    <Box className={`absolute bg-[#141414] bottom-4 right-4 rounded-lg flex flex-col items-center text-center justify-between w-[360px] h-[400px] drop-shadow-lg pt-[10px]`} sx={{border: `1px solid #222`}}>
       {userInfo &&  <Box className='w-full flex flex-row items-center pl-[20px] pb-[10px]' sx={{borderBottom: `1px solid #222`}}>
            <Typography variant='subtitle1' color='text.secondary'>HouseSnap AI</Typography>
        </Box>}

        <ChatWindow chatHistory={chatHistory} loading={loading} />

        <Box className='w-[95%] px-4 overflow-y-hidden'>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleClick();
                }}
                className='w-full flex flex-row items-center justify-between gap-2 fade-in-on-scroll cursor-pointer mb-10 rounded-md transition-all ease-in-out duration-300'
            >
                <TextField 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)}
                    variant='outlined' 
                    color='secondary' 
                    fullWidth 
                    autoComplete='false' 
                    placeholder='Chat...'
                    InputProps={{
                        className: 'shadow-md h-[50px] px-[5px] text-white bg-[#181818] rounded-full',
                        endAdornment: 
                        <IconButton
                            type='submit'
                            onClick={handleClick}
                            color='secondary'
                            size='small'
                        >
                            <IconSend 
                                size={20} 
                                stroke={2} 
                                className='text-[white] mr-2 hover:cursor-pointer hover:text-pink-500 transition-all ease-in-out duration-300' 
                            />
                        </IconButton>
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: 'none',
                            },
                            '&:hover fieldset': {
                                border: 'none',
                            },
                            '&.Mui-focused fieldset': {
                                border: 'none',
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                    }}
                >
                    Get Started!!
                </TextField>
            </form>
        </Box>
    </Box>
  )
}

export default ChatInterface