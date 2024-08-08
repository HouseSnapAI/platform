// ** Next Imports
import React, { useState, useEffect, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// ** Theme Imports
import { useTheme } from '@mui/material/styles'

// ** Type Imports
import { ListingType, User } from '@/utils/types';

// ** Custom Components
import Filter from './filter'
import Listing from './Listing';
import ImageSlider from './ImageSlider'
import ListingDrawer from './ListingDrawer';

// ** Icon Imports
import { IconChevronLeft } from '@tabler/icons-react'

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
    <Box key={listings.length} className={`h-full w-full rounded-lg flex p-2 flex-col items-center text-center shadow-lg`} sx={{ backgroundColor: theme.palette.background.paper}}>
        <Filter userInfo={userInfo} setUserInfo={setUserInfo} setIds={setIds} />
        
        <Box className='flex flex-row flex-wrap gap-2 items-start justify-center w-full h-full overflow-y-auto'>

            {selectedListing ? (
                <ListingDrawer
                    listing={selectedListing}
                    email={userInfo?.email}
                    setUserInfo={setUserInfo}
                    userInfo={userInfo || undefined}
                    onClose={() => setSelectedListing(null)}
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