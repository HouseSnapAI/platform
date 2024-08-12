// ** Next Imports
import React, { useState, useRef, useEffect } from 'react'
import Image from "next/legacy/image"

// ** Toast Imports
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system';

// ** Types Imports
import { ListingType, User } from '@/utils/types'

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
}

const BlinkingBox = styled(Box)(({ theme }) => ({
  transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
  '&.blink-rapidly': {
    animation: 'blink-background-accelerate 2s ease-in-out',
  },
  '&:hover': {
    backgroundColor: 'rgba(74, 74, 74, 0.5)',
  },
}));

const Listing = ({ listing, onHover, lastHoveredListing, setLastHoveredListing, setSelectedListing }: {
  listing: ListingType,
  email: string | null | undefined,
  userInfo: User | undefined,
  setUserInfo: (data: User) => void | undefined,
  onHover: (listing: ListingType | null) => void,
  lastHoveredListing: ListingType | null,
  setLastHoveredListing: (listing: ListingType | null) => void,
  setSelectedListing: (listing: ListingType | 'loading' | null) => void
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
    hoverTimeoutRef.current = setTimeout(() => {
      onHover(listing);
      setLastHoveredListing(listing);
    }, 2000);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // onHover(null);
  };

  const handleClick = async () => {
    setSelectedListing('loading');
    try {
      const response = await fetch('/api/listing/fetch/single', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: listing.id }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const fetchedListing = await response.json();
      setSelectedListing(fetchedListing);
    } catch (error) {
      console.error('Failed to fetch listing:', error);
      toast('Error fetching listing. Please try again.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setSelectedListing(null);
    }
  };

  return (
    <>
      <BlinkingBox 
        className={`group flex flex-col items-center h-[200px] w-[200px] justify-center p-3 border-[1px] cursor-pointer ${lastHoveredListing?.id === listing.id ? 'border-blue-500' : 'border-[#393939]'} rounded-sm ${isHovering && lastHoveredListing?.id !== listing.id ? 'blink-rapidly' : ''} ease-in-out duration-300`}
        sx={{
          backgroundColor: 'transparent',
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box sx={{ width: 148.8*1, height: 94*1 , position: 'relative' }}>
            <Image src={listing?.primary_photo || ""} alt='listing image' layout='fill' objectFit='cover' />
        </Box>
        <Typography variant='body2' className='text-center text-white/70 group-hover:text-white ease-in-out duration-300'>
          {`${listing?.full_street_line} `}
        </Typography>
        <Typography variant='caption' className='text-center text-white/70 group-hover:text-white ease-in-out duration-300'>{listing?.beds} Bed {listing?.full_baths + (listing?.half_baths || 0)} Bath {listing?.sqft} sqft - <span className="font-semibold">{formatPrice(Number(listing?.list_price))}</span></Typography>
        {lastHoveredListing?.id === listing.id && (
          <Typography variant='caption' className='text-center text-white/70 group-hover:text-white ease-in-out duration-300'>
            SnapScore: 68
          </Typography>
        )}
      </BlinkingBox>
    </>
  )
}

export default Listing