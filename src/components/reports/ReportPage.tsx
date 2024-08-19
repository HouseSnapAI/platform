import { useEffect, useState } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { ListingType, User } from '@/utils/types';

const ReportPage = ({ listing, open, setOpen, user }: { listing: ListingType, open: boolean, setOpen: (open: boolean) => void, user: User }) => {
  const [data, setData] = useState(null);
  const [lambdaFinished, setLambdaFinished] = useState(false);

  useEffect(() => {
    console.log('Setting up EventSource');
    const clientId = user.id;
    const eventSource = new EventSource(`/api/report/event?clientId=${clientId}`);

    eventSource.onmessage = async (event) => {
      console.log('Received event:', event);
      const message = JSON.parse(event.data);
      console.log('Parsed message:', message);
      if (message === 'Database updated') {
        console.log('Database updated message received');
        const response = await fetch(`/api/report/${listing.id}`);
        const updatedData = await response.json();
        console.log('Fetched updated data:', updatedData);
        setData(updatedData);
      } else if (message === 'Lambda finished') {
        console.log('Lambda finished message received');
        setLambdaFinished(true);
      }
    };

    return () => {
      console.log('Closing EventSource');
      eventSource.close();
    };
  }, [user]);

  const handleClose = () => setOpen(false);

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
          width: '80vw',
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          overflowY: 'auto',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Report Data
        </Typography>
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
        {lambdaFinished && (
          <Typography variant="body1" color="success">
            Lambda has finished running.
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default ReportPage;