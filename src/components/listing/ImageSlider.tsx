import { ListingDetailType } from '@/utils/types'
import React from 'react'
import Carousel from 'react-material-ui-carousel';
import Box from '@mui/material/Box';

const ImageSlider = ({listing}: {listing: ListingDetailType}) => {
  return (
    <Carousel className='transition-all duration-0' autoPlay={false}>
        {listing.property_images?.L.slice().reverse().map((image, index) => (
        <Box key={index} sx={{ position: 'relative', height: 400 }}>
            <img
            src={image.S}
            alt={`listing image ${index + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </Box>
        ))}
    </Carousel>
  )
}

export default ImageSlider