import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PestControlIcon from '@mui/icons-material/PestControl';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import RoofingIcon from '@mui/icons-material/Roofing';
import WaterDamageIcon from '@mui/icons-material/WaterDamage';
import WarningIcon from '@mui/icons-material/Warning';

type DisclosureItem = {
  type: string;
  message: string;
  status: string;
};

type DisclosureAccordionProps = {
  disclosureData: DisclosureItem[];
};

const getColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'good':
      return 'green';
    case 'minor':
      return 'yellow';
    case 'medium':
      return 'orange';
    case 'high':
      return 'red';
    default:
      return 'gray';
  }
};

const getIcon = (type: string, color: string) => {
  const iconProps = { sx: { mr: 1, color } };
  switch (type) {
    case 'pests':
      return <PestControlIcon {...iconProps} />;
    case 'hvac':
      return <AcUnitIcon {...iconProps} />;
    case 'roofing':
      return <RoofingIcon {...iconProps} />;
    case 'flooding':
      return <WaterDamageIcon {...iconProps} />;
    default:
      return <WarningIcon {...iconProps} />;
  }
};

const DisclosureAccordion = ({ disclosureData }: DisclosureAccordionProps) => {
  return (
    <Accordion sx={{ maxHeight: '60vh', overflow: 'auto' }} className='w-full'>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
        aria-controls="disclosure-content"
        id="disclosure-header"
      >
        <Typography>Disclosure</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {disclosureData.map((item) => (
          <Typography key={item.type} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            {getIcon(item.type, getColor(item.status))} {item.type.charAt(0).toUpperCase() + item.type.slice(1)}: {item.message}
          </Typography>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default DisclosureAccordion;