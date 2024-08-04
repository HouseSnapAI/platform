// ** Next Imports
import * as React from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

// ** Style Imports
import { useTheme } from '@mui/material/styles';

const scale = (value: number) => {
  let result: number;
  if (value <= 66.67) { // First 2/3 of the slider (0 to 66.67)
    result = (value / 66.67) * 1000000; // Scale from 0 to 1 million
  } else { // Last 1/3 of the slider (66.67 to 100)
    result = 1000000 + ((value - 66.67) / 33.33) * 4000000; // Scale from 1 million to 5 million
  }
  return Math.round(result / 1000) * 1000; // Round to nearest thousand
};

const inverseScale = (value: number) => {
  if (value <= 1000000) {
    return (value / 1000000) * 66.67; // Inverse scale for 0 to 1 million
  } else {
    return 66.67 + ((value - 1000000) / 4000000) * 33.33; // Inverse scale for 1 million to 5 million
  }
};

const formatValue = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

export default function ChatSlider({value, setValue}: {value: [number,number], setValue: (value: [number, number]) => void}) {

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue((newValue as [number, number]).map(v => Math.round(scale(v) / 1000) * 1000) as [number, number]);
  };

  const theme = useTheme();

  return (
    <Box className='flex min-w-[100px]'>
        
      <Slider
        getAriaLabel={() => 'Budget range'}
        value={value.map(inverseScale)}
        defaultValue={[0, 66, 100]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(v) => formatValue(scale(v))}
        min={0}
        max={100}
        step={0.01} // Add this line for smoother sliding
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