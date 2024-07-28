// ** Next Imports
import React, { useState } from 'react'
import Image from "next/legacy/image"

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Types Imports
import { ListingDetailType } from '@/utils/types'

// ** Components Imports
import ListingDrawer from './ListingDrawer'

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
}

const Listing = ({listing, email}: {listing: ListingDetailType, email: string|null|undefined}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Box className='group flex flex-col items-center w-min justify-center p-4 border-[1px] border-[#393939] rounded-sm transition-all duration-300 hover:bg-[#4a4a4a]/30 hover:cursor-pointer'
        onClick={handleOpenDrawer}
      >
        <Box sx={{ width: 148.8*2, height: 94*2, position: 'relative' }}>
            <Image src={listing?.property_images?.L[listing?.property_images?.L.length-1]?.S || ""} alt='listing image' layout='fill' objectFit='cover' />
        </Box>
        <Typography variant='subtitle1' className='text-center text-white/70 group-hover:text-white ease-in-out duration-300'>
          {listing?.listings_detail_label?.S}
        </Typography>
        <Typography variant='subtitle2' className='text-center text-white/70 group-hover:text-white ease-in-out duration-300'>{listing?.bedrooms?.N} Bed {listing?.bathrooms?.N} Bath {listing?.square_footage?.N} sqft - <span className="font-semibold text-md">{formatPrice(Number(listing?.listing_detail_price?.N))}</span></Typography>
      </Box>
      <ListingDrawer open={drawerOpen} onClose={handleCloseDrawer} listing={listing} email={email} />
    </>
  )
}

export default Listing