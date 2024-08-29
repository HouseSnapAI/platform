// ** Next Imports
import React, {useState} from 'react'


// ** MUI Imports
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

// ** Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// ** Types
import { MarketTrendsType, ListingType, RecentSoldProperty } from '@/utils/types'

const MarketTrendsAccordion = ({marketTrends, listing}: {marketTrends: MarketTrendsType, listing: ListingType}) => {
    const [open, setOpen] = useState(false);

    
  //  MARKET TRENDS
  const renderTableCell = (value: any, compareValue: any, format: string, compare: boolean) => {
    const formatNumber = (num: any) => Number(num).toLocaleString();
    const formatCurrency = (num: any) => `$${Number(num).toLocaleString()}`;
    const formatDate = (date: any) => new Date(date).toLocaleDateString();

    const formatValue = (val: any, fmt: string) => {
      switch (fmt) {
        case 'currency':
          return formatCurrency(val);
        case 'date':
          return formatDate(val);
        case 'number':
        default:
          return formatNumber(val);
      }
    };

    if (compare && typeof value === 'number' && typeof compareValue === 'number') {
      if (value === -1) value = 0;
      if (compareValue === -1) compareValue = 0;
      const diff = compareValue - value;
      const diffPercentage = ((diff / value) * 100).toFixed(1);
      return (
        <TableCell>
          {formatValue(compareValue, format)} {diff !== 0 && <span style={{ color: diff > 0 ? 'green' : 'red' }}>{diff > 0 ? `↑${diffPercentage}%` : `↓${diffPercentage}%`}</span>}
        </TableCell>
      );
    }
    return <TableCell>{compareValue === -1 ? '' : formatValue(compareValue, format)}</TableCell>;
  }


    const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    
  return (
    <>
    <Accordion sx={{ maxHeight: '60vh', overflow: 'auto' }} className='w-full'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
            aria-controls="comparable-homes-content"
            id="comparable-homes-header"
          >
            <Box className='flex items-center gap-2'>
              <Typography>Comparable Homes</Typography>
              <IconButton onClick={handleClickOpen} sx={{ marginLeft: 'auto', padding:0 }}>
                <FullscreenIcon sx={{ color: 'white' }} />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box className='h-full overflow-y-auto'>
              <Box sx={{ overflowX: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Attribute</TableCell>
                      <TableCell>Listing</TableCell>
                      {marketTrends.recent_sold_properties.map((home: RecentSoldProperty, index: number) => (
                        <TableCell key={index}>Comparable {index + 1}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { label: 'List Price', key: 'list_price', value: listing.list_price, format: 'currency', compare: true },
                      { label: 'Sold Price', key: 'sold_price', value: listing.sold_price, format: 'currency', compare: true },
                      { label: 'Sold Date', key: 'last_sold_date', value: listing.last_sold_date, format: 'date', compare: false },
                      { label: 'Days on Market', key: 'days_on_mls', value: listing.days_on_mls, format: 'number', compare: true },
                      { label: 'Sq Ft', key: 'sqft', value: listing.sqft, format: 'number', compare: true },
                      { label: 'Price per Sq Ft', key: 'price_per_sqft', value: listing.price_per_sqft, format: 'currency', compare: true },
                      { label: 'Beds', key: 'beds', value: listing.beds, format: 'number', compare: true },
                      // @ts-ignore
                      { label: 'Baths', key: 'full_baths', value: (listing.full_baths?.toString() != "-1" ? listing.full_baths : 0) + (listing.half_baths?.toString() != "-1" ? listing.half_baths : 0), format: 'number', compare: true  },
                      { label: 'Lot Size (Sq Ft)', key: 'lot_sqft', value: listing.lot_sqft, format: 'number', compare: true },
                      { label: 'Parking', key: 'parking_garage', value: listing.parking_garage, format: 'number', compare: true },
                    ].map((row: any, rowIndex: number) => (
                      <TableRow key={rowIndex}>
                        <TableCell>{row.label}</TableCell>
                        <TableCell>{row.value === -1 ? '' : row.value}</TableCell>
                        {marketTrends.recent_sold_properties.map((home: RecentSoldProperty, colIndex: number) => (
                          renderTableCell(row.value === -1 ? 0 : row.value, home[row.key as keyof RecentSoldProperty] === -1 ? 0 : home[row.key as keyof RecentSoldProperty], row.format, row.compare)
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </AccordionDetails>
          </Accordion> 

          <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
            <DialogContent>
              <Box sx={{ overflowX: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Attribute</TableCell>
                      <TableCell>Listing</TableCell>
                      {marketTrends.recent_sold_properties.map((home: RecentSoldProperty, index: number) => (
                        <TableCell key={index}>Comparable {index + 1}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { label: 'List Price', key: 'list_price', value: listing.list_price, format: 'currency', compare: true },
                      { label: 'Sold Price', key: 'sold_price', value: listing.sold_price, format: 'currency', compare: true },
                      { label: 'Sold Date', key: 'last_sold_date', value: listing.last_sold_date, format: 'date', compare: false },
                      { label: 'Days on Market', key: 'days_on_mls', value: listing.days_on_mls, format: 'number', compare: true },
                      { label: 'Sq Ft', key: 'sqft', value: listing.sqft, format: 'number', compare: true },
                      { label: 'Price per Sq Ft', key: 'price_per_sqft', value: listing.price_per_sqft, format: 'currency', compare: true },
                      { label: 'Beds', key: 'beds', value: listing.beds, format: 'number', compare: true },
                      // @ts-ignore
                      { label: 'Baths', key: 'full_baths', value: (listing.full_baths?.toString() != "-1" ? listing.full_baths : 0) + (listing.half_baths?.toString() != "-1" ? listing.half_baths : 0), format: 'number', compare: true },
                      { label: 'Lot Size (Sq Ft)', key: 'lot_sqft', value: listing.lot_sqft, format: 'number', compare: true },
                      { label: 'Parking', key: 'parking_garage', value: listing.parking_garage, format: 'number', compare: true },
                    ].map((row: any, rowIndex: number) => (
                      <TableRow key={rowIndex}>
                        <TableCell>{row.label}</TableCell>
                        <TableCell>{row.value === -1 ? '' : row.value}</TableCell>
                        {marketTrends.recent_sold_properties.map((home: RecentSoldProperty, colIndex: number) => (
                          renderTableCell((row.value === -1 ? 0 : row.value), (home[row.key as keyof RecentSoldProperty] === -1 ? 0 : home[row.key as keyof RecentSoldProperty]), row.format, row.compare)
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </DialogContent>
          </Dialog>
    </>
  )
}

export default MarketTrendsAccordion