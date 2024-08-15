// ** Next Imports
import React, { useEffect, useState } from 'react';

// ** MUI Imports
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


interface HouseCardProps {
    listing: Partial<ListingType>;
    setSelectedListing: (listing: ListingType | 'loading' | null) => void;
    handleClose: () => void;
    onClose: () => void;
}

const HouseCard = ({ listing, setSelectedListing, handleClose, onClose }: HouseCardProps) => {

    const handleClick = async () => {
        onClose();
        handleClose();
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

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
    }

  return (
    <>
      <Box 
        className={`group flex flex-col items-center h-[200px] w-[220px] justify-center p-3 border-[1px] cursor-pointer border-[#393939] rounded-sm ease-in-out duration-300`}
        sx={{
          backgroundColor: 'transparent',
        }}
        onClick={handleClick}
      >
        <Box sx={{ width: 148.8*1, height: 94*1 , position: 'relative' }}>
            <Image src={listing?.primary_photo || ""} alt='listing image' layout='fill' objectFit='cover' />
        </Box>
        <Typography variant='body2' className='text-center text-white/70 group-hover:text-white ease-in-out duration-300'>
          {`${listing?.full_street_line} `}
        </Typography>
        <Typography variant='caption' className='text-center text-white/70 group-hover:text-white ease-in-out duration-300'>{listing?.beds} Bed {listing?.full_baths || 0 + (listing?.half_baths || 0)} Bath {listing?.sqft} sqft - <span className="font-semibold">{formatPrice(Number(listing?.list_price))}</span></Typography>
      </Box>
    </>
  )
};

export default HouseCard;