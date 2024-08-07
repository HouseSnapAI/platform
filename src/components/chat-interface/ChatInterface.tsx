// ** Next Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip';
import { IconArrowsDiagonal2, IconX, IconArrowsDiagonalMinimize, IconMessage, IconReload } from '@tabler/icons-react';
import { Transition } from '@headlessui/react'

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
    handleClick: (newChat: boolean) => void
    userInfo: User | null
    loading: boolean
    resetChat: () => void
  }
const ChatInterface = ({ setInputValue, inputValue, chatHistory, handleClick, userInfo, loading, resetChat}: ChatInterfaceProps) => {

    const theme = useTheme();
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(true);

    const setExpandedFunction = () => {
        let temp = expanded;
        setExpanded(!temp);
        sessionStorage.setItem('expanded', (!temp).toString());
    }

    const setOpenFunction = (newVal: boolean) => {
        setOpen(newVal);
        sessionStorage.setItem('chatOpen', (newVal).toString());
    }

    useEffect(() => {
        const temp = sessionStorage.getItem('expanded');
        if (temp) {
            setExpanded(temp === 'true');
        }
        const tempOpen = sessionStorage.getItem('chatOpen');
        if (tempOpen) {
            setOpen(tempOpen === 'true');
        }
    }, [])

  return (
    <Box onClick={() => {if(!open) setOpenFunction(true)}} className={!open ? 'transition-all duration-200 ease-in-out absolute bg-[#181818] bottom-4 right-4 rounded-xl flex items-center justify-center w-[70px] h-[70px] drop-shadow-lg hover:cursor-pointer hover:drop-shadow-xl' : (expanded ? ` absolute bg-[#141414] bottom-4 right-4 rounded-lg flex flex-col items-center text-center justify-between w-[450px] h-[580px] drop-shadow-lg` : ` absolute bg-[#141414] bottom-4 right-4 rounded-lg flex flex-col items-center text-center justify-between w-[380px] h-[440px] drop-shadow-lg`)} sx={{border: `1px solid #222`}}>
        {
            !open ? <IconMessage size={40} className='text-[#989898] hover:cursor-pointer hover:text-[#c8c8c8] hover:shadow-xl transition-all ease-in-out duration-300'  />
            :
            <>
                {userInfo &&  <Box className='w-full flex flex-row items-center py-[5px] justify-between' sx={{borderBottom: `1px solid #222`}}>
            <Typography className='pl-[20px]' variant='subtitle1' color='text.secondary'>Chat</Typography>
            <Box>
                <Tooltip title="restart" placement='bottom'><IconButton className='mr-[10px] ' onClick={() => resetChat()}>
                    <IconReload className={`text-[#989898] hover:cursor-pointer hover:text-[#c8c8c8] hover:shadow-xl transition-all ease-in-out duration-300`} size={20} />
                    </IconButton>
                </Tooltip>
                <Tooltip title={expanded ? "minimize" : "expand"} placement='bottom'>
                    <IconButton className='' onClick={() => setExpandedFunction()}>
                        {!expanded ? 
                            <IconArrowsDiagonal2 className={`text-[#989898] hover:cursor-pointer hover:text-[#c8c8c8] hover:shadow-xl transition-all ease-in-out duration-300`} size={20} />
                        :
                            <IconArrowsDiagonalMinimize className={`text-[#989898] hover:cursor-pointer hover:text-[#c8c8c8] hover:shadow-xl transition-all ease-in-out duration-300`} size={20} />
                        }
                    </IconButton>
                </Tooltip>
                <Tooltip title="close" placement='bottom'>
                    <IconButton className='mr-[10px] ' onClick={() => setOpenFunction(false)}>
                        <IconX className={`text-[#989898] hover:cursor-pointer hover:text-[#c8c8c8] hover:shadow-xl transition-all ease-in-out duration-300`} size={20} />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>}

        <ChatWindow chatHistory={chatHistory} loading={loading} />

        <Box className='w-[95%] px-4 overflow-y-hidden'>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log(chatHistory)
                    
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
                    autoFocus
                    placeholder='Chat...'
                    InputProps={{
                        className: 'shadow-md h-[50px] px-[5px] text-white bg-[#181818] rounded-full',
                        endAdornment: 
                        <IconButton
                            type='submit'
                            onClick={() => {
                                if(chatHistory.chat_history.length == 1) {
                                    console.log("here");
                                    handleClick(true);
                                }
                                else
                                    handleClick(false);
                            }}
                            color='secondary'
                            size='small'
                            className='w-[40px] h-[40px]  flex items-center justify-center rounded-full'
                        >
                            <IconSend 
                                size={20} 
                                stroke={2} 
                                className='text-[#8f8f8f] mr-1 hover:cursor-pointer hover:text-pink-500 transition-all ease-in-out duration-300' 
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
                            color: '#999',
                        },
                    }}
                >
                    Get Started!!
                </TextField>
            </form>
        </Box>
            </>
        }
       
    </Box>
  )
}

export default ChatInterface