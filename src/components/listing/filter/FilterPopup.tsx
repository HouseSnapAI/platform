// ** Next Imports
import React from 'react';

// ** MUI Imports
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';

// ** Style Imports
import { useTheme } from '@mui/material/styles';

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
            <Typography color='text.primary' fontSize={14} fontWeight={600} sx={{marginBottom: 1}}>Property Types</Typography>
            <Select
              multiple
              value={Array.isArray(value) ? value : []}
              onChange={(e) => setValue(e.target.value)}
              fullWidth
              size='small'
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as string[]).map((value: string) => (
                    <Chip color='secondary' key={value} label={value.split('_').map(word => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)).join(' ')} />
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
            <Typography color='text.primary' fontSize={14} fontWeight={600} sx={{marginBottom: 1}}>
              Budget <span style={{color: theme.palette.text.secondary}}> ({value[0] >= 1000000 ? `${(value[0] / 1000000).toFixed(1)}M` : value[0] >= 1000 ? `${(value[0] / 1000).toFixed(1)}K` : value[0]} – 
              {value[1] >= 1000000 ? `${(value[1] / 1000000).toFixed(1)}M` : value[1] >= 1000 ? `${(value[1] / 1000).toFixed(1)}K` : value[1]})</span>
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <TextField
                type="number"
                value={value[0]}
                onChange={(e) => setValue([Number(e.target.value), value[1]])}
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField
                type="number"
                value={value[1]}
                onChange={(e) => setValue([value[0], Number(e.target.value)])}
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Box>
          </Box>
        );
      case 'beds':
        return (
          <Box>
            <Typography color='text.primary' fontSize={14} fontWeight={600} sx={{marginBottom: 1}}>Beds</Typography>
            <TextField
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              size="small"
              InputProps={{ inputProps: { min: 1, max: 10, step: 1 } }}
            />
          </Box>
        );
      case 'baths':
        return (
          <Box>
            <Typography color='text.primary' fontSize={14} fontWeight={600} sx={{marginBottom: 1}}>Baths</Typography>
            <TextField
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              size="small"
              InputProps={{ inputProps: { min: 1, max: 10, step: 1 } }}
            />
          </Box>
        );
      case 'location':
        return (
          <Box>
            <Typography color='text.primary' fontSize={14} fontWeight={600} sx={{marginBottom: 1}}>Locations</Typography>
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
            <Typography color='text.primary' fontSize={14} fontWeight={600} sx={{marginBottom: 1}}>
              Size of House <span style={{color: theme.palette.text.secondary}}> ({value[0].toLocaleString()} sqft – {value[1].toLocaleString()} sqft)</span>
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <TextField
                type="number"
                value={value[0]}
                onChange={(e) => setValue([Number(e.target.value), value[1]])}
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField
                type="number"
                value={value[1]}
                onChange={(e) => setValue([value[0], Number(e.target.value)])}
                size="small"
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Box>
          </Box>
        );
      case 'houseDescription':
        return (
          <Box>
            <Typography color='text.primary' fontSize={14} fontWeight={600} sx={{marginBottom: 1}}>House Description</Typography>
            <TextField
              multiline
              rows={4}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
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
      sx={{ '& .MuiInputBase-input': { paddingRight: "4px", paddingLeft: "8px", paddingTop: "2px", paddingBottom: "2px" } }}
    >
      <Box sx={{
        maxWidth: '300px',
        padding: 2,
        // border: `1px solid ${theme.palette.divider}`,
        boxShadow: 2,
      }}>
        {renderContent()}
      </Box>
    </Popover>
  );
};

export default FilterPopup;