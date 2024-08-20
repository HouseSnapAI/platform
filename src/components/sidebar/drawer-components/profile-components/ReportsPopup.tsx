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


interface ReportsPopupProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  userInfo: User | null;
  reports: any[] | null;
}

const ReportsPopup = ({ anchorEl, open, onClose, userInfo, reports }: ReportsPopupProps) => {
  const theme = useTheme();
  
  useEffect(() => {
    console.log(reports);
  }, [reports])

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
          width: `400px`,
          border: `1px solid ${theme.palette.divider}`,
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Box p={1} mt={1} className=''>
            <Box className='flex flex-col gap-2 relative justify-center items-center pb-[20px]'>
                <Box className={`flex justify-center items-center`}>
                    <Typography className='w-[180px] h-[35px]  justify-center items-center flex rounded-md drop-shadow-lg' color='text.primary' fontSize={18}>Reports</Typography>
                </Box>
                <Box className='flex flex-col gap-2 relative items-center'>
                    {
                        reports?.length == 0 ?
                            <Typography className="text-[#ababab]">No reports yet...</Typography>
                        :
                        
                            reports && reports.map((report) => {
                                return (
                                    <Box>
                                        <Typography>{report.id}</Typography>
                                    </Box>
                                )
                            })
                        
                    }
                </Box>
            </Box>
            
          </Box>
        </Box>
    </Popover>
  );
};

export default ReportsPopup;