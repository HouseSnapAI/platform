// ** Next Imports
import React, { useState } from 'react';

// ** MUI Imports
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface ChatBooleanProps {
  buttonOneText: string;
  buttonTwoText: string;
  onButtonClick: (button: boolean) => void;
  selected: boolean | null;
}

const ChatBoolean: React.FC<ChatBooleanProps> = ({ buttonOneText, buttonTwoText, onButtonClick, selected }) => {
  const [disabled, setDisabled] = useState(false);

  const handleClick = (button: boolean) => {
    setDisabled(true);
    onButtonClick(button);
  };

  return (
    <Box className='flex gap-8 w-1/2'>
      <Button
        variant="contained"
        onClick={() => handleClick(true)}
        disabled={disabled}
        color='secondary'
        className={`flex-1 py-3 ${selected === true ? 'disabled:bg-blue-500' : 'disabled:bg-white'}`}
        size='small'
      >
        {buttonOneText}
      </Button>
      <Button
        variant="contained"
        onClick={() => handleClick(false)}
        size='small'
        disabled={disabled}
        color='secondary'
        className={`flex-1 py-3 ${selected === false ? 'disabled:bg-red-500' : 'disabled:bg-white'}`}
      >
        {buttonTwoText}
      </Button>
    </Box>
  );
};

export default ChatBoolean;
