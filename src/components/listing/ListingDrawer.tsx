import {useEffect, useState} from 'react';
import { Drawer, Box, Typography, IconButton, Snackbar, SnackbarOrigin } from '@mui/material';
import { IconChevronRight, IconBookmark, IconBookmarkFilled } from '@tabler/icons-react';
import { ListingDetailType, ListingRecordType, User } from '@/utils/types';
import ImageSlider from './ImageSlider';
import { useTheme } from '@mui/material/styles';
import { updateEngagements, saveHouse, deleteSavedHouse } from '@/utils/db';

type ListingDrawerProps = {
  open: boolean;
  onClose: () => void;
  listing: ListingDetailType | null;
  email: string | null | undefined;
  setUserInfo: (userInfo: User) => void | undefined;
  userInfo: User |undefined;
};

const ListingDrawer = ({ open, onClose, listing, email, setUserInfo, userInfo }: ListingDrawerProps) => {
  const theme = useTheme();
  const [saved, setSaved] = useState<boolean>(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [delSnackOpen, setDelSnackOpen] = useState(false);

  const excludedFields = [
    'listings_detail_label',
    'bathrooms',
    'bedrooms',
    'square_footage',
    'listing_detail_price'
  ];

  useEffect(() => {
      if (open && listing && email && userInfo?.id) {
        updateEngagements({ listings_detail_label: listing.listings_detail_label?.S, zipcode: listing.zipcode?.S, viewed: true, clicked: true, user: userInfo });
      }
    
    if (userInfo?.saved) {
      const savedInfo = userInfo.saved;
      if(listing && listing.listings_detail_label?.S && savedInfo.some((elem: ListingRecordType) => elem.id === listing.listings_detail_label?.S)) {
        setSaved(true);
      } else {
        setSaved(false);
      }
    }
  }, [open])  
  const saveListing = async () => {
    // if saved then add to DB and also to local storage
    // if unsaved then remove from DB and also from local storage
    if (saved && listing && userInfo?.email && userInfo?.id) {
      deleteSavedHouse({ id: listing.listings_detail_label?.S, user: userInfo });
      let filtered = userInfo.saved.filter((val: ListingRecordType) => val.id != listing.listings_detail_label?.S);
      setUserInfo({...userInfo, saved: filtered});
      setSaved(false);
      setDelSnackOpen(true);
    } else {
      if (listing && userInfo?.email && userInfo?.id) {
        saveHouse({ id: listing.listings_detail_label?.S, user: userInfo });
        setSaved(true);
        setUserInfo({...userInfo, saved: [...userInfo.saved, {id: listing.listings_detail_label?.S, engage_date: new Date().toISOString()}]});
        setSnackOpen(true);
      }
    }
  }

  const snackbarOrigin: SnackbarOrigin = { vertical: 'bottom', horizontal: 'right' };

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
            <Box className='flex justify-between'>
              <Typography variant="body1">{listing.bedrooms?.N} Bed {listing.bathrooms?.N} Bath {listing.square_footage?.N} sqft</Typography>
              <IconButton onClick={saveListing}>
                {saved? <IconBookmarkFilled color='white' /> : <IconBookmark color='white' /> }
              </IconButton>
            </Box>
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
            <Snackbar
              ContentProps={{
                sx: {
                  background: theme.palette.divider,
                  color: 'white'
                }
              }}
              anchorOrigin={snackbarOrigin}
              open={snackOpen}
              autoHideDuration={3000}
              onClose={() => setSnackOpen(false)}
              message="listing saved"
            />
            <Snackbar
              ContentProps={{
                sx: {
                  background: theme.palette.divider,
                  color: 'white'
                }
              }}
              anchorOrigin={snackbarOrigin}
              open={delSnackOpen}
              autoHideDuration={3000}
              onClose={() => setDelSnackOpen(false)}
              message= "listing unsaved"
            />
          </Box>
        ) : (
          <Typography variant="body1">No listing selected</Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default ListingDrawer;