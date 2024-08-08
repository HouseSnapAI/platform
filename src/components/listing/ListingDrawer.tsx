// ** Next Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// ** Icon Imports
import { IconChevronLeft, IconBookmark, IconBookmarkFilled } from '@tabler/icons-react';

// ** Type Imports
import { ListingRecordType, ListingType, User } from '@/utils/types';

// ** Util Imports
import { updateEngagements, saveHouse, deleteSavedHouse } from '@/utils/db';

// ** Custom Components
import ImageSlider from './ImageSlider';

// ** Toast Imports
import { toast, Bounce } from 'react-toastify';

// ** Style Imports
import { useTheme } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';

type ListingDrawerContentProps = {
  listing: ListingType;
  email: string | null | undefined;
  setUserInfo: (userInfo: User) => void | undefined;
  userInfo: User | undefined;
  onClose: () => void;
};

const ListingDrawerContent = ({ listing, email, setUserInfo, userInfo, onClose }: ListingDrawerContentProps) => {
  const theme = useTheme();
  const [saved, setSaved] = useState<boolean>(false);

  const excludedFields = [
    'listings_detail_label',
    'bathrooms',
    'bedrooms',
    'square_footage',
    'listing_detail_price',
    'id',
    'embedding',
    'created_at',
    'updated_at',
    'primary_photo',
    'alt_photos',
    'geom'
  ];

  useEffect(() => {
    if (listing && email && userInfo?.id) {
      updateEngagements({ id: listing.id, listing: listing, viewed: true, clicked: true, user: userInfo })
        .then(updatedUser => {
          if (updatedUser) setUserInfo(updatedUser);
        });
    }

    if (userInfo?.saved) {
      const savedInfo = userInfo.saved;
      if (listing && listing.id && savedInfo.some((elem: ListingRecordType) => elem.id === listing.id)) {
        setSaved(true);
      } else {
        setSaved(false);
      }
    }
  }, [listing]);

  const saveListing = async () => {
    if (saved && listing && userInfo?.email && userInfo?.id) {
      setSaved(false);
      const updatedUser = await deleteSavedHouse({ id: listing.id, user: userInfo, listing: listing });
      if (updatedUser) {
        setUserInfo(updatedUser);
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
        setSaved(true);
        const updatedUser = await saveHouse({ id: listing.id, user: userInfo, listing: listing });
        if (updatedUser) {
          setUserInfo(updatedUser);
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
  };

  return (
    <Box className={`flex flex-col gap-2 p-2`}>
      <Box className='flex justify-between items-center'>
        <Box className='bg-[#343434] rounded-lg w-[40px] pr-[2px] h-[35px] shadow-lg hover:shadow-xl hover:bg-[#303030] transition-all ease-in-out duration-300 hover:cursor-pointer flex justify-center items-center' onClick={onClose}>
          <IconChevronLeft color='white' />
        </Box>
        <Typography variant="h6" color='white' style={{ whiteSpace: 'pre-wrap' }}>
          {listing?.full_street_line} - {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(listing?.list_price))}
        </Typography>
        <Box></Box>
      </Box>
      <Box className='flex justify-between'>
        <Typography fontSize={14} className='text-white' color='white' style={{ whiteSpace: 'pre-wrap' }}>
          {listing?.beds}  Bed {listing?.full_baths + (listing?.half_baths || 0)} Bath {listing?.sqft} sqft
        </Typography>
        <IconButton onClick={saveListing} >
          {saved ? <IconBookmarkFilled color='white' /> : <IconBookmark color='white' />}
        </IconButton>
      </Box>
      <ImageSlider listing={listing} />
      {Object.keys(listing || {}).map((key: string) => {
        if (!excludedFields.includes(key)) {
          const value: any = listing?.[key as keyof ListingType];
          if (value) {
            return <Typography key={key} fontSize={12} className='text-wrap' style={{ whiteSpace: 'pre-wrap' }}>
              {key}: {value}
            </Typography>;
          }
        }
        return null;
      })}
      
    </Box>
  );
};

export default ListingDrawerContent;