// ** Next Imports
import React, { useEffect, useState } from 'react';

// ** MUI Imports
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// ** Style Imports
import { useTheme } from '@mui/material/styles';
import { ListingRecordType, ListingType, User } from '@/utils/types';
import { Fade, Skeleton } from '@mui/material';
import HouseCard from './house-card/HouseCard';


interface HousesHistoryPopupProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  userInfo: User | null;
  housesHistory: ListingRecordType[] | undefined;
  setSelectedListing: (listing: ListingType | 'loading' | null) => void;
  handleClose: () => void;
}

const HousesHistoryPopup = ({ anchorEl, open, onClose, userInfo, housesHistory, setSelectedListing, handleClose }: HousesHistoryPopupProps) => {
  const theme = useTheme();

  useEffect(() => {
    // if(userInfo?.clicked == null || userInfo?.clicked == undefined) {
    //   return;
    // }

    // let temp: ListingRecordType[] = [];
    // let idTracker: string[] = [];

    // userInfo.clicked.forEach((element) => {
    //   if (!idTracker.includes(element.id)) {
    //     temp.push((element));
    //     idTracker.push(element.id);
    //   }
    // })
    // setHousesHistory(temp);
    // console.log(userInfo.clicked);
    // console.log(temp);
  }, [])
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
          width: `${housesHistory?.length == 1 ? '250px' : '480px'}`,
          border: `1px solid ${theme.palette.divider}`,
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Box p={1} mt={1} className=''>
              {housesHistory && housesHistory.length === 0 ? 
                  <Box className=''>
                      <Typography color='text.primary' fontSize={14}>
                          No Houses Saved...
                      </Typography>
                  </Box>
                  :
                  <Box className='flex flex-col gap-2 relative justify-center items-center pb-[20px]'>
                    <Box className={`flex justify-center items-center`}>
                      <Typography className='w-[180px] h-[35px]  justify-center items-center flex rounded-md drop-shadow-lg' color='text.primary' fontSize={18}>Visited Listings</Typography>
                    </Box>
                    <Box className='flex gap-2 relative flex-wrap justify-center'>
                      {
                        housesHistory && housesHistory.map((houseHistory) => {
                          return (
                                <HouseCard onClose={onClose} handleClose={handleClose} setSelectedListing={setSelectedListing} listing={houseHistory} />
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

export default HousesHistoryPopup;