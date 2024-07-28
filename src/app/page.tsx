'use client'

// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'; 
import Typography from '@mui/material/Typography'; 
import Tooltip from '@mui/material/Tooltip'; 
import TextField from '@mui/material/TextField'; 
import Popover from '@mui/material/Popover'; 
import Popper from '@mui/material/Popper'; 
import ClickAwayListener from '@mui/material/ClickAwayListener'; 

// ** Style Imports
import { useTheme } from '@mui/material/styles';

// ** Type Imports
import { SidebarType } from '@/utils/types';

// ** Icons Imports
import { IconEdit, IconMessageCircle, IconSend } from '@tabler/icons-react'; 

// ** Custom Imports
import HorizontalScroller from '@/components/chatbox/HorizontalScroller';

// ** Auth
import { useUser } from '@auth0/nextjs-auth0/client';

// ** Toast Imports
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { Bounce } from "react-toastify";

export default function Home() {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, isLoading } = useUser()
  const [inputValue, setInputValue] = useState<string>('');

  const [email, setEmail] = useState<string>('');

  const handleSubmit = async () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast('Please enter a valid email address.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    toast('🦄 Adding you to the waitlist!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_GOOGLE_SHEET_API}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: [{ id: 'INCREMENT', email: email }] })
      });

      const data = await response.json();
      console.log(data);
      setEmail('');
      toast('Added!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      console.error(error);
      toast('Error adding to the waitlist.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleClick = (event: any) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  const sidebar: SidebarType[] = [
    { icon: <IconEdit size={27} stroke={1.5} className='text-[#6f6f6f] hover:text-white transition-colors ease-in-out duration-300 m-2' />, title: 'New Chat', onClick: (e)=>{
      handleClick(e)
    } }, 
    { icon: <IconMessageCircle size={27} stroke={1.5} className='text-[#6f6f6f] hover:text-white transition-colors ease-in-out duration-300 m-2' />, title: 'Chat History', onClick: (e)=>handleClick(e) }, 
  ]

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  if(!isLoading && user) {
    window.location.href = '/chat';
  } else {
    return (
      <Box className="flex w-[100vw] h-[100vh] overflow-hidden flex-row bg-black">
        {/* SIDEBAR  */}
        <Box className="w-[67px] h-[100vh] border-r bg-[#111111] border-[#3a3939] transition-all overflow-x-hidden flex flex-col items-center pt-4">
          
          {/* Profile */}
          <Box className="w-[40px] h-[40px] mb-5 rounded-full flex items-center justify-center bg-gradient-to-r outline from-purple-400 via-pink-500 to-red-500 border border-black hover:outline hover:outline-3 hover:outline-white transition-all duration-300 cursor-pointer">
            <Tooltip title="Guest User" placement="right">
              <Typography variant="h6" className="text-white">
                GU
              </Typography>
            </Tooltip>
          </Box>
  
          {/* BUTTON MAP */}
          {sidebar.map((item, index) => (
            <Tooltip title={item.title} placement="right" key={index}>
              <Button onClick={(e)=>item.onClick(e)} sx={{padding: 0, minWidth: 0}} size='small' color='secondary' className=" mx-2 mb-2 rounded-md flex items-center justify-center border border-white/50">
                {item.icon}
              </Button>
            </Tooltip>
          ))}
        </Box>
  
        {/* MAIN BODY */}
        <Box className="w-[calc(100vw-67px)] h-[100vh] p-4 relative flex flex-col items-center transition-all duration-500 text-center justify-between">
          {/* Sign In and Sign Up Buttons */}
          {/* <Box className="absolute top-0 right-0 mt-4 mr-4 flex gap-2">
              <Button
                href='/api/auth/login'
                variant="outlined"
                className="text-white rounded-md"
                sx={{
                  border: '2px solid',
                  borderRadius: '30px',
                  borderImage: 'linear-gradient(to right, #a855f7, #ec4899, #ef4444) 1',
                  color: 'white',
                  '&:hover': {
                    opacity: 0.9,
                    borderRadius: '30px',
                    border: '2px solid',
                    borderImage: 'linear-gradient(to right, #a855f7, #ec4899, #ef4444) 1',
                  },
                }}
              >
                Sign In
              </Button>
              <Button
                href='/api/auth/login' 
                variant="outlined"
                sx={{border: '2px solid', "&:hover": {border: '2px solid'}}}
              >
                <span className="bg-gradient-to-r from-purple-400 via-pink-500  to-red-500 text-transparent font-semibold bg-clip-text">Sign Up</span>
              </Button>
          </Box>
   */}
          <Typography variant='h5' className={`text-[white] font-bold absolute top-0 left-0 mt-4 ml-4`}>
            House<span className="bg-gradient-to-r from-purple-400 via-pink-500  to-red-500 text-transparent bg-clip-text">Snap</span> 
          </Typography>
          
          <Box className='w-full flex flex-col items-center justify-center'>
              <Typography variant='h2' className={`text-[white] font-bold mb-2`}>
              Finding Your <span className="bg-gradient-to-r from-purple-400 via-pink-500  to-red-500 text-transparent bg-clip-text">Dream </span> House
            </Typography>
            <Typography className={`text-[white]/70  text-2xl`}>
              Chat with Properties and Rentals Across California
            </Typography>
          </Box>
  
            {/* EMAIL INPUT */}
          <Box className='w-[64%] h-min flex my-[-30px] flex-col'>
            <Box id='email-input' className='w-full flex flex-row justify-between gap-2  cursor-pointer border rounded-md transition-all ease-in-out duration-300'>
              <TextField
                variant='outlined'
                color='secondary'
                fullWidth
                autoComplete='false'
                placeholder='Enter your email...'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                  endAdornment: (
                    <IconSend
                      size={30}
                      stroke={2}
                      className='text-[white] mr-2 hover:cursor-pointer hover:text-pink-500 transition-all ease-in-out duration-300'
                      onClick={handleSubmit}
                    />
                  ),
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
              />
            </Box>
          </Box>
          
          <HorizontalScroller setInputValue={setInputValue} email={undefined} />
  
          {/* CALL TO ACTION + TITLES */}
  
            <ClickAwayListener onClickAway={(e) => {
              if (  anchorEl && !anchorEl.contains(e.target as Node)) {
                handleClose();
              }
            }}>
              <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement='top'
              >
                <Box pl={1} p={1} className={`flex flex-col justify-center min-w-[200px] border border-[${theme.palette.divider}] bg-[#1b1b1b] rounded-md z-[100]`}>
                  <Typography fontSize={14} className="text-left" color="text.secondary">
                    Coming Soon...
                  </Typography>
                  <Typography fontSize={14} className="text-left" color="white" noWrap>
                    Join the Waitlist for early access!
                  </Typography>
                  
                </Box>
              </Popper>
            </ClickAwayListener>
  
            {/* FOOTER */}
          <Box className="absolute bottom-0 left-0 w-full p-4 bg-transparent">
            <Typography variant='body2' className="text-[white]/50 text-left">
              Made with <span className="text-red-500">❤️</span> by Vish and Nitin
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }
}