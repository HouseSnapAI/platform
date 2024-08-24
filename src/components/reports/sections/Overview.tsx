// ** Next Imports
import React from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import ImageSlider from '@/components/listing/ImageSlider';
import Chip from '@mui/material/Chip';

// ** Tabler Icons
import { IconInfoCircle } from '@tabler/icons-react';

// ** Style Imports
import { useTheme } from '@mui/material/styles';

// ** ChartJS Imports
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// ** Types
import { ListingType, Report } from '@/utils/types';

// ** Map
import Map, { NavigationControl, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// ** Custom Components
import ListingDetails from './ReportListingDetails';

ChartJS.register(ArcElement, ChartTooltip, Legend, CategoryScale, LinearScale, BarElement);

type OverviewProps = {
  data: Report;
  listing: ListingType;
};

const Overview = ({ data, listing }: OverviewProps) => {
  const theme = useTheme();
  const mapBoxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

  return (
    <Box className="overflow-hidden" sx={{ height: '95%' }}>
      <Grid container spacing={1} p={2} sx={{ height: '100%' }}>
        <Grid item xs={12} md={6} sx={{ height: '100%' }}>
          <Box sx={{ height: '100%', overflowY: 'auto', padding: 1, backgroundColor: theme.palette.background.paper }}>
            <ListingDetails listing={listing} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} p={0} sx={{ height: '100%' }}>
          <Grid container spacing={1} className='h-full' sx={{ display: 'flex', height: '100%' }}>
            <Grid item xs={12} sx={{ height: '50%' }}>
              <Card className='relative h-full'>
                <CardContent>
                  <Tooltip title={`Aggregate Scores and Summaries for each section`}>
                    <IconInfoCircle color="#6f6f6f" className="absolute top-5 right-4" size={14} style={{ cursor: 'pointer' }} />
                  </Tooltip>
                  <Typography fontSize={14} fontWeight={600} sx={{ margin: 0 }}>
                    Overview
                  </Typography>
                  <Typography fontSize={14} color="text.secondary" sx={{ marginBottom: 2 }}>
                    Cash Flow by filling out the fields below.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sx={{ height: '50%' }}>
              <Card className=''>
                <CardContent className='relative'>
                  <Tooltip title={`Location Overview`}>
                    <IconInfoCircle color="#6f6f6f" className="absolute top-5 right-4" size={14} style={{ cursor: 'pointer' }} />
                  </Tooltip>
                  <Typography fontSize={14} fontWeight={600} sx={{ margin: 0 }}>
                    Location
                  </Typography>
                  <Typography fontSize={14} color="text.secondary" sx={{ marginBottom: 2 }}>
                    A quick overview of the location.
                  </Typography>
                  <Box sx={{ height: '250px' }} className='bg-black'>
                    <Map
                      mapboxAccessToken={mapBoxToken}
                      initialViewState={{
                        longitude: listing.longitude || -77.0364,
                        latitude: listing.latitude || 38.8951,
                        zoom: 14
                      }}
                      style={{ width: '100%', height: '100%' }}
                      mapStyle={"mapbox://styles/mapbox/dark-v11"}
                    >
                      <NavigationControl position="top-right" />
                      <Marker longitude={listing.longitude || 0} latitude={listing.latitude || 0}>
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
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;