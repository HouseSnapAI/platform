// ** Next Imports
import * as React from 'react';
import { useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Grow from '@mui/material/Grow';

// ** Style Imports
import { useTheme } from '@mui/material/styles';

// ** Type Imports
import { DrawerContentType } from '@/utils/types';

// ** Util Imports
import { drawerComponents } from './drawer-components/vars';

interface PersistentDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
  content: DrawerContentType;
}

export default function PersistentDrawer({ open, handleDrawerClose, content }: PersistentDrawerProps) {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(open);

  React.useEffect(() => {
    if (open) {
      setIsVisible(true);
    }
  }, [open]);

  const handleClose = () => {
    handleDrawerClose();
    setTimeout(() => setIsVisible(false), 300);
  };

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <CssBaseline />
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        TransitionComponent={Grow}
        PaperProps={{
          sx: {
            position: 'absolute',
            top: 0,
            left: 1,
            margin: 1,
            height: 400, 
            width: 250,  
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: '#171717', // Slightly lighter than background.paper
            display: isVisible ? 'block' : 'none', // Hide the component when not visible
          },
        }}
        BackdropProps={{
          style: {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Typography fontSize={16} paddingLeft={1} marginTop={1} paddingBottom={1} borderBottom={`1px solid ${theme.palette.divider}`}>{content.title}</Typography>
          {drawerComponents[content.component]}
      </Dialog>
    </Box>
  );
}