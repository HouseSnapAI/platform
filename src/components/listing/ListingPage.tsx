// ** Next Imports
import React, { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// ** Theme Imports
import { useTheme } from '@mui/material/styles'

// ** Type Imports
import { ListingType, User } from '@/utils/types';

// Util Imports
import {exampleLiistingIds} from '@/utils/vars';
import { fetchListing } from '@/utils/db';

// ** Custom Components
import Filter from './filter'
import Listing from './Listing';

type ListingPageProps = {
    userInfo: User | null
    setUserInfo: (userInfo: User | null) => void
    listings: ListingType[]
}

const ListingPage = ({userInfo, setUserInfo, listings}: ListingPageProps) => {

    
    const theme = useTheme()

    return (
    <Box key={listings.length} className={`h-full w-full rounded-lg flex p-2 flex-col items-center text-center shadow-lg`} sx={{ backgroundColor: theme.palette.background.paper}}>
        <Filter userInfo={userInfo} setUserInfo={setUserInfo} />
        
        <Box className='flex flex-row flex-wrap gap-2 items-start justify-center w-full overflow-y-auto'>

            {(listings as ListingType[]).length > 0 ? (listings as ListingType[]).map((listing) => (
                <Listing
                key={listing.id}
                listing={listing}
                email={userInfo?.email}
                userInfo={userInfo || undefined}
                setUserInfo={setUserInfo}
                />
            )) : (
                <Typography>No listings available</Typography>
            )}
        </Box>
    </Box>
  )
}

export default ListingPage