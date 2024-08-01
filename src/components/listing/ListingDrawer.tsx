// ** Next Imports
import {useEffect, useState} from 'react';

// ** MUI Imports
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// ** Icon Imports
import { IconChevronRight, IconBookmark, IconBookmarkFilled } from '@tabler/icons-react';

// ** Type Imports
import { ListingDetailType, ListingRecordType, User } from '@/utils/types';

// ** Utils
import { updateEngagements, saveHouse, deleteSavedHouse } from '@/utils/db';

// ** Custom Imports
import ImageSlider from './ImageSlider';
import { toast, Bounce } from 'react-toastify';

// ** Style Imports
import { useTheme } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';

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

  const excludedFields = [
    'listings_detail_label',
    'bathrooms',
    'bedrooms',
    'square_footage',
    'listing_detail_price'
  ];

  useEffect(() => {
    if (open && listing && email && userInfo?.id) {
      updateEngagements({ listings_detail_label: listing.listings_detail_label?.S, zipcode: listing.zipcode?.S, viewed: true, clicked: true, user: userInfo })
        .then(updatedUser => {
          if (updatedUser) setUserInfo(updatedUser);
        });
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
    if (saved && listing && userInfo?.email && userInfo?.id) {
      const updatedUser = await deleteSavedHouse({ id: listing.listings_detail_label?.S, user: userInfo });
      if (updatedUser) {
        setUserInfo(updatedUser);
        setSaved(false);
        toast('Listing unsaved', {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    } else {
      if (listing && userInfo?.email && userInfo?.id) {
        const updatedUser = await saveHouse({ id: listing.listings_detail_label?.S, user: userInfo });
        if (updatedUser) {
          setUserInfo(updatedUser);
          setSaved(true);
          toast('Listing saved', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        }
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