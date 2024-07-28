// ** Next Imports
import React, { useState } from 'react';

// ** MUI Imports
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Autocomplete from '@mui/material/Autocomplete';

// ** Style Imports
import { useTheme } from '@mui/material/styles';

// ** Type Imports
import { UserPreferencesType, UserType } from '@/utils/types';

// ** Custom Component Imports
import ChatSlider from '@/components/chat-interface/message/message-components/ChatSlider'; // Import the ChatSlider component
import Button from '@mui/material/Button';

interface SettingsPopupProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  userInfo: [UserType, UserPreferencesType] | []; // Adjust the type as per your userInfo structure
  setUserInfo: (userInfo: [UserType, UserPreferencesType] | []) => void;
}

const SettingsPopup: React.FC<SettingsPopupProps> = ({ anchorEl, open, onClose, userInfo, setUserInfo }) => {
  const theme = useTheme();

  const [budget, setBudget] = useState<number[] | undefined>(userInfo[1]?.budget?.L && userInfo[1]?.budget?.L?.length > 0 ? [userInfo?.[1]?.budget?.L[0].N, userInfo?.[1]?.budget?.L[1].N] : [0, 5000000]);
  const [locations, setLocations] = useState<string[]>(userInfo?.[1]?.locations?.L.map((l: { S: string }) => l.S) || []);
  const [houseDescriptions, setHouseDescriptions] = useState<string>(userInfo?.[1]?.house_descriptions?.S || '');
  const [sizeOfHouse, setSizeOfHouse] = useState<number[]>(userInfo[1]?.size_of_house?.L && userInfo[1]?.size_of_house?.L?.length > 0 ? [userInfo?.[1]?.size_of_house?.L[0]?.N, userInfo?.[1]?.size_of_house?.L[1]?.N] : [0, 5000]);
  const [beds, setBeds] = useState<number>(userInfo[1]?.beds_baths?.L[0]?.N || 0);
  const [baths, setBaths] = useState<number>(userInfo[1]?.beds_baths?.L[1]?.N || 0);
  const [propertyType, setPropertyType] = useState<string[]>(userInfo[1]?.property_types?.L?.map((p: { S: string }) => p.S) || []);

  const handleSave = async () => {

    if (userInfo[1]?.user_id && userInfo[1]?.email && budget && budget.length>0)   {
        const userPreferences: UserPreferencesType = {
            user_id: userInfo[1]?.user_id || {S: ''},
            email: userInfo[1]?.email || {S: ''},
            budget: { L: [{N: budget[0]}, {N: budget[1]}] },
            locations: { L: locations.map(l => ({ S: l })) },
            house_descriptions: { S: houseDescriptions },
            size_of_house: { L: sizeOfHouse.map(s => ({ N: s })) },
            beds_baths: { L: [{N: beds}, {N: baths}] },
            property_types: { L: propertyType.map(p => ({ S: p })) },
            clicked: userInfo[1]?.clicked || { L: [] },
            viewed: userInfo[1]?.viewed || { L: [] },
            saved: userInfo[1]?.saved || { L: [] },
            };
            
        try {
            const response = await fetch('/api/auth/user/update-preferences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userPreferences),
            });
            
            if (response.status === 200) {
                console.log('User preferences updated successfully');
                setUserInfo(userInfo[0] ? [userInfo[0], userPreferences]: []);
            } else {
                console.error('Error updating user preferences');
            }
        } catch (error) {
            console.error('Error updating user preferences:', error);
        }
  }
}

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
        height: '400px',
        marginTop: '-10px',
        marginLeft: '1px',
      }}
      
    >
      <Box sx={{
        width: '400px',
        height: '100%',
        border: `1px solid ${theme.palette.divider}`,
      }}>
        <Box p={1} mt={1} className='flex flex-col gap-2 relative'>
        {/* Budget Slider */}
        <Box>

          <Typography color='text.secondary' fontSize={14}>
            Budget: ({(budget?.[0] ?? 0) >= 1000000 ? `${((budget?.[0] ?? 0) / 1000000).toFixed(1)}M` : (budget?.[0] ?? 0) >= 1000 ? `${((budget?.[0] ?? 0) / 1000).toFixed(1)}K` : (budget?.[0] ?? 0)} – {(budget?.[1] ?? 0) >= 1000000 ? `${((budget?.[1] ?? 0) / 1000000).toFixed(1)}M` : (budget?.[1] ?? 0) >= 1000 ? `${((budget?.[1] ?? 0) / 1000).toFixed(1)}K` : (budget?.[1] ?? 0)})
          </Typography>
          <ChatSlider value={budget as number[]} setValue={setBudget} /> 
          </Box>
          <Box>
          <Typography color='text.secondary' fontSize={14}>Locations</Typography>
          <Autocomplete
            size='small'
            multiple
            freeSolo
            options={[]}
            value={locations}
            onChange={(event, newValue) => 
                setLocations(newValue)}
            renderTags={(value: string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  variant="outlined"
                  label={option}
                  size='small'
                  {...getTagProps({ index })}
                  sx={{
                    padding:0
                  }}
                />
              ))
            }
            className='transition-all ease-in-out duration-300'
            sx={{
              width: '100%',
              padding:0,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.divider,
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.text.secondary,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.text.secondary,
                },
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                }}
                sx={{
                  padding:0
                }}
              />
            )}
          />
          </Box>
          <Box>

          <Typography color='text.secondary' fontSize={14}>House Descriptions</Typography>
          <TextField
            value={houseDescriptions}
            onChange={(e) => 
                setHouseDescriptions(e.target.value)}
            multiline
            rows={4}
            fullWidth
            size='small'
            className='transition-all ease-in-out duration-300'
            sx={{
                width: '100%',
                padding:0,
                '& .MuiInputBase-input': {
                    fontSize: '0.875rem', // Decrease the font size
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: theme.palette.divider,
                    },
                    '&:hover fieldset': {
                        borderColor: theme.palette.text.secondary,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: theme.palette.text.secondary,
                    },
                },
            }}
            />
            </Box>
            <Box className='w-[95%]'>

            <Typography color='text.secondary' fontSize={14}>
            Size of House: {sizeOfHouse[0].toLocaleString()} sqft – {sizeOfHouse[1].toLocaleString()} sqft
          </Typography>
          <Slider
            value={sizeOfHouse}
            onChange={(e, newValue) => 
                setSizeOfHouse(newValue as number[])}
            valueLabelDisplay="off"
            min={0}
            max={5000}
            className='ml-1 width-[95%]'
        
            sx={{
              '& .MuiSlider-thumb': {
                  width: 12,
              height: 12,
              },
          }}
            />
            </Box>
          <Box className='flex flex-row items-center justify-left gap-10'>
            <Box className='flex flex-col justify-center'>
                <Typography color='text.secondary' fontSize={14}>Beds</Typography>
                <TextField
                    size='small'
                    type="number"
                    value={beds}
                    onChange={(e) => 
                        setBeds(Math.max(1, Math.min(10, Number(e.target.value))))}
                    className='transition-all ease-in-out duration-300'
                    InputProps={{ inputProps: { min: 1, max: 10, step: 1 } }}
                    sx={{
                       
                    }}
                />
            </Box>
            <Box className='flex flex-col justify-center'>
                <Typography color='text.secondary' fontSize={14}>Baths</Typography>
                <TextField
                    size='small'
                    type="number"
                    value={baths}
                    onChange={(e) => 
                        setBaths(Math.max(1, Math.min(10, Number(e.target.value))))}
                    className='transition-all ease-in-out duration-300'
                    InputProps={{ inputProps: { min: 1, max: 10, step: 1 } }}
                    sx={{
                    padding:0,
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                        borderColor: theme.palette.divider,
                        },
                        '&:hover fieldset': {
                        borderColor: theme.palette.text.secondary,
                        },
                        '&.Mui-focused fieldset': {
                        borderColor: theme.palette.text.secondary,
                        },
                    },
                    }}
                />
            </Box>
          </Box>
          <Box>
          
          <Typography color='text.secondary' fontSize={14}>Property Types</Typography>
          <Select
            multiple
            value={propertyType}
            onChange={(e) =>
                setPropertyType(e.target.value as string[])}
            fullWidth
            className='transition-all ease-in-out duration-300 mb-16'
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            sx={{
              maxHeight: '200px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.divider,
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.text.secondary,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.text.secondary,
                },
              },
            }}
          >
            <MenuItem value="single family">Single Family</MenuItem>
            <MenuItem value="town home">Town Home</MenuItem>
            <MenuItem value="condominium">Condominium</MenuItem>
            <MenuItem value="multi family">Multi Family</MenuItem>
            <MenuItem value="mobile">Mobile</MenuItem>
            <MenuItem value="new construction">New Construction</MenuItem>
          </Select>
        </Box>
        <Box sx={{
          position: 'relative', // Ensure the parent container is relative
          width: '100%',
          height: '100%',
        }}>
          {/* Other content */}
          <Box sx={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
          }}>
            <Button
                variant='outlined'
              onClick={handleSave}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
        </Box>
      </Box>
    </Popover>
  );
};

export default SettingsPopup;