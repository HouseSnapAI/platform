// ** Next Imports
import React from 'react'

// ** MUI Imports
import CircularProgress from '@mui/material/CircularProgress'

// ** Style Imports
import { styled } from '@mui/system'

const CustomSpinner = styled(CircularProgress)({
  color: 'black',
  '&.MuiCircularProgress-colorPrimary': {
    color: '#9c27b0', // bg-purple-500
  },
  '&.MuiCircularProgress-colorSecondary': {
    color: '#e91e63', // pink-500
  },
  '&.MuiCircularProgress-colorError': {
    color: '#f44336', // red-500
  },
})

const SpinnerComponent = () => {
  return (
    <CustomSpinner color="primary" />
  )
}

export default SpinnerComponent