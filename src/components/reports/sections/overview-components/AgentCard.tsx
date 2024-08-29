// ** Next Imports
import React from 'react'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';


// ** Style Imports
import { useTheme } from '@mui/material/styles';

// ** Icon Imports
import { IconBrandInstagram, IconBrandTwitter, IconSend, IconSparkles, IconWorld } from '@tabler/icons-react';

// ** Type Imports
import { ListingType } from '@/utils/types';

const AgentCard = ({listing}: {listing: ListingType}) => {
    const theme = useTheme();
  return (
    <Box className="w-full py-2 flex flex-col gap-2 px-2">
          {/* Real Estate Agent Card */}
          <Box className="p-4 rounded shadow-md w-full flex items-center" style={{ backgroundColor: theme.palette.background.paper }}>
            <Box className="flex items-center gap-4">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_vVBAvcz_VzzBC-8kmKTJ6j3B7t3LbYOhhg&s" alt="Agent" className="rounded-full w-[64px] h-[64px] object-cover" />
              <Box>
                <Typography variant="h6" color={theme.palette.text.primary}>Vish Akkati</Typography>
                <Box className="flex flex-col gap-2 mt-2">
                  <a href="mailto:vakkati@ucdavis.edu"><Typography variant="body2" color={theme.palette.text.secondary}>vakkati@ucdavis.edu</Typography></a>
                  <a href="tel:9163043454"><Typography variant="body2" color={theme.palette.text.secondary}>916-304-3454</Typography></a>
                </Box>
              </Box>
            </Box>
            <Box className="flex flex-col items-center ml-2 gap-2">
              <Box className="flex gap-2">
                <IconButton sx={{padding:0}}>
                  <IconWorld size={20} className="text-purple-500" />
                </IconButton>
                <IconButton>
                  <IconBrandInstagram size={20} className="text-purple-500" />
                </IconButton>
                <IconButton>
                  <IconBrandTwitter size={20} className="text-purple-500" />
                </IconButton>
              </Box>
              <Typography align='right' fontSize={12} color={theme.palette.text.secondary}>License #: 123456 | Office #: 123456</Typography>
            </Box>
          </Box>

          {/* House Information Card */}
          <Box className=" p-4 rounded shadow-md w-full mt-4 flex flex-col gap-2" style={{ backgroundColor: theme.palette.background.paper }}>
            <Typography fontSize={14} fontWeight={600} color={theme.palette.text.primary}>House Information</Typography>
            <Box className='flex justify-between gap-2'>
              <Typography fontSize={14} color="textSecondary">Address:</Typography> 
              <Typography fontSize={14} color="textPrimary">{listing.full_street_line}, {listing.city}, {listing.state} {listing.zip_code}</Typography>
            </Box>
            <Box className='flex justify-between gap-2'>
              <Typography fontSize={14} color="textSecondary">Price:</Typography>
              <Typography fontSize={14} color="textPrimary">${listing.list_price.toLocaleString()}</Typography>
            </Box>
            <Box className='flex justify-between gap-2'>
              <Typography fontSize={14} color="textSecondary">Beds:</Typography>
              <Typography fontSize={14} color="textPrimary">{listing.beds}</Typography>
            </Box>
            <Box className='flex justify-between gap-2'>
              <Typography fontSize={14} color="textSecondary">Baths:</Typography>
              <Typography fontSize={14} color="textPrimary">{listing.full_baths?.toString() != "-1" ? listing.full_baths : 0 + (listing.half_baths?.toString() || "-1") != "-1" ? listing.half_baths : 0}</Typography>
            </Box>
            <Box className='flex justify-between gap-2'>
              <Typography fontSize={14} color="textSecondary">Sq Ft:</Typography>
              <Typography fontSize={14} color="textPrimary">{listing.sqft.toLocaleString()}</Typography>
            </Box>
          </Box>

          {/* Bid an Offer Button */}
          <Button variant="contained" color="primary" className="mt-4" sx={{textTransform: 'none'}} endIcon={<IconSparkles size={14} color='white' strokeWidth={1.5} />}>
            HouseSnap Suggested Offers 
          </Button>
          {/* Chat Interface */}
          <Box className="w-full px-4 py-2 overflow-y-hidden mt-4" sx={{ backgroundColor: theme.palette.background.paper }}>
            <Box className='w-full h-full overflow-x-hidden overflow-y-auto hide-scrollbar flex items-center justify-center'>
              <Box className='w-[90%] h-full py-3 gap-[15px] flex flex-col'>
                {/* Example messages */}
                <Box className="flex flex-col pb-[15px]">
                  <Box className="flex flex-col justify-start items-start mr-10 ">
                    <Typography fontSize={14.5} className='text-white ml-[5px]' mb={1}>HouseSnap<span className="bg-gradient-to-r from-purple-400 via-pink-500 fade-in-on-scroll to-red-500 text-transparent bg-clip-text">AI</span></Typography>
                    <Box className='bg-[#222222] py-[10px] pr-[10px] pl-[12px] w-[100%] rounded-md shadow-md'>
                      <Typography align='left' sx={{wordWrap: 'break-word'}} fontSize={13.5} color='text.primary'>Hi! How can I help you?</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box className="items-end flex-col flex ml-10 pb-[5px]">
                  <Box className='py-[10px] pr-[10px] pl-[12px] rounded-md' sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                    <Typography align='left' fontSize={13.5} color='#d4d4d4'>I would like to know more about this listing.</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className="w-full flex flex-row items-center justify-between gap-2 mb-10 rounded-md transition-all ease-in-out duration-300">
              <TextField 
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
                    color='secondary'
                    size='small'
                    className='w-[40px] h-[40px] flex items-center justify-center rounded-full'
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
              />
            </Box>
          </Box>
        </Box>
  )
}

export default AgentCard