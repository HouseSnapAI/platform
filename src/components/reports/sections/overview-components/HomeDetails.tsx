// ** Next Imports
import React from 'react'


// ** MUI Imports
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

// ** Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// ** Types
import { HomeDetails, ListingType } from '@/utils/types'

// ** Map
import Map, { NavigationControl, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const HomeDetailsAccordion = ({listing, homeDetails}: {listing: ListingType, homeDetails: HomeDetails}) => {
    const mapBoxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;
    const longitude = listing.longitude !== undefined ? listing.longitude : -77.0364;
    const latitude = listing.latitude !== undefined ? listing.latitude : 38.8951;

  return (
    <>
     {/* Home Details Accordion */}
     <Accordion sx={{ maxHeight: '60vh', overflow: 'auto' }} className='w-full'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls="home-details-content"
              id="home-details-header"
              className='bg-[#6f6f6f]/10'
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
    </>
  )
}

export default HomeDetailsAccordion