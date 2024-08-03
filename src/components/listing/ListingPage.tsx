// ** Next Imports
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Theme IMports
import { useTheme } from '@mui/material/styles'

const ListingPage = () => {
  
    const theme = useTheme()

  return (
    <Box className={`h-full w-full rounded-lg flex flex-col items-center text-center justify-between shadow-lg`} sx={{ backgroundColor: theme.palette.background.paper}}>
        
    </Box>
  )
}

export default ListingPage