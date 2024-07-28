import React from 'react';
import { Box, Button, Typography, TextField, Popper, ClickAwayListener } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconSend } from '@tabler/icons-react';
import HorizontalScroller from './HorizontalScroller';

type ChatBoxProps = {
  drawerOpen: boolean
  setInputValue: (value: string) => void
  inputValue: string
  handleClick: () => void
  email: string | null | undefined
}

const Chatbox = ({drawerOpen, setInputValue, inputValue, handleClick, email}: ChatBoxProps) => {
    const theme = useTheme();

    return (
    <Box className={` h-[100vh] p-4 relative flex flex-col items-center text-center justify-between w-[calc(100vw-67px)]`}>

      <Typography variant='h5' mt={2} ml={2} className={`text-[white] font-bold absolute top-0 left-0`}>
        Dream<span className="bg-gradient-to-r from-purple-400 via-pink-500  to-red-500 text-transparent bg-clip-text">RE</span>
      </Typography>

      <Box className='w-full flex flex-col items-center justify-center fade-in-on-scroll mt-8'>
        <Typography variant='h2' className={`text-[white] font-bold fade-in-on-scroll mb-2`}>
          Ask a <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text"> Question </span>
        </Typography>
      </Box>


      {/* HORIZONTAL SCROLLER */}
      <HorizontalScroller setInputValue={setInputValue} email={email} />

      {/* TODO: ON SUBMIT QUERY THE MODEL */}
      <Box className='w-[64%] px-4 py-3'>
        <form>
          <Box id='finput' className='w-full flex flex-row items-center justify-between gap-2  cursor-pointer border mb-14 mt-10  rounded-md transition-all ease-in-out duration-300 ' >
            <TextField value={inputValue} onChange={(e) => setInputValue(e.target.value)} variant='outlined' color='secondary' fullWidth autoComplete='false' placeholder='Start Typing...'
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
      </Box>

      {/* FOOTER */}
      <Box className="absolute bottom-0 left-0 w-full p-4 bg-transparent">
        <Typography variant='body2' className="text-[white]/50 text-left">
          Made with <span className="text-red-500">❤️</span> by Vish and Nitin
        </Typography>
      </Box>
    </Box>
  );
};

export default Chatbox;