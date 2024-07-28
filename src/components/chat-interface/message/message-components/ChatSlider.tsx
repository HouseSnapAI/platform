// ** Next Imports
import * as React from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

// ** Style Imports
import { useTheme } from '@mui/material/styles';

const scale = (value: number) => {
  if (value <= 66) {
    return (value / 66) * 1000000;
  } else {
    return 1000000 + ((value - 66) / 34) * 4000000;
  }
};

const inverseScale = (value: number) => {
  if (value <= 1000000) {
    return (value / 1000000) * 66;
  } else {
    return 66 + ((value - 1000000) / 4000000) * 34;
  }
};

export default function ChatSlider({value, setValue}: {value: number[], setValue: (value: number[]) => void}) {

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue((newValue as number[]).map(scale));
  };

  const theme = useTheme();

  return (
    <Box className=' w-[95%] flex'>
        
      <Slider
        getAriaLabel={() => 'Budget range'}
        value={value.map(inverseScale)}
        defaultValue={[0, 66, 100]}
        onChange={handleChange}
        valueLabelDisplay="off"
        min={0}
        max={100}
        className='ml-1'
        
        sx={{
          '& .MuiSlider-thumb': {
              width: 12,
              height: 12,
          },
      }}
      />
      
    </Box>
  );
}