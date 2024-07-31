// ** Next Imports
import * as React from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

// ** Style Imports
import { useTheme } from '@mui/material/styles';

const scale = (value: number) => {
  let result: number;
  if (value <= 66) {
    result = (value / 66) * 1000000;
  } else {
    result = 1000000 + ((value - 66) / 34) * 4000000;
  }
  return Math.round(result / 1000) * 1000; // Round to nearest thousand
};

const inverseScale = (value: number) => {
  if (value <= 1000000) {
    return (value / 1000000) * 66;
  } else {
    return 66 + ((value - 1000000) / 4000000) * 34;
  }
};

export default function ChatSlider({value, setValue}: {value: [number,number], setValue: (value: [number, number]) => void}) {

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue((newValue as [number, number]).map(v => Math.round(scale(v) / 1000) * 1000) as [number, number]);
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