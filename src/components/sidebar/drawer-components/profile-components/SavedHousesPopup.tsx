// ** Next Imports
import React, { useEffect, useState } from 'react';

// ** MUI Imports
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// ** Style Imports
import { useTheme } from '@mui/material/styles';
import { ListingRecordType, ListingType, User } from '@/utils/types';
import { Fade, Grow, Skeleton } from '@mui/material';
import HouseCard from './house-card/HouseCard';


interface SavedHousesPopupProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  userInfo: User | null;
  savedHouses: ListingRecordType[] | undefined;
  setSelectedListing: (listing: ListingType | 'loading' | null) => void;
  handleClose: () => void;
}

const SavedHousesPopup = ({ anchorEl, open, onClose, userInfo, savedHouses, setSelectedListing, handleClose }: SavedHousesPopupProps) => {
  const theme = useTheme();
  
  // useEffect(() => {
  //   console.log(savedHouses);
  // }, [savedHouses])

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      TransitionComponent={Fade}
      sx={{
        marginTop: '-10px',
        marginLeft: '1px',
      }}
      
    >
      <Box sx={{
          maxHeight: '500px',
          minHeight: '300px',
          width: `${(savedHouses?.length == 1 || savedHouses?.length == 0) ? '250px' : '480px'}`,
          border: `1px solid ${theme.palette.divider}`,
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Box p={1} mt={1} className=''>
              {savedHouses && savedHouses.length === 0 ? 
                  <Box className=''>
                      <Typography color='text.primary' fontSize={14}>
                          No Houses Saved...
                      </Typography>
                  </Box>
                  :
                  <Box className='flex flex-col gap-2 relative justify-center items-center pb-[20px]'>
                    <Box className={`flex justify-center items-center`}>
                      <Typography className='w-[180px] h-[35px]  justify-center items-center flex rounded-md drop-shadow-lg' color='text.primary' fontSize={18}>Saved Houses</Typography>
                    </Box>
                    <Box className='flex gap-2 relative flex-wrap justify-center'>
                      {
                        savedHouses && savedHouses
                          .sort((a: ListingRecordType, b: ListingRecordType) => {
                            const dateA = new Date(a.engage_date).getTime();
                            const dateB = new Date(b.engage_date).getTime();
                            return dateB - dateA; // Sort in descending order
                          })
                          .map((savedHouse) => {
                          return (
                                <HouseCard onClose={onClose} handleClose={handleClose} setSelectedListing={setSelectedListing} listing={savedHouse} />
                          )
                        })
                      }
                    </Box>
                  </Box>
              }
            
          </Box>
        </Box>
    </Popover>
  );
};

export default SavedHousesPopup;