// ** Next Imports
import {useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Type Imports
import { ListingType } from '@/utils/types'

const MortgageMonthlyCalc = ({listing}: {listing: ListingType}) => {
    const [mortage, setMortage] = useState(0)

  return (
    <Box>
        MortgageMonthlyCalc
    </Box>
  )
}

export default MortgageMonthlyCalc