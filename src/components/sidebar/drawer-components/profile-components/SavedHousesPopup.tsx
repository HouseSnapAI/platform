// ** Next Imports
import React, { useEffect, useState } from 'react';

// ** MUI Imports
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// ** Style Imports
import { useTheme } from '@mui/material/styles';
import { UserType, UserPreferencesType } from '@/utils/types';
import { Skeleton } from '@mui/material';


interface SavedHousesPopupProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  userInfo: UserPreferencesType | undefined;
  onClose: () => void;
  savedHouses: {S: string}[] | undefined;
}

const SavedHousesPopup: React.FC<SavedHousesPopupProps> = ({ anchorEl, open, userInfo, onClose, savedHouses }) => {
  const theme = useTheme();

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
      {
        savedHouses && savedHouses[0] && 'S' in savedHouses[0] && savedHouses[0].S === "uninit" ?
        <Box sx={{
            width: '400px',
            height: '500px',
            border: `1px solid ${theme.palette.divider}`,
          }}>
            <Box p={1} mt={1} className='flex flex-col gap-2 relative'>
            <Box>
              <Skeleton className='rounded-md w-[100%]' variant='rectangular'/>
            </Box>  
            </Box>
          </Box>
        :
        <Box sx={{
            width: '400px',
            height: '500px',
            border: `1px solid ${theme.palette.divider}`,
          }}>
            <Box p={1} mt={1} className='flex flex-col gap-2 relative'>
                {savedHouses && savedHouses.length === 0 ? 
                    <Box>
                        <Typography color='text.primary' fontSize={14}>
                            No Houses Saved...
                        </Typography>
                    </Box>
                    :
                    savedHouses && savedHouses.map((savedHouse) => {
                        if ('S' in savedHouse) {
                            return (
                                <Box key={savedHouse.S} className='flex flex-col gap-2'>
                                    <Box>
                                        <Typography color='text.primary' fontSize={14}>
                                            {savedHouse.S}
                                        </Typography>
                                    </Box>
                                </Box>

                            )
                        }
                        return null;
                    })
                }
              
            </Box>
          </Box>
      }
    </Popover>
  );
};

export default SavedHousesPopup;