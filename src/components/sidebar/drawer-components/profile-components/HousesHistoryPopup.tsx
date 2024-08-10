// ** Next Imports
import React, { useEffect, useState } from 'react';

// ** MUI Imports
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// ** Style Imports
import { useTheme } from '@mui/material/styles';
import { ListingRecordType, User } from '@/utils/types';
import { Skeleton } from '@mui/material';


interface HousesHistoryPopupProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  userInfo: User | null;
  housesHistory: ListingRecordType[] | undefined;
}

const HousesHistoryPopup = ({ anchorEl, open, onClose, userInfo, housesHistory }: HousesHistoryPopupProps) => {
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
      sx={{
        width: '500px',
        height: '600px',
        marginTop: '-10px',
        marginLeft: '1px',
      }}
      
    >
      <Box sx={{
          width: '400px',
          height: '500px',
          border: `1px solid ${theme.palette.divider}`,
        }}>
          <Box p={1} mt={1} className='flex flex-col gap-2 relative'>
              {housesHistory && housesHistory.length === 0 ? 
                  <Box className=''>
                      <Typography color='text.primary' fontSize={14}>
                          No Listings Visited...
                      </Typography>
                  </Box>
                  :
                  housesHistory && housesHistory.map((housesHistory) => {
                          return (
                              <Box key={housesHistory.id} className='flex flex-col gap-2'>
                                  <Box>
                                      <Typography color='text.primary' fontSize={14}>
                                          {housesHistory.id}
                                      </Typography>
                                  </Box>
                              </Box>

                          )
                  })
              }
            
          </Box>
        </Box>
    </Popover>
  );
};

export default HousesHistoryPopup;