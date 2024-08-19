// ** Next Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

// ** Type Imports
import { ListingType, User } from '@/utils/types';

// ** Style Imports
import { useTheme } from '@mui/material/styles';

// ** Custom Imports
import { toast } from 'react-toastify';

type ReportPageProps = {
    listing: ListingType;
    open: boolean;
    setOpen: (open: boolean) => void;
    userInfo: User;
}

const ReportPage = ({ listing, open, setOpen, userInfo }: ReportPageProps) => {

  const theme = useTheme();

  const handleClose = () => setOpen(false);
  const handleConfirm = async () => {
    setOpen(false);
    const response = await fetch(`/api/report/create`, {
      method: 'POST',
      body: JSON.stringify({ listing_id: listing.id, user_id: userInfo.id }),
    });
    if (response.status === 200) {
        window.location.href = `/report/${listing.id}`;
    } else{
        toast.error('Failed to create report. Please try again.');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '20vw',
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          border: `2px solid ${theme.palette.divider}`,
          boxShadow: 24,
          p: 4,
          overflowY: 'auto',
          borderRadius: '10px',
        }}
      >
        <Typography fontSize={20} color={theme.palette.text.secondary} sx={{ mb: 2 }}>Report Confirmation</Typography>
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body1" color={theme.palette.text.secondary}>Reports Available</Typography>
            <Typography variant="body1" color={theme.palette.text.secondary}>{userInfo.reports_remaining}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body1" color={theme.palette.text.secondary}>Change in Reports</Typography>
            <Typography variant="body1" color={theme.palette.success.main}>+1</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body1" color={theme.palette.text.secondary}>Reports Left After</Typography>
            <Typography variant="body1" color={theme.palette.text.secondary}>{userInfo.reports_remaining - 1}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, gap: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleClose} 
            className="bg-[#383838] hover:bg-[#383838]/80 text-white"
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleConfirm} 
            className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white"
            sx={{ textTransform: 'none' }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReportPage;