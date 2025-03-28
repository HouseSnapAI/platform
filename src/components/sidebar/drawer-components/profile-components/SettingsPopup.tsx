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
import { User } from '@/utils/types';

// ** Custom Component Imports
import ChatSlider from '@/components/chat-interface/message/message-components/ChatSlider'; // Import the ChatSlider component
import Button from '@mui/material/Button';

interface SettingsPopupProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  userInfo: User | null; // Adjust the type as per your userInfo structure
  setUserInfo: (userInfo: User | null) => void;
}

const SettingsPopup: React.FC<SettingsPopupProps> = ({ anchorEl, open, onClose, userInfo, setUserInfo }) => {
  const theme = useTheme();

  const [budget, setBudget] = useState<[number, number]>(userInfo?.min_budget && userInfo?.max_budget ? [userInfo?.min_budget, userInfo?.max_budget] : [0, 5000000]);
  const [locations, setLocations] = useState<string[]>(userInfo?.location || []);
  const [houseDescriptions, setHouseDescriptions] = useState<string>(userInfo?.house_description || '');
  const [sizeOfHouse, setSizeOfHouse] = useState<[number, number]>(userInfo?.min_size_of_house && userInfo?.max_size_of_house ? [userInfo?.min_size_of_house, userInfo?.max_size_of_house] : [0, 5000]);
  const [beds, setBeds] = useState<number>(userInfo?.beds || 0);
  const [baths, setBaths] = useState<number>(userInfo?.baths || 0);
  const [propertyType, setPropertyType] = useState<string[]>(userInfo?.property_types || []);

  const handleBedsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBeds(Number(e.target.value));
  };

  const handleBathsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaths(Number(e.target.value));
  };

  const enforceMinMax = (value: number) => {
    return Math.max(1, Math.min(10, value));
  };

  const handleSave = async () => {

    if (userInfo)   {
        const userPreferences: Partial<User>  = {
            min_budget: budget[0],
            max_budget: budget[1],
            location: locations,
            house_description: houseDescriptions,
            min_size_of_house: sizeOfHouse[0],
            max_size_of_house: sizeOfHouse[1],
            beds,
            baths,
            property_types: propertyType,
        };
        try {
            const updateUser = await fetch('/api/auth/user/update', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: userInfo.id, ...userPreferences}),
            });
            
            if (updateUser.status === 200) {
                setUserInfo(userInfo ? {...userInfo, ...userPreferences} : null);
                localStorage.setItem('userInfo', JSON.stringify(userInfo ? {...userInfo, ...userPreferences} : null));
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
          <ChatSlider value={budget} setValue={setBudget} /> 
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
                setSizeOfHouse(newValue as [number, number])}
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
                    onChange={handleBedsChange}
                    onBlur={() => setBeds(enforceMinMax(beds))}
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
                    onChange={handleBathsChange}
                    onBlur={() => setBaths(enforceMinMax(baths))}
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