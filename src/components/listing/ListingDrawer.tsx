import {useEffect, useState} from 'react';
import { Drawer, Box, Typography, IconButton } from '@mui/material';
import { IconChevronRight, IconBookmark, IconBookmarkFilled } from '@tabler/icons-react';
import { ListingDetailType } from '@/utils/types';
import ImageSlider from './ImageSlider';
import { useTheme } from '@mui/material/styles';
import { updateEngagements, addSavedHouse, deleteSavedHouse, fetchUser } from '@/utils/db';

type ListingDrawerProps = {
  open: boolean;
  onClose: () => void;
  listing: ListingDetailType | null;
  email: string | null | undefined;
  setUserInfo: (userInfo: any) => void;
};

const ListingDrawer = ({ open, onClose, listing, email, setUserInfo }: ListingDrawerProps) => {
  const theme = useTheme();
  const [info, setInfo] = useState<any>();
  const [saved, setSaved] = useState<boolean>(false);

  const excludedFields = [
    'listings_detail_label',
    'bathrooms',
    'bedrooms',
    'square_footage',
    'listing_detail_price'
  ];

  useEffect(() => {
    const cachedUserInfo = localStorage.getItem('userInfo');
    if(cachedUserInfo) {
      setInfo(JSON.parse(cachedUserInfo)[1]);
    } else if (email) {
      // fetch user info and populate fields
      fetchUser({ email: email, setUserInfo: setUserInfo })
    }

    if (info && info.saved && info.saved.L) {
      const savedInfo = info.saved.L;
      if(listing && listing.listings_detail_label?.S && savedInfo.some((elem: any) => JSON.stringify({ S: listing.listings_detail_label?.S }) === JSON.stringify(elem))) {
        setSaved(true);
      } else {
        setSaved(false);
      }
    }

    if(open && listing && email) {
        updateEngagements(listing.listings_detail_label?.S, listing.zipcode?.S, true, true, email)
    }
  }, [open])  
  const saveListing = async () => {
    const cachedUserInfo = localStorage.getItem('userInfo');
    let data;
    if(cachedUserInfo) {
      data = JSON.parse(cachedUserInfo);
    }

    // if saved then add to DB and also to local storage
    // if unsaved then remove from DB and also from local storage
    if (saved && listing) {
        deleteSavedHouse(listing.listings_detail_label?.S, info.email.S, info.user_id.S);
        let filtered = data[1].saved.L.filter((val: { S: string; }) => val.S != listing.listings_detail_label?.S);
        data[1].saved.L = filtered;
        localStorage.setItem('userInfo', JSON.stringify(data));
        setSaved(false);
    } else {
      if (listing && info?.email?.S && info?.user_id?.S) {
        addSavedHouse(listing.listings_detail_label?.S, info.email.S, info.user_id.S);
        setSaved(true);
        data[1].saved.L.push({S: listing.listings_detail_label?.S});
        localStorage.setItem('userInfo', JSON.stringify(data));
      }
    }
  }

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
          </Box>
        ) : (
          <Typography variant="body1">No listing selected</Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default ListingDrawer;