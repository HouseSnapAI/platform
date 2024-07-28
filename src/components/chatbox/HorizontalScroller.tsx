// ** Next Imports
import React from 'react';

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Components Imports
import Listing from '../listing/Listing'

// ** Util Imports
import { examplePromptsOne, examplePromptsTwo, exampleListings } from '@/utils/vars'

type HorizontalScrollerProps = {
    setInputValue: (value: string) => void
    email: string | null | undefined
}

const HorizontalScroller = ({setInputValue, email}: HorizontalScrollerProps) => {
  return (
    <Box className='w-[64%] flex flex-col justify-center items-center gap-2'>
      {/* EXAMPLE LISTINGS */}
      <Box className="w-full flex flex-row relative listings gap-2">
        <Box className="h-full flex listings-slide gap-2">
          {exampleListings.map((listing, index) => (
            <Listing key={index} listing={listing} email={email} />
          ))}
        </Box>
        <Box className="h-full flex listings-slide gap-2">
          {exampleListings.map((listing, index) => (
            <Listing key={index} listing={listing} email={email} />
          ))}
        </Box>
      </Box>

      {/* EXAMPLE PROMPT ONE */}
      <Box className="w-full flex flex-row relative listings gap-2">
        <Box className="h-full flex listings-slide-reverse gap-2">
          {examplePromptsOne.map((prompt, index) => (
            <Box key={index} onClick={() => setInputValue(prompt)} className='w-full h-full px-4 py-3 border-[1px] border-[#393939] text-white/70 hover:text-white rounded-sm hover:cursor-pointer ease-in-out duration-300 hover:bg-[#4a4a4a]/30'>
              <Typography variant='subtitle2'>{prompt}</Typography>
            </Box>
          ))}
        </Box>
        <Box className="h-full flex listings-slide-reverse gap-2">
          {examplePromptsOne.map((prompt, index) => (
            <Box key={index} onClick={() => setInputValue(prompt)} className='w-full h-full px-4 py-3 border-[1px] border-[#393939] text-white/70 hover:text-white rounded-sm hover:cursor-pointer ease-in-out duration-300 hover:bg-[#4a4a4a]/30'>
              <Typography variant='subtitle2'>{prompt}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* EXAMPLE PROMPT 2 */}
      <Box className="w-full flex flex-row relative listings gap-2">
        <Box className="h-full flex listings-slide gap-2">
          {examplePromptsTwo.map((prompt, index) => (
            <Box key={index} onClick={() => setInputValue(prompt)} className='w-full h-full px-4 py-3 border-[1px] border-[#393939] text-white/70 hover:text-white rounded-sm hover:cursor-pointer ease-in-out duration-300 hover:bg-[#4a4a4a]/30'>
              <Typography variant='subtitle2'>{prompt}</Typography>
            </Box>
          ))}
        </Box>
        <Box className="h-full flex listings-slide gap-2">
          {examplePromptsTwo.map((prompt, index) => (
            <Box key={index} onClick={() => setInputValue(prompt)} className='w-full h-full px-4 py-3 border-[1px] border-[#393939] text-white/70 hover:text-white rounded-sm hover:cursor-pointer ease-in-out duration-300 hover:bg-[#4a4a4a]/30'>
              <Typography variant='subtitle2'>{prompt}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HorizontalScroller;