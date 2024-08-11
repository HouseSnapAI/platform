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
import ListingDrawer from './ListingDrawer';

// ** Icon Imports
import { IconSparkles, IconUser } from '@tabler/icons-react'

type ListingPageProps = {
    userInfo: User | null
    setUserInfo: (userInfo: User | null) => void
    listings: ListingType[]
    setIds: (data: string[]) => void
    onHover: (listing: ListingType | null) => void
    hoveredListing: ListingType | null
    selectedListing: ListingType | null
    setSelectedListing: (listing: ListingType | null) => void
}

const ListingPage = ({userInfo, setUserInfo, listings, setIds, onHover, hoveredListing, selectedListing, setSelectedListing}: ListingPageProps) => {

    const theme = useTheme()
    const [lastHoveredListing, setLastHoveredListing] = useState<ListingType | null>(null)
    const listingRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

    useEffect(() => {
        if (hoveredListing && listingRefs.current[hoveredListing.id]) {
            listingRefs.current[hoveredListing.id]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }, [hoveredListing])

    return (
    <Box key={listings.length} className={`h-full w-full p-2 rounded-lg flex flex-col items-center text-center shadow-lg`} sx={{ backgroundColor: theme.palette.background.paper}}>
        {selectedListing ?
            <Box className="h-[40px] w-full rounded-lg px-2 flex items-center justify-between gap-2 mb-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <Button 
                    variant="contained" 
                    onClick={()=>null}
                    className="bg-green-500 hover:bg-green-700 text-white text-transform-none"
                    sx={{textTransform: 'none'}}
                    startIcon={<IconSparkles color='white' stroke={1.5} />}
                    >
                    Get a Report
                </Button>
                <Button 
                    variant="contained" 
                    onClick={()=>null}
                    className="bg-blue-500 hover:bg-blue-700 text-white text-transform-none"
                    sx={{textTransform: 'none'}}
                    startIcon={<IconUser color='white' stroke={1.5} />}
                    >
                    Get Connected to a local Expert
                </Button>
            </Box> 
         : 
            <Filter userInfo={userInfo} setUserInfo={setUserInfo} setIds={setIds} />}
        
        <Box className='flex flex-row flex-wrap gap-2 items-start justify-center w-full h-full overflow-y-auto'>

            {selectedListing ? (
                <ListingDrawer
                    listing={selectedListing}
                    email={userInfo?.email}
                    setUserInfo={setUserInfo}
                    userInfo={userInfo || undefined}
                    onClose={() => {
                      setSelectedListing(null)
                      sessionStorage.removeItem('listing')
                      sessionStorage.removeItem('listingObj')
                    }}
                />
            ) : (
                (listings as ListingType[]).length > 0 ? (listings as ListingType[]).map((listing) => (
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
                )) : (
                    <Typography>No listings available</Typography>
                )
            )}
        </Box>
    </Box>
  )
}

export default ListingPage