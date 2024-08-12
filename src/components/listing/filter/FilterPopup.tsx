// ** Next Imports
import{ useState } from 'react';

// ** MUI Imports
import { Popover, Typography, Box, TextField, Chip, Select, MenuItem, Slider, Autocomplete } from '@mui/material';

// ** Style Imports
import { useTheme } from '@mui/material/styles';

// ** Custom Component Imports
import ChatSlider from '@/components/chat-interface/message/message-components/ChatSlider';

type FilterPopupProps = {
    type: string;
    anchorEl: HTMLElement;
    open: boolean;
    onClose: () => void;
    value: any;
    setValue: (value: any) => void;
}

const FilterPopup = ({ type, anchorEl, open, onClose, value, setValue }: FilterPopupProps) => {
  
  const theme = useTheme();

  const renderContent = () => {
    switch (type) {
      case 'propertyType':
        return (
          <Box>
            <Typography color='text.secondary' fontSize={14}>Property Types</Typography>
            <Select
              multiple
              value={Array.isArray(value) ? value : []}
              onChange={(e) => setValue(e.target.value)}
              fullWidth
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as string[]).map((value: string) => (
                    <Chip key={value} label={value.split('_').map(word => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)).join(' ')} />
                  ))}
                </Box>
              )}
            >
              <MenuItem value="APARTMENT">Apartment</MenuItem>
              <MenuItem value="CONDOS">Condos</MenuItem>
              <MenuItem value="CONDO_TOWNHOME_ROWHOME_COOP">Condo/Townhome/Rowhome/Co-op</MenuItem>
              <MenuItem value="COOP">Co-op</MenuItem>
              <MenuItem value="DUPLEX_TRIPLEX">Duplex/Triplex</MenuItem>
              <MenuItem value="FARM">Farm</MenuItem>
              <MenuItem value="LAND">Land</MenuItem>
              <MenuItem value="MOBILE">Mobile</MenuItem>
              <MenuItem value="MULTI_FAMILY">Multi Family</MenuItem>
              <MenuItem value="OTHER">Other</MenuItem>
              <MenuItem value="SINGLE_FAMILY">Single Family</MenuItem>
              <MenuItem value="TOWNHOMES">Townhomes</MenuItem>
            </Select>
          </Box>
        );
      case 'budget':
        return (
          <Box>
            <Typography color='text.secondary' fontSize={14}>
              Budget: ({value[0] >= 1000000 ? `${(value[0] / 1000000).toFixed(1)}M` : value[0] >= 1000 ? `${(value[0] / 1000).toFixed(1)}K` : value[0]} – 
              {value[1] >= 1000000 ? `${(value[1] / 1000000).toFixed(1)}M` : value[1] >= 1000 ? `${(value[1] / 1000).toFixed(1)}K` : value[1]})
            </Typography>
            <ChatSlider value={value} setValue={setValue} />
          </Box>
        );
      case 'beds':
        return (
          <Box>
            <Typography color='text.secondary' fontSize={14}>Beds</Typography>
            <TextField
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              InputProps={{ inputProps: { min: 1, max: 10, step: 1 } }}
            />
          </Box>
        );
      case 'baths':
        return (
          <Box>
            <Typography color='text.secondary' fontSize={14}>Baths</Typography>
            <TextField
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              InputProps={{ inputProps: { min: 1, max: 10, step: 1 } }}
            />
          </Box>
        );
      case 'location':
        return (
          <Box>
            <Typography color='text.secondary' fontSize={14}>Locations</Typography>
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={value}
              onChange={(event, newValue) => setValue(newValue)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option} size='small' {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
          </Box>
        );
      case 'houseSize':
        return (
          <Box>
            <Typography color='text.secondary' fontSize={14}>
              Size of House: {value[0].toLocaleString()} sqft – {value[1].toLocaleString()} sqft
            </Typography>
            <Slider
              value={value}
              onChange={(e, newValue) => setValue(newValue as [number, number])}
              valueLabelDisplay="off"
              min={0}
              max={5000}
            />
          </Box>
        );
      case 'houseDescription':
        return (
          <Box>
            <Typography color='text.secondary' fontSize={14}>House Description</Typography>
            <TextField
              multiline
              rows={4}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Box sx={{
        width: '300px',
        padding: 2,
        border: `1px solid ${theme.palette.divider}`,
      }}>
        {renderContent()}
      </Box>
    </Popover>
  );
};

export default FilterPopup;