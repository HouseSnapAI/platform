// ** Next Imports
import React, { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

// ** Theme IMports
import { useTheme } from '@mui/material/styles'

// ** Type Imports
import { User } from '@/utils/types';
import Filter from './filter'

type ListingPageProps = {
    userInfo: User
    setUserInfo: (userInfo: User) => void
}

const ListingPage = ({userInfo, setUserInfo}: ListingPageProps) => {
  
    const theme = useTheme()

    const [budget, setBudget] = useState<[number, number]>([userInfo?.min_budget || 0, userInfo?.max_budget || 5000000])
    const [location, setLocation] = useState<string>(userInfo?.location?.[0] || '')
    const [beds, setBeds] = useState<number>(userInfo?.beds || 0)
    const [baths, setBaths] = useState<number>(userInfo?.baths || 0)
    const [propertyType, setPropertyType] = useState<string>(userInfo?.property_types?.[0] || '')

    const handleSave = () => {
        // Implement save functionality here
        console.log('Saving filters:', { budget, location, beds, baths, propertyType })
    }

  return (
    <Box className={`h-full w-full rounded-lg flex p-2 flex-col items-center text-center justify-between shadow-lg`} sx={{ backgroundColor: theme.palette.background.paper}}>
        <Filter userInfo={userInfo} setUserInfo={setUserInfo} />
    </Box>
  )
}

export default ListingPage