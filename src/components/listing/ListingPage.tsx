// ** Next Imports
import React, { useState, useEffect, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

// ** Theme Imports
import { useTheme } from '@mui/material/styles'

// ** Type Imports
import { ListingType, User } from '@/utils/types';

// ** Custom Components
import Filter from './filter'
import Listing from './Listing';
import ListingDrawer from './ListingDrawer';

// ** Icon Imports
import { IconSparkles, IconUser } from '@tabler/icons-react'
import ListingActionItems from './filter/ListingActionItems'

type ListingPageProps = {
    userInfo: User | null
    setUserInfo: (userInfo: User | null) => void
    listings: Partial<ListingType>[]
    setIds: (data: string[]) => void
    onHover: (listing: ListingType | null) => void
    hoveredListing: Partial<ListingType> | null
    selectedListing: ListingType | 'loading' | null
    setSelectedListing: (listing: ListingType | 'loading' | null) => void
    callFunction: boolean
}

const ListingPage = ({userInfo, setUserInfo, listings, setIds, onHover, hoveredListing, selectedListing, setSelectedListing, callFunction}: ListingPageProps) => {

    const theme = useTheme()
    const [lastHoveredListing, setLastHoveredListing] = useState<ListingType | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const listingRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

    useEffect(() => {
        if (hoveredListing && listingRefs.current[hoveredListing.id as string]) {
            listingRefs.current[hoveredListing.id as string]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }, [hoveredListing])

    return (
    <Box key={listings.length} className={`h-full w-full p-2 rounded-lg flex flex-col items-center text-center shadow-lg`} sx={{ backgroundColor: theme.palette.background.paper}}>
        {selectedListing ?
            <ListingActionItems userInfo={userInfo} listing={selectedListing} />
         : 
            <Filter userInfo={userInfo} setUserInfo={setUserInfo} setIds={setIds} setIsLoading={setIsLoading} callFunction={callFunction} />}
        
        <Box className='flex flex-row flex-wrap gap-2 items-start justify-center w-full h-full overflow-y-auto'>

            {selectedListing ? (
                <ListingDrawer
                    listing={selectedListing}
                    email={userInfo?.email}
                    setUserInfo={setUserInfo}
                    userInfo={userInfo || undefined}
                    onClose={() => {
                      sessionStorage.removeItem('listing')
                      sessionStorage.removeItem('listingObj')
                      setSelectedListing(null)
                      console.log("SETTING LISTING TO NULL")
                    }}
                />
            ) : (
                (listings as ListingType[]).length > 0 ? (isLoading ? (
                    Array.from(new Array(12)).map((_, index) => (
                        <Box key={index} sx={{ width: 180, margin: 1 }}>
                            <Skeleton variant="rectangular" width={180} height={110} />
                            <Skeleton width="60%" />
                            <Skeleton width="80%" />
                        </Box>
                    ))
                ) : (listings as ListingType[]).map((listing) => (
                    <div key={listing.id} ref={(el: HTMLDivElement | null) => { listingRefs.current[listing.id] = el }}>
                        <Listing
                            listing={listing}
                            email={userInfo?.email}
                            userInfo={userInfo || undefined}
                            setUserInfo={setUserInfo}
                            onHover={onHover}
                            lastHoveredListing={lastHoveredListing}
                            setLastHoveredListing={setLastHoveredListing}
                            setSelectedListing={setSelectedListing}
                        />
                    </div>
                ))) : (
                    <Typography>No listings available</Typography>
                )
            )}
        </Box>
    </Box>
  )
}

export default ListingPage