// ** Next Imports
import React from 'react'


// ** MUI Imports
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'

// ** Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// ** Components
import ListingDetails from '../ReportListingDetails'

// ** Types
import { ListingType } from '@/utils/types'

const ListingAccordion = ({listing}: {listing: ListingType}) => {
  return (
    <Accordion sx={{ maxHeight: '60vh', overflow: 'auto' }} className='w-full'>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
            aria-controls="listing-details-content"
            id="listing-details-header"
        >
            <Typography>Listing Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <ListingDetails listing={listing} />
        </AccordionDetails>
    </Accordion>
  )
}

export default ListingAccordion