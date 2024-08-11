// ** Next Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

// ** Icon Imports
import { IconChevronLeft, IconBookmark, IconBookmarkFilled, IconTools, IconBuildingCommunity, IconSchool, IconCar, IconCalendar, IconMoneybag, IconRuler, IconMapPin, IconHome } from '@tabler/icons-react';

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
import MortgageMonthlyCalc from './MortgageMonthlyCalc';

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

  const excludedFields: (keyof ListingType)[] = [
    'full_baths',
    'half_baths',
    'sqft',
    'list_price',
    'id',
    'embedding',
    'created_at',
    'updated_at',
    'primary_photo',
    'alt_photos',
    'geom',
    'property_url',
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

  const handleGetConnected = () => {
    // Logic to handle the "Get Connected to an Expert" action
    console.log("Get Connected to an Expert button clicked");
  };

  console.log("LISTING HOA FEE",listing.hoa_fee)

  return (
    <Box className="flex flex-col gap-2 p-2 relative w-full" sx={{ backgroundColor: '#121212', color: 'white', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box className="w-full" sx={{ width: 300, padding: 2, backgroundColor: '#1e1e1e', borderRadius: 2, flex: '1 1 auto', overflowY: 'auto' }}>
        <Box className={`flex flex-col gap-2 w-full mb-2`}>
          <Box className='flex justify-between items-center'>
            <Box className='flex gap-2'>
              <Box className='bg-[#343434] rounded-lg w-[40px] pr-[2px] h-[35px] shadow-lg hover:shadow-xl hover:bg-[#303030] transition-all ease-in-out duration-300 hover:cursor-pointer flex justify-center items-center' onClick={onClose}>
                <IconChevronLeft color='white' />
              </Box>
              <Box className='flex flex-col items-start'>
              <Typography fontSize={12} color='textSecondary'>
                  {listing.agent_email !== '-1' ? (
                    <Link href={`mailto:${listing.agent_email}`} color='textSecondary' sx={{ textDecoration: 'none' }}>
                      {listing.agent}
                    </Link>
                  ) : (
                    `${listing.agent}`
                  )}
                </Typography>
                <Typography fontSize={12} variant="body2" noWrap color="textSecondary">
                  {listing.broker_website !== '-1' ? (
                    <Link href={listing.broker_website} color='textSecondary' target="_blank" rel="noopener">
                      {listing.broker}
                    </Link>
                  ) : (
                    `${listing.broker}`
                  )}
                </Typography>
              </Box> 
            </Box>
            <Box className='flex items-center'>
              <Chip label={listing.property_type.split('_').map(word => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)).join(' ')} sx={{ marginRight: 1, backgroundColor: '#444', color: 'white' }} />
              <Chip label={listing.status.split('_').map(word => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)).join(' ')} sx={{ marginRight: 1, backgroundColor: '#444', color: 'white' }} />
              <IconButton onClick={saveListing} className='mr-[-12px]' >
                {saved ? <IconBookmarkFilled color='white' /> : <IconBookmark color='white' />}
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
          <ImageSlider listing={listing} />
          <Box className='flex justify-between items-start my-6 flex-wrap gap-2'>
            <Box className='flex flex-col items-start'>
              <Typography variant="h6" sx={{ color: 'white' }}>
                ${listing.list_price.toLocaleString()}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">{listing.full_street_line}, {listing.city}, {listing.state} {listing.zip_code}</Typography>
            </Box>
            <Box className='flex items-start gap-8'>
              <Box className='flex flex-col items-start'>
                <Typography variant="h6" sx={{ color: 'white'}}>
                  {listing.beds}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">Beds</Typography>
              </Box>
              <Box className='flex flex-col items-start'>
              <Typography variant="h6" sx={{ color: 'white'}}>
                  {listing.full_baths + (listing.half_baths || 0)}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">Baths</Typography>
              </Box>
              <Box className='flex flex-col items-start'>
              <Typography variant="h6" sx={{ color: 'white'}}>
                  {listing.sqft.toLocaleString()}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">Sqft</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ backgroundColor: '#444' }} />
        <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 2, padding: 2, marginTop: 2, boxShadow: 3 }}>
          <Typography variant="body1" sx={{ color: 'white', lineHeight: 1.6, textAlign: 'left' }}>
            {listing.text}
          </Typography>
        </Box>
        <List>
          <ListItem>
            <ListItemIcon> <IconTools color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
            <ListItemText primary={`${listing.year_built}`} primaryTypographyProps={{ color: 'white' }} />
          </ListItem>
          <ListItem>
            <ListItemIcon> <IconBuildingCommunity color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
            <ListItemText primary={`${listing.neighborhoods?.join(', ')}`} primaryTypographyProps={{ color: 'white' }} />
          </ListItem>
          <ListItem>
            <ListItemIcon> <IconSchool color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
            <ListItemText primary={`${listing.nearby_schools?.join(', ')}`} primaryTypographyProps={{ color: 'white' }} />
          </ListItem>
          <ListItem>
            <ListItemIcon> <IconCar color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
            <ListItemText primary={`${parseInt(listing.parking_garage == '-1' || listing.parking_garage === undefined ? '0' : listing.parking_garage as string)}`} primaryTypographyProps={{ color: 'white' }} />
          </ListItem>
          <ListItem>
            <ListItemIcon> <IconCalendar color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
            <ListItemText primary={`Days on MLS: ${listing.days_on_mls}`} primaryTypographyProps={{ color: 'white' }} />
          </ListItem>
          <ListItem>
            <ListItemIcon> <IconCalendar color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
            <ListItemText 
              primary={`List Date: ${new Date(listing?.list_date || '').toLocaleDateString()}`} 
              primaryTypographyProps={{ color: 'white' }} 
            />
          </ListItem>
          {listing.sold_price && (
            <ListItem>
                <ListItemIcon> <IconMoneybag color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
                <ListItemText primary={`Sold Price: $${listing.sold_price.toLocaleString()}`} primaryTypographyProps={{ color: 'white' }} />
            </ListItem>
          )}
          {listing.last_sold_date && (
            <ListItem>
                <ListItemIcon> <IconCalendar color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
                <ListItemText primary={`Last Sold Date: ${new Date(listing?.last_sold_date || '').toLocaleDateString()}`} primaryTypographyProps={{ color: 'white' }} />
            </ListItem>
          )}
          {listing.assessed_value && (
            <ListItem>
                <ListItemIcon> <IconMoneybag color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
                <ListItemText primary={`Assessed Value: $${listing.assessed_value.toLocaleString()}`} primaryTypographyProps={{ color: 'white' }} />
            </ListItem>
          )}
          {listing.estimated_value && (
            <ListItem>
                <ListItemIcon> <IconMoneybag color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
                <ListItemText primary={`Estimated Value: $${listing.estimated_value.toLocaleString()}`} primaryTypographyProps={{ color: 'white' }} />
            </ListItem>
          )}
          {listing.lot_sqft && (
            <ListItem>
                <ListItemIcon> <IconRuler color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
                <ListItemText primary={`Lot Sqft: ${listing.lot_sqft}`} primaryTypographyProps={{ color: 'white' }} />
            </ListItem>
          )}
          {listing.price_per_sqft && (
            <ListItem>
                <ListItemIcon> <IconMoneybag color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
                <ListItemText primary={`Price per Sqft: ${listing.price_per_sqft}`} primaryTypographyProps={{ color: 'white' }} />
            </ListItem>
          )}
          {listing.county && (
            <ListItem>
                <ListItemIcon> <IconMapPin color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
                <ListItemText primary={`County: ${listing.county}`} primaryTypographyProps={{ color: 'white' }} />
            </ListItem>
          )}
          <ListItem>
              <ListItemIcon> <IconHome color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
              <ListItemText primary={`HOA Fees: $${listing?.hoa_fee?.toLocaleString()}`} primaryTypographyProps={{ color: 'white' }} />
          </ListItem>
        </List>
        <Divider sx={{ backgroundColor: '#444' }} />
        <Box className="text-center items-center justify-between gap-2 mt-2 flex">
          <Box className='flex flex-col items-start justify-start'>
            <Typography fontSize={12} variant="body2" noWrap color="textSecondary">MLS: {listing.mls}</Typography>
            <Typography fontSize={12} variant="body2" noWrap color="textSecondary">MLS ID: {listing.mls_id}</Typography>
          </Box>
          <Box className='flex flex-col items-start'>
            <Typography fontSize={12} variant="body2" noWrap color="textSecondary">
              {listing.agent_email !== '-1' ? (
                <Link href={`mailto:${listing.agent_email}`} color='textSecondary' sx={{ textDecoration: 'none' }}>
                  {listing.agent}
                </Link>
              ) : (
                `${listing.agent}`
              )}
            </Typography>
            <Typography fontSize={12} variant="body2" noWrap color="textSecondary">{listing.agent_email}</Typography>
          </Box>
          <Box className='flex flex-col items-start'>
            <Typography fontSize={10} variant="body2" noWrap color="textSecondary">
              {listing.broker_website !== '-1' ? (
                <Link href={listing.broker_website} color='textSecondary' target="_blank" rel="noopener">
                  {listing.broker}
                </Link>
              ) : (
                `${listing.broker}`
              )}
            </Typography>
            <Typography fontSize={12} variant="body2" noWrap color="textSecondary">{listing.broker_phone}</Typography>
          </Box>
        </Box>
        <MortgageMonthlyCalc listing={listing} />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: '#121212',
        }}
      >
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleGetConnected}
          sx={{ backgroundColor: '#1e88e5', color: 'white', textTransform: 'none' }}
        >
          Get Connected to an Expert
        </Button>
      </Box>
    </Box>
  );
};

export default ListingDrawerContent;