import {useEffect} from 'react';
import { Drawer, Box, Typography, IconButton } from '@mui/material';
import { IconChevronRight } from '@tabler/icons-react';
import { ListingDetailType } from '@/utils/types';
import ImageSlider from './ImageSlider';
import { useTheme } from '@mui/material/styles';
import { updateEngagements } from '@/utils/db';

type ListingDrawerProps = {
  open: boolean;
  onClose: () => void;
  listing: ListingDetailType | null;
  email: string | null | undefined;
};

const ListingDrawer = ({ open, onClose, listing, email }: ListingDrawerProps) => {
  const theme = useTheme();

  const excludedFields = [
    'listings_detail_label',
    'bathrooms',
    'bedrooms',
    'square_footage',
    'listing_detail_price'
  ];

  useEffect(() => {
    if(open && listing && email) {
        updateEngagements(listing?.listings_detail_label?.S, listing?.zipcode?.S, true, true, email)
    }
  }, [open])

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      variant="temporary"
      sx={{
        '& .MuiDrawer-paper': {
          width: '50vw',
          padding: 2,
        },
      }}
    >
      <Box className='p-2'>
        <IconButton onClick={onClose}>
          <IconChevronRight color='white' />
        </IconButton>
        {listing ? (
          <Box className={`flex flex-col gap-2 p-2`} sx={{ background: 'black', border: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="h6">{listing.listings_detail_label?.S} - {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(listing.listing_detail_price?.N))}</Typography>
            <Typography variant="body1">{listing.bedrooms?.N} Bed {listing.bathrooms?.N} Bath {listing.square_footage?.N} sqft</Typography>
            <ImageSlider listing={listing} /> 
            {Object.keys(listing).map((key) => {
              if (!excludedFields.includes(key)) {
                const value = listing[key];
                if (value?.S) {
                  return <Typography key={key} variant="body2">{key}: {value.S}</Typography>;
                } else if (value?.N) {
                  return <Typography key={key} variant="body2">{key}: {value.N}</Typography>;
                }
              }
              return null;
            })}
          </Box>
        ) : (
          <Typography variant="body1">No listing selected</Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default ListingDrawer;