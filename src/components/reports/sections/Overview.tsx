'use client';

// ** Next Imports
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Chip from '@mui/material/Chip'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'

// ** Style
import { useTheme, alpha } from '@mui/material/styles';
import { hexToRgb } from '@mui/system';

// ** Tabler Icons
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube, IconHome, IconInfoCircle, IconMinus, IconPlus, IconSend, IconSparkles, IconWorld } from '@tabler/icons-react';
  
// ** Map
import Map, { NavigationControl, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// ** Types
import { CensusData, ComparableHome, HomeDetails, ListingType, MarketTrendsType, RecentSoldProperty, Report, TopSchools } from '@/utils/types'

// ** Utils
import { exampleHomeDetails } from '@/utils/vars'

// ** Components
import ListingDetails from './ReportListingDetails'

// ** Chart Imports
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { ChartOptions } from 'chart.js';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



type OverviewProps = {
    data: Report
    listing: ListingType
}

const Overview = ({ data, listing }: OverviewProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mapBoxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;
  const homeDetails: HomeDetails = data.home_details ? JSON.parse(data.home_details) : exampleHomeDetails;
  const marketTrends: MarketTrendsType = JSON.parse(data.market_trends);
  const topSchools: TopSchools = JSON.parse(data.top_schools);

  const theme = useTheme();

  // Ensure longitude and latitude are defined
  const longitude = listing.longitude !== undefined ? listing.longitude : -77.0364;
  const latitude = listing.latitude !== undefined ? listing.latitude : 38.8951;

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

  // DEMOGRAPHICS
  const censusData: CensusData = JSON.parse(data.census_data);

    const createChartData = (columns:any[]) => columns.map((col:any) => ({
        name: col.Description,
        estimate: col.Estimate,
        error: col.Error,
    }));

    const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // const randomColors = Array.from({ length: 8 }, generateRandomColor);

    const renderBarChart = (columns: any[], color: string) => {
        const rgbColor = hexToRgb(color);
        return (
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={createChartData(columns)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip contentStyle={{ backgroundColor: theme.palette.background.paper}} />
                    <Bar dataKey="estimate" fill={alpha(rgbColor, 0.2)} stroke={rgbColor} />
                </BarChart>
            </ResponsiveContainer>
        );
    };

    const maleIndex = censusData.B01001.Columns.findIndex((col:any) => col.Description === 'Male:');
    const femaleIndex = censusData.B01001.Columns.findIndex((col:any) => col.Description === 'Female:');

    const maleToFemaleColumns = censusData.B01001.Columns.slice(maleIndex, femaleIndex);
    const femaleToEndColumns = censusData.B01001.Columns.slice(femaleIndex);

    const getMedianAgeRange = (columns: any[]) => {
        const mid = Math.floor(columns.length / 2);
        return columns.length % 2 !== 0 ? columns[mid].Description : `${columns[mid - 1].Description} - ${columns[mid].Description}`;
    };

  return (
    <Box className="flex w-full items-center justify-evenly" sx={{ height: '80vh', overflow: 'hidden' }}>
      <Box className='w-[700px] h-full overflow-y-auto pb-10'>
        <Box className="w-full py-2 flex flex-col items-center gap-2 px-2 ">
          {/* Listing Details Accordion */}
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

          {/* Home Details Accordion */}
          <Accordion sx={{ maxHeight: '60vh', overflow: 'auto' }} className='w-full'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls="home-details-content"
              id="home-details-header"
            >
              <Typography>Home Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {homeDetails.home_details.map((detail, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Box mb={2}>
                      <Typography fontSize={14}>
                        {detail.label}
                      </Typography>
                      <ul>
                        {detail.details.map((item, idx) => (
                          <li key={idx}>
                            <Typography fontSize={14} color="text.secondary">{item}</Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Neighborhood KPIs Accordion */}
          <Accordion sx={{ maxHeight: '60vh', overflow: 'auto' }} className='w-full'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls="neighborhood-kpis-content"
              id="neighborhood-kpis-header"
            >
              <Typography>Neighborhood KPIs</Typography>
            </AccordionSummary>
            <AccordionDetails className='w-full'>
              <Box className='w-full flex'>
                {homeDetails.neighborhood_kpis && (
                  <Box className='w-full flex flex-col gap-2'>
                    {homeDetails.neighborhood_kpis.map((kpi, index) => (
                      <Box key={index} className='w-full flex items-center justify-between'>
                        <Typography fontSize={14} noWrap>
                          {kpi.title}
                        </Typography>
                        <Typography fontSize={14} noWrap color="text.secondary">{kpi.text}</Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Location Overview Accordion */}
          <Accordion sx={{ maxHeight: '60vh', overflow: 'auto' }} className='w-full'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls="location-overview-content"
              id="location-overview-header"
              sx={{ overflow: 'auto' }}
            >
              <Typography>Location Overview</Typography>
            </AccordionSummary>
            <AccordionDetails className='relative'>
              <Box sx={{ height: '250px' }} className='bg-black'>
                <Map
                  mapboxAccessToken={mapBoxToken}
                  initialViewState={{
                    longitude: longitude,
                    latitude: latitude,
                    zoom: 14
                  }}
                  style={{ width: '100%', height: '100%' }}
                  mapStyle={"mapbox://styles/mapbox/dark-v11"}
                >
                  <NavigationControl position="top-right" />
                  <Marker longitude={longitude} latitude={latitude}>
                    <Box
                      sx={{
                        width: '25px',
                        height: '25px',
                        borderRadius: '50%',
                        backgroundColor: 'green',
                        cursor: 'pointer',
                      }}
                    />
                  </Marker>
                </Map>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Tax History Accordion */}
          <Accordion sx={{ maxHeight: '60vh',  overflow: 'auto' }} className='w-full'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls="tax-history-content"
              id="tax-history-header"
              sx={{ overflow: 'auto' }}
            >
              <Typography>Tax History</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {homeDetails.tax_history && (
                    <Box className='h-full overflow-y-auto'>
                        <Box mt={2}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography fontSize={14} sx={{ flex: 1 }}>
                              Year
                            </Typography>
                            <Typography fontSize={14} sx={{ flex: 2 }}>
                              Tax Paid
                            </Typography>
                            <Typography fontSize={14} sx={{ flex: 3 }}>
                              Assessment
                            </Typography>
                            <Typography fontSize={14} sx={{ flex: 2 }}>
                              Land
                            </Typography>
                            <Typography fontSize={14} sx={{ flex: 2 }}>
                              Improvement
                            </Typography>
                          </Box>
                          {homeDetails.tax_history.map((tax, index) => (
                            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography fontSize={14} color="text.secondary" sx={{ flex: 1 }}>
                                {tax.year}
                              </Typography>
                              <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                                {tax.tax_paid}
                              </Typography>
                              <Typography fontSize={14} color="text.secondary" sx={{ flex: 3 }}>
                                {tax.tax_assessment}
                              </Typography>
                              <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                                {tax.land}
                              </Typography>
                              <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                                {tax.improvement}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                )}
            </AccordionDetails>
          </Accordion>

          {/* Price History Accordion */}
          <Accordion sx={{ maxHeight: '60vh', overflow: 'auto' }} className='w-full'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls="price-history-content"
              id="price-history-header"
            >
              <Typography>Price History</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {homeDetails.price_history && (
                    <Box className='h-full overflow-y-auto'>
                        <Box mt={2}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography fontSize={14} sx={{ flex: 3 }}>
                              Date
                            </Typography>
                            <Typography fontSize={14} sx={{ flex: 2 }}>
                              Status
                            </Typography>
                            <Typography fontSize={14} sx={{ flex: 2 }}>
                              Price
                            </Typography>
                            <Typography fontSize={14} sx={{ flex: 2 }}>
                              Change
                            </Typography>
                            <Typography fontSize={14} sx={{ flex: 2 }}>
                              Sq Ft Price
                            </Typography>
                          </Box>
                          {homeDetails.price_history.map((price, index) => (
                            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography fontSize={14} color="text.secondary" sx={{ flex: 3 }}>
                                {price.date}
                              </Typography>
                              <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                                {price.event}
                              </Typography>
                              <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                                {price.price}
                              </Typography>
                              <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                                {price.change}
                              </Typography>
                              <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                                {price.sq_ft_price}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                )}
            </AccordionDetails>
          </Accordion>

          {/* Deed History Accordion */}
          <Accordion sx={{ maxHeight: '60vh', overflow: 'auto' }} className='w-full'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls="deed-history-content"
              id="deed-history-header"
            >
              <Typography>Deed History</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {homeDetails.deed_history && (
                    <Box className='h-full overflow-y-auto'>
                        <Box mt={2}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography fontSize={14} sx={{ flex: 2 }}>
                              Date
                            </Typography>
                            <Typography fontSize={14} sx={{ flex: 2 }}>
                              Type
                            </Typography>
                            <Typography fontSize={14} sx={{ flex: 2 }}>
                              Price
                            </Typography>
                            <Typography fontSize={14} sx={{ flex: 2 }}>
                              Title Company
                            </Typography>
                          </Box>
                          {homeDetails.deed_history.map((deed, index) => (
                            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                                {deed.date}
                              </Typography>
                              <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                                {deed.type}
                              </Typography>
                              <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                                {deed.sale_price}
                              </Typography>
                              <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                                {deed.title_company}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                )}
            </AccordionDetails>
          </Accordion>

          {/* Mortgage History Accordion */}
          <Accordion sx={{ maxHeight: '60vh', overflow: 'auto' }} className='w-full'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls="mortgage-history-content"
              id="mortgage-history-header"
            >
              <Typography>Mortgage History</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {homeDetails.mortgage_history && (
                    <Box className='h-full overflow-y-auto'>
                        <Box mt={2}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography fontSize={14} sx={{ flex: 2 }}>
                              Date
                            </Typography>
                            <Typography fontSize={14} sx={{ flex: 2 }}>
                              Status
                            </Typography>
                            <Typography fontSize={14} sx={{ flex: 2 }}>
                              Loan Amount
                            </Typography>
                            <Typography fontSize={14} sx={{ flex: 2 }}>
                              Loan Type
                            </Typography>
                          </Box>
                          {homeDetails.mortgage_history.map((mortgage, index) => (
                            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                                {mortgage.date}
                              </Typography>
                              <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                                {mortgage.status}
                              </Typography>
                              <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                                {mortgage.loan_amount}
                              </Typography>
                              <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                                {mortgage.loan_type}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                )}
            </AccordionDetails>
          </Accordion>

          {/* Comparable Homes Accordion */}
        {/* Comparable Homes Accordion */}
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
          
          {/* School Scores Accordion */}
          <Accordion sx={{ maxHeight: '60vh', overflow: 'auto' }} className='w-full'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls="school-scores-content"
              id="school-scores-header"
            >
              <Typography>School Scores</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Typography fontSize={16} fontWeight={600} sx={{ marginBottom: 2 }}>Overall School Score: {data.school_score.toFixed(0)}</Typography>
                {['elementary', 'middle', 'high'].map((level) => (
                  <Accordion key={level}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                      aria-controls={`${level}-schools-content`}
                      id={`${level}-schools-header`}
                    >
                      <Typography>{`${level.charAt(0).toUpperCase() + level.slice(1)} Schools`}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {topSchools[level as keyof TopSchools].map((school, index) => (
                        <Accordion key={index}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                            aria-controls={`${level}-school-${index}-content`}
                            id={`${level}-school-${index}-header`}
                          >
                            <Box className='flex justify-between items-center w-full'>
                              <Typography fontSize={14}>{school.Name}</Typography>
                              <Typography fontSize={14} color={school.Score > 80 ? "success.main" : "error.main"}>
                                {school.Score?.toFixed(0) || 'N/A'}
                              </Typography>
                            </Box>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Box className='flex justify-between items-center'>
                              <Typography fontSize={14} color="text.secondary">{school.Address || 'N/A'} {school.City || 'N/A'}, {school.Zip || 'N/A'}</Typography>
                            </Box>
                            <Box className='flex justify-between items-center'>
                              <Typography fontSize={14} color="text.primary">Distance: {school.Distance || 'N/A'}</Typography>
                              {parseFloat(school.Distance || '0') > 1.5 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
                            </Box>
                            <Box className='flex justify-between items-center'>
                              <Typography fontSize={14} color="text.secondary">Grades: {school.Grades || 'N/A'}</Typography>
                            </Box>
                            <Box className='flex justify-between items-center'>
                              <Typography fontSize={14} color="text.secondary">Phone: {school.Phone || 'N/A'}</Typography>
                            </Box>
                            <Box className='flex justify-between items-center'>
                              <Typography fontSize={14} color="text.primary">Enrollment: {school.Enrollment || 'N/A'}</Typography>
                              {school["Student/\nTeacher Ratio"] > 30 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
                            </Box>
                            <Box className='flex justify-between items-center'>
                              <Typography fontSize={14} color="text.primary">Student/Teacher Ratio: {school["Student/\nTeacher Ratio"] || 'N/A'}</Typography>
                              {school["Student/\nTeacher Ratio"] > 30 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
                            </Box>
                            <Box className='flex justify-between items-center'>
                              <Typography fontSize={14} color="text.primary">Full-time Teachers: {school["Full-time Teachers"] || 'N/A'}</Typography>
                            </Box>
                            <Box className='flex justify-between items-center'>
                              <Typography fontSize={14} color="text.primary">State Percentile: {school["State Percentile (2023)"] || 'N/A'}</Typography>
                              {parseFloat(school["State Percentile (2023)"] || '0') < 80 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
                            </Box>
                            <Box className='flex justify-between items-center'>
                              <Typography fontSize={14} color="text.secondary">Statewide Rank: {school["Statewide Rank (2023)"] || 'N/A'}</Typography>
                            </Box>
                            <Box className='flex justify-between items-center'>
                              <Typography fontSize={14} color="text.primary">Average Standard Score: {school["Average Standard Score (2023)"] || 'N/A'}</Typography>
                              {parseFloat(school["Average Standard Score (2023)"] || '0') < 80 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
                            </Box>
                            <Box className='flex justify-between items-center'>
                              <Typography fontSize={14} color="text.primary">Rank Change from Previous Year: {school["Rank Change from Previous Year"] || 'N/A'}</Typography>
                              {parseFloat(school["Rank Change from Previous Year"] || '0') < 0 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Demographics Accordion */}
          <Accordion sx={{ maxHeight: '60vh', overflow: 'auto' }} className='w-full'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls="demographics-content"
              id="demographics-header"
            >
              <Typography>Demographics</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                  <Typography>Male Demographics</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Card className='relative'>
                    <CardContent>
                      <Tooltip title={`Data for the population of ${listing.city}, ${listing.state}`}>
                        <IconInfoCircle color="#6f6f6f" className="absolute top-5 right-4" size={14} style={{ cursor: 'pointer' }} />
                      </Tooltip>
                      <Typography fontSize={14} fontWeight={600} sx={{marginBottom: 0}}>{censusData.B01001['Table Title']} Male</Typography>
                      <Typography fontSize={14} color='text.secondary'>{censusData.B01001['Table Description']}</Typography>
                      <Typography fontSize={14} color='text.secondary'>Total: <span className='text-white'>{censusData.B01001.Columns[0].Estimate}</span></Typography>
                      <Typography fontSize={14} color='text.secondary'>Total Male: <span className='text-white'>{maleToFemaleColumns[0].Estimate}</span></Typography>
                      <Typography fontSize={14} color='text.secondary' sx={{marginBottom: 2}}>Median Age Range: <span className='text-white'>{getMedianAgeRange(maleToFemaleColumns)}</span></Typography>
                      {renderBarChart(maleToFemaleColumns.slice(1), generateRandomColor())}
                    </CardContent>
                  </Card>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                  <Typography>Female Demographics</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Card className='relative'>
                    <CardContent>
                      <Tooltip title={`Data for the population of ${listing.city}, ${listing.state}`}>
                        <IconInfoCircle color="#6f6f6f" className="absolute top-5 right-4" size={14} style={{ cursor: 'pointer' }} />
                      </Tooltip>
                      <Typography fontSize={14} fontWeight={600} sx={{marginBottom: 0}}>{censusData.B01001['Table Title']} Female</Typography>
                      <Typography fontSize={14} color='text.secondary'>{censusData.B01001['Table Description']}</Typography>
                      <Typography fontSize={14} color='text.secondary'>Total: <span className='text-white'>{censusData.B01001.Columns[0].Estimate}</span></Typography>
                      <Typography fontSize={14} color='text.secondary'>Total Female: <span className='text-white'>{femaleToEndColumns[0].Estimate}</span></Typography>
                      <Typography fontSize={14} color='text.secondary' sx={{marginBottom: 2}}>Median Age Range: <span className='text-white'>{getMedianAgeRange(femaleToEndColumns)}</span></Typography>
                      {renderBarChart(femaleToEndColumns.slice(1), generateRandomColor())}
                    </CardContent>
                  </Card>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                  <Typography>{censusData.B02001['Table Title']}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Card className='relative'>
                    <CardContent>
                      <Tooltip title={`Data for the population of ${listing.city}, ${listing.state}`}>
                        <IconInfoCircle color="#6f6f6f" className="absolute top-5 right-4" size={14} style={{ cursor: 'pointer' }} />
                      </Tooltip>
                      <Typography fontSize={14} fontWeight={600} sx={{marginBottom: 0}}>{censusData.B02001['Table Title']}</Typography>
                      <Typography fontSize={14} color='text.secondary'>{censusData.B02001['Table Description']}</Typography>
                      <Typography fontSize={14} color='text.secondary' sx={{marginBottom: 2}}>Total: <span className='text-white'>{censusData.B02001.Columns[0].Estimate}</span></Typography>
                      {renderBarChart(censusData.B02001.Columns.slice(1), generateRandomColor())}
                    </CardContent>
                  </Card>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                  <Typography>{censusData.B03002['Table Title']}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Card className='relative'>
                    <CardContent>
                      <Tooltip title={`Data for the population of ${listing.city}, ${listing.state}`}>
                        <IconInfoCircle color="#6f6f6f" className="absolute top-5 right-4" size={14} style={{ cursor: 'pointer' }} />
                      </Tooltip>
                      <Typography fontSize={14} fontWeight={600} sx={{marginBottom: 0}}>{censusData.B03002['Table Title']}</Typography>
                      <Typography fontSize={14} color='text.secondary'>{censusData.B03002['Table Description']}</Typography>
                      <Typography fontSize={14} color='text.secondary' sx={{marginBottom: 2}}>Total: <span className='text-white'>{censusData.B03002.Columns[0].Estimate}</span></Typography>
                      {renderBarChart(censusData.B03002.Columns.slice(1), generateRandomColor())}
                    </CardContent>
                  </Card>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                  <Typography>{censusData.B19001['Table Title']}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Card className='relative'>
                    <CardContent>
                      <Tooltip title={`Data for the population of ${listing.city}, ${listing.state}`}>
                        <IconInfoCircle color="#6f6f6f" className="absolute top-5 right-4" size={14} style={{ cursor: 'pointer' }} />
                      </Tooltip>
                      <Typography fontSize={14} fontWeight={600} sx={{marginBottom: 0}}>{censusData.B19001['Table Title']}</Typography>
                      <Typography fontSize={14} color='text.secondary'>{censusData.B19001['Table Description']}</Typography>
                      <Typography fontSize={14} color='text.secondary' sx={{marginBottom: 2}}>Total: <span className='text-white'>{censusData.B19001.Columns[0].Estimate}</span></Typography>
                      {renderBarChart(censusData.B19001.Columns.slice(1), generateRandomColor())}
                    </CardContent>
                  </Card>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                  <Typography>{censusData.B19013['Table Title']}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Card className='relative'>
                    <CardContent>
                      <Tooltip title={`Data for the population of ${listing.city}, ${listing.state}`}>
                        <IconInfoCircle color="#6f6f6f" className="absolute top-5 right-4" size={14} style={{ cursor: 'pointer' }} />
                      </Tooltip>
                      <Typography fontSize={14} fontWeight={600} sx={{marginBottom: 0}}>{censusData.B19013['Table Title']}</Typography>
                      <Typography fontSize={14} color='text.secondary'>{censusData.B19013['Table Description']}</Typography>
                      <Typography fontSize={14} color='text.secondary' sx={{marginBottom: 2}}>Total: <span className='text-white'>{censusData.B19013.Columns[0].Estimate}</span></Typography>
                      {renderBarChart(censusData.B19013.Columns, generateRandomColor())}
                    </CardContent>
                  </Card>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                  <Typography>{censusData.B23025['Table Title']}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Card className='relative'>
                    <CardContent>
                      <Tooltip title={`Data for the population of ${listing.city}, ${listing.state}`}>
                        <IconInfoCircle color="#6f6f6f" className="absolute top-5 right-4" size={14} style={{ cursor: 'pointer' }} />
                      </Tooltip>
                      <Typography fontSize={14} fontWeight={600} sx={{marginBottom: 0}}>{censusData.B23025['Table Title']}</Typography>
                      <Typography fontSize={14} color='text.secondary'>{censusData.B23025['Table Description']}</Typography>
                      <Typography fontSize={14} color='text.secondary' sx={{marginBottom: 2}}>Total: <span className='text-white'>{censusData.B23025.Columns[0].Estimate}</span></Typography>
                      {renderBarChart(censusData.B23025.Columns.slice(1), generateRandomColor())}
                    </CardContent>
                  </Card>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                  <Typography>{censusData.B25001['Table Title']}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Card className='relative'>
                    <CardContent>
                      <Tooltip title={`Data for the population of ${listing.city}, ${listing.state}`}>
                        <IconInfoCircle color="#6f6f6f" className="absolute top-5 right-4" size={14} style={{ cursor: 'pointer' }} />
                      </Tooltip>
                      <Typography fontSize={14} fontWeight={600} sx={{marginBottom: 0}}>{censusData.B25001['Table Title']}</Typography>
                      <Typography fontSize={14} color='text.secondary'>{censusData.B25001['Table Description']}</Typography>
                      <Typography fontSize={14} color='text.secondary' sx={{marginBottom: 2}}>Total: <span className='text-white'>{censusData.B25001.Columns[0].Estimate}</span></Typography>
                      {renderBarChart(censusData.B25001.Columns, generateRandomColor())}
                    </CardContent>
                  </Card>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                  <Typography>{censusData.B25002['Table Title']}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Card className='relative h-[500px]'>
                    <CardContent>
                      <Tooltip title={`Data for the population of ${listing.city}, ${listing.state}`}>
                        <IconInfoCircle color="#6f6f6f" className="absolute top-5 right-4" size={14} style={{ cursor: 'pointer' }} />
                      </Tooltip>
                      <Typography fontSize={14} fontWeight={600} sx={{marginBottom: 0}}>{censusData.B25002['Table Title']}</Typography>
                      <Typography fontSize={14} color='text.secondary'>{censusData.B25002['Table Description']}</Typography>
                      <Typography fontSize={14} color='text.secondary' sx={{marginBottom: 2}}>Total: <span className='text-white'>{censusData.B25002.Columns[0].Estimate}</span></Typography>
                      {renderBarChart(censusData.B25002.Columns.slice(1), generateRandomColor())}
                    </CardContent>
                  </Card>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                  <Typography>{censusData.B25003['Table Title']}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Card className='relative h-[500px]'>
                    <CardContent>
                      <Tooltip title={`Data for the population of ${listing.city}, ${listing.state}`}>
                        <IconInfoCircle color="#6f6f6f" className="absolute top-5 right-4" size={14} style={{ cursor: 'pointer' }} />
                      </Tooltip>
                      <Typography fontSize={14} fontWeight={600} sx={{marginBottom: 0}}>{censusData.B25003['Table Title']}</Typography>
                      <Typography fontSize={14} color='text.secondary'>{censusData.B25003['Table Description']}</Typography>
                      <Typography fontSize={14} color='text.secondary' sx={{marginBottom: 2}}>Total: <span className='text-white'>{censusData.B25003.Columns[0].Estimate}</span></Typography>
                      {renderBarChart(censusData.B25003.Columns.slice(1), generateRandomColor())}
                    </CardContent>
                  </Card>
                </AccordionDetails>
              </Accordion>
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
        </Box>
        <Box className='h-[100px] w-full'>
        </Box>
      </Box>

    <Box className="w-[400px] h-full overflow-y-auto">

      <Box className="w-fullpy-2 flex flex-col gap-2 px-2">
        {/* Real Estate Agent Card */}
        <Box className="p-4 rounded shadow-md w-full flex items-center" style={{ backgroundColor: theme.palette.background.paper }}>
          <Box className="flex items-center gap-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_vVBAvcz_VzzBC-8kmKTJ6j3B7t3LbYOhhg&s" alt="Agent" className="rounded-full w-[64px] h-[64px] object-cover" />
            <Box>
              <Typography variant="h6" color={theme.palette.text.primary}>Vish Akkati</Typography>
              <Box className="flex flex-col gap-2 mt-2">
                <a href="mailto:vakkati@ucdavis.edu"><Typography variant="body2" color={theme.palette.text.secondary}>vakkati@ucdavis.edu</Typography></a>
                <a href="tel:9163043454"><Typography variant="body2" color={theme.palette.text.secondary}>916-304-3454</Typography></a>
              </Box>
            </Box>
          </Box>
          <Box className="flex flex-col items-center ml-2 gap-2">
            <Box className="flex gap-2">
              <IconButton sx={{padding:0}}>
                <IconWorld size={20} className="text-purple-500" />
              </IconButton>
              <IconButton>
                <IconBrandInstagram size={20} className="text-purple-500" />
              </IconButton>
              <IconButton>
                <IconBrandTwitter size={20} className="text-purple-500" />
              </IconButton>
            </Box>
            <Typography align='right' fontSize={12} color={theme.palette.text.secondary}>License #: 123456 | Office #: 123456</Typography>
          </Box>
        </Box>

        {/* House Information Card */}
        <Box className=" p-4 rounded shadow-md w-full mt-4 flex flex-col gap-2" style={{ backgroundColor: theme.palette.background.paper }}>
          <Typography fontSize={14} fontWeight={600} color={theme.palette.text.primary}>House Information</Typography>
          <Box className='flex justify-between gap-2'>
            <Typography fontSize={14} color="textSecondary">Address:</Typography> 
            <Typography fontSize={14} color="textPrimary">{listing.full_street_line}, {listing.city}, {listing.state} {listing.zip_code}</Typography>
          </Box>
          <Box className='flex justify-between gap-2'>
            <Typography fontSize={14} color="textSecondary">Price:</Typography>
            <Typography fontSize={14} color="textPrimary">${listing.list_price.toLocaleString()}</Typography>
          </Box>
          <Box className='flex justify-between gap-2'>
            <Typography fontSize={14} color="textSecondary">Beds:</Typography>
            <Typography fontSize={14} color="textPrimary">{listing.beds}</Typography>
          </Box>
          <Box className='flex justify-between gap-2'>
            <Typography fontSize={14} color="textSecondary">Baths:</Typography>
            <Typography fontSize={14} color="textPrimary">{listing.full_baths?.toString() != "-1" ? listing.full_baths : 0 + (listing.half_baths?.toString() || "-1") != "-1" ? listing.half_baths : 0}</Typography>
          </Box>
          <Box className='flex justify-between gap-2'>
            <Typography fontSize={14} color="textSecondary">Sq Ft:</Typography>
            <Typography fontSize={14} color="textPrimary">{listing.sqft.toLocaleString()}</Typography>
          </Box>
        </Box>

        {/* Bid an Offer Button */}
        <Button variant="contained" color="primary" className="mt-4" sx={{textTransform: 'none'}} endIcon={<IconSparkles size={14} color='white' strokeWidth={1.5} />}>
          HouseSnap Suggested Offers 
        </Button>
        {/* Chat Interface */}
        <Box className="w-full px-4 py-2 overflow-y-hidden mt-4" sx={{ backgroundColor: theme.palette.background.paper }}>
          <Box className='w-full h-full overflow-x-hidden overflow-y-auto hide-scrollbar flex items-center justify-center'>
            <Box className='w-[90%] h-full py-3 gap-[15px] flex flex-col'>
              {/* Example messages */}
              <Box className="flex flex-col pb-[15px]">
                <Box className="flex flex-col justify-start items-start mr-10 ">
                  <Typography fontSize={14.5} className='text-white ml-[5px]' mb={1}>HouseSnap<span className="bg-gradient-to-r from-purple-400 via-pink-500 fade-in-on-scroll to-red-500 text-transparent bg-clip-text">AI</span></Typography>
                  <Box className='bg-[#222222] py-[10px] pr-[10px] pl-[12px] w-[100%] rounded-md shadow-md'>
                    <Typography align='left' sx={{wordWrap: 'break-word'}} fontSize={13.5} color='text.primary'>Hi! How can I help you?</Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="items-end flex-col flex ml-10 pb-[5px]">
                <Box className='py-[10px] pr-[10px] pl-[12px] rounded-md' sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                  <Typography align='left' fontSize={13.5} color='#d4d4d4'>I would like to know more about this listing.</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="w-full flex flex-row items-center justify-between gap-2 mb-10 rounded-md transition-all ease-in-out duration-300">
            <TextField 
              variant='outlined' 
              color='secondary' 
              fullWidth 
              autoComplete='false' 
              autoFocus
              placeholder='Chat...'
              InputProps={{
                className: 'shadow-md h-[50px] px-[5px] text-white bg-[#181818] rounded-full',
                endAdornment: 
                <IconButton
                  type='submit'
                  color='secondary'
                  size='small'
                  className='w-[40px] h-[40px] flex items-center justify-center rounded-full'
                >
                  <IconSend 
                    size={20} 
                    stroke={2} 
                    className='text-[#8f8f8f] mr-1 hover:cursor-pointer hover:text-pink-500 transition-all ease-in-out duration-300' 
                  />
                </IconButton>
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#999',
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
    </Box>
  )
}

export default Overview