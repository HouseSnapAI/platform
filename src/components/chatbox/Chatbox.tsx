
// ** Next Import
import React from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import Popper from '@mui/material/Popper';
// import ClickAwayListener from '@mui/material/ClickAwayListener';

// ** Style Imports
import { useTheme } from '@mui/material/styles';

// import { IconSend } from '@tabler/icons-react';
// import HorizontalScroller from './HorizontalScroller';

import { User } from '@/utils/types';

type ChatBoxProps = {
  drawerOpen: boolean
  setInputValue: (value: string) => void
  inputValue: string
  handleClick: () => void
  email: string | null | undefined
  setUserInfo: (data:User)=>void;
  userInfo: User;
}

const Chatbox = ({drawerOpen, setInputValue, inputValue, handleClick, email, setUserInfo, userInfo}: ChatBoxProps) => {
    const theme = useTheme();

    return (
    <Box className={`h-[360px] rounded-lg flex flex-col items-center text-center justify-between w-[400px] shadow-lg shadow-pink-500/20`} sx={{border: `1px solid ${theme.palette.divider}`, backgroundColor: theme.palette.background.paper}}>

      {/* <Typography variant='h5' mt={2} ml={2} className={`text-[white] font-bold absolute top-0 left-0`}>
        Dream<span className="bg-gradient-to-r from-purple-400 via-pink-500  to-red-500 text-transparent bg-clip-text">RE</span>
      </Typography>

      <Box className='w-full flex flex-col items-center justify-center fade-in-on-scroll mt-8'>
        <Typography variant='h2' className={`text-[white] font-bold fade-in-on-scroll mb-2`}>
          Ask a <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text"> Question </span>
        </Typography>
      </Box>


      <HorizontalScroller setInputValue={setInputValue} email={email} userInfo={userInfo} setUserInfo={setUserInfo} />

      <Box className='w-[64%] px-4 py-3'>
        <form>
          <Box id='finput' className='w-full flex flex-row items-center justify-between gap-2  cursor-pointer border mb-14 mt-10  rounded-md transition-all ease-in-out duration-300 ' >
            <TextField onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleClick();
              }
            }} value={inputValue} onChange={(e) => setInputValue(e.target.value)} variant='outlined' color='secondary' fullWidth autoComplete='false' placeholder='Start Typing...'
              InputProps={{
                endAdornment: <IconSend type='submit' onClick={(e)=>{
                  e.preventDefault()
                  handleClick()
                }} size={30} stroke={2} className='text-[white] mr-2 hover:cursor-pointer hover:text-pink-500 transition-all ease-in-out duration-300' />,
                style: { border: 'none', boxShadow: 'none' }
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
          </Box>
        </form> 
      </Box>*/}

      {/* FOOTER */}
      {/* <Box className="absolute bottom-0 left-0 w-full p-4 bg-transparent">
        <Typography variant='body2' className="text-[white]/50 text-left">
          Made with <span className="text-red-500">❤️</span> by Vish and Nitin
        </Typography>
      </Box> */}
    </Box>
  );
};

export default Chatbox;