// ** Next Imports
import React, { useState, useEffect, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// ** Theme Imports
import { useTheme } from '@mui/material/styles'

// ** Type Imports
import { ListingType, User } from '@/utils/types';

// ** Custom Components
import Filter from './filter'
import Listing from './Listing';

type ListingPageProps = {
    userInfo: User | null
    setUserInfo: (userInfo: User | null) => void
    listings: ListingType[]
    setIds: (data: string[]) => void
    onHover: (listing: ListingType | null) => void
    hoveredListing: ListingType | null
}

const ListingPage = ({userInfo, setUserInfo, listings, setIds, onHover, hoveredListing}: ListingPageProps) => {

    const theme = useTheme()
    const [lastHoveredListing, setLastHoveredListing] = useState<ListingType | null>(null)
    const listingRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

    useEffect(() => {
        if (hoveredListing && listingRefs.current[hoveredListing.id]) {
            listingRefs.current[hoveredListing.id]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }, [hoveredListing])

    return (
    <Box key={listings.length} className={`h-full w-full rounded-lg flex p-2 flex-col items-center text-center shadow-lg`} sx={{ backgroundColor: theme.palette.background.paper}}>
        <Filter userInfo={userInfo} setUserInfo={setUserInfo} setIds={setIds} />
        
        <Box className='flex flex-row flex-wrap gap-2 items-start justify-center w-full h-full overflow-y-auto'>

            {(listings as ListingType[]).length > 0 ? (listings as ListingType[]).map((listing) => (
                <div key={listing.id} ref={(el: HTMLDivElement | null) => { listingRefs.current[listing.id] = el }}>
                    <Listing
                    listing={listing}
                    email={userInfo?.email}
                    userInfo={userInfo || undefined}
                    setUserInfo={setUserInfo}
                    onHover={onHover}
                    lastHoveredListing={lastHoveredListing}
                    setLastHoveredListing={setLastHoveredListing}
                    />
                </div>
            )) : (
                <Typography>No listings available</Typography>
            )}
        </Box>
    </Box>
  )
}

export default ListingPage