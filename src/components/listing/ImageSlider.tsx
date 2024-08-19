import { ListingType } from '@/utils/types'
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled, useTheme } from '@mui/system';

const Image = styled('img')({
  minWidth: '100%', // Ensure each image takes up the full width of the container
  height: '100%', // Ensure the image takes up the full height
  objectFit: 'cover',
});

const ImageContainer = styled('div')({
  display: 'flex',
  width: '100%',
  height: '100%', // Ensure the container takes up the full height
  transition: 'transform 0.5s ease-in-out',
});

const Indicator = styled('div')(({ theme, active }: { theme: any, active: boolean }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[400],
  margin: '0 5px',
  transition: 'background-color 0.3s ease',
}));

const IndicatorContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  bottom: 10,
  width: '100%',
  overflowX: 'auto',
  whiteSpace: 'nowrap', // Ensure indicators are in a single line
  scrollbarWidth: 'none', // Hide scrollbar for Firefox
  '&::-webkit-scrollbar': {
    display: 'none', // Hide scrollbar for Chrome, Safari, and Opera
  },
});

const ImageSlider = ({ listing }: { listing: ListingType }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = listing.alt_photos || [];
  const theme = useTheme();

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const container = document.getElementById('indicator-container');
    const activeIndicator = document.getElementById(`indicator-${currentIndex}`);
    if (container && activeIndicator) {
      container.scrollLeft = activeIndicator.offsetLeft - container.offsetWidth / 2 + activeIndicator.offsetWidth / 2;
    }
  }, [currentIndex]);

  return (
    <Box className='rounded-md drop-shadow-lg' sx={{ position: 'relative', height: 400, width: '100%', overflow: 'hidden' }}>
      {images.length > 0 && (
        <ImageContainer style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((src, index) => (
            <Image key={index} src={src} alt={`listing image ${index + 1}`} />
          ))}
        </ImageContainer>
      )}
      <IconButton
        onClick={handlePrev}
        sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}
      >
        <ArrowBackIosIcon className="text-white"/>
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
      >
        <ArrowForwardIosIcon className="text-white" />
      </IconButton>
      <IndicatorContainer id="indicator-container">
        {images.map((_, index) => (
          <Indicator key={index} id={`indicator-${index}`} active={index === currentIndex} theme={theme} />
        ))}
      </IndicatorContainer>
    </Box>
  );
};

export default ImageSlider;