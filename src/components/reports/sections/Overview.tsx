// ** Next Imports
import React, { useState } from 'react';

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

// ** Tabler Icons
import { IconTools, IconBuildingCommunity, IconSchool, IconCar, IconCalendar, IconMoneybag, IconRuler, IconMapPin, IconHome } from '@tabler/icons-react';

// ** Style Imports
import { useTheme } from '@mui/material/styles';

// ** ChartJS Imports
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// ** Types
import { ListingType, MarketTrends, Report } from '@/utils/types';
import ImageSlider from '@/components/listing/ImageSlider';
import Chip from '@mui/material/Chip';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

type OverviewProps = {
  data: Report;
  listing: ListingType;
};

const ListingDetails = ({ listing }: { listing: ListingType }) => {
  const theme = useTheme();

  return (
    <Box className='bg-[#1e1e1e] w-[100%] px-5 py-4 rounded-md mt-[10px]'>
        <Box className='flex items-center mb-2 justify-between gap-[10px]'>
            <Box className='flex items-end gap-[10px]'>
                <Typography className='' fontSize={18} color="white">{listing.full_street_line}, {listing.city}, {listing.state} {listing.zip_code}</Typography>
            </Box>
            <Box>
                <Chip label={listing.property_type.split('_').map(word => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)).join(' ')} sx={{ marginRight: 1, backgroundColor: '#444', color: 'white' }} />
                <Chip label={listing.status.split('_').map(word => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)).join(' ')} sx={{ marginRight: 1, backgroundColor: '#444', color: 'white' }} />
            </Box>
        </Box>
      <ImageSlider listing={listing} />
      <Box sx={{ textAlign: 'center', marginBottom: 2, marginTop: 2 }}>
        <Box className='flex justify-between items-start flex-wrap gap-2'>
          <Box className='flex flex-col items-start'>
            <Typography variant="h6" sx={{ color: 'white' }}>
              ${listing.list_price.toLocaleString()}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">Listing Price</Typography>
          </Box>
          <Box className='flex items-start gap-8'>
            <Box className='flex flex-col items-start'>
              <Typography variant="h6" sx={{ color: 'white'}}>
                {listing.beds}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">Beds</Typography>
            </Box>
            <Box className='flex flex-col items-start'>
              <Typography variant="h6" sx={{ color: 'white'}}>
                {listing.full_baths + (listing.half_baths || 0)}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">Baths</Typography>
            </Box>
            <Box className='flex flex-col items-start'>
              <Typography variant="h6" sx={{ color: 'white'}}>
                {listing.sqft.toLocaleString()}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">Sqft</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ backgroundColor: '#444' }} />
      <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 2, padding: 2, marginTop: 2, boxShadow: 3 }}>
        <Typography variant="body1" sx={{ color: 'white', lineHeight: 1.6, textAlign: 'left' }}>
          {listing.text}
        </Typography>
      </Box>
      <List>
        <ListItem>
          <ListItemIcon> <IconTools color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
          <ListItemText primary={`${listing.year_built}`} primaryTypographyProps={{ color: 'white' }} />
        </ListItem>
        <ListItem>
          <ListItemIcon> <IconBuildingCommunity color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
          <ListItemText primary={`${listing.neighborhoods?.join(', ')}`} primaryTypographyProps={{ color: 'white' }} />
        </ListItem>
        <ListItem>
          <ListItemIcon> <IconSchool color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
          <ListItemText primary={`${listing.nearby_schools?.join(', ')}`} primaryTypographyProps={{ color: 'white' }} />
        </ListItem>
        <ListItem>
          <ListItemIcon> <IconCar color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
          <ListItemText primary={`${parseInt(listing.parking_garage == '-1' || listing.parking_garage === undefined ? '0' : listing.parking_garage as string)}`} primaryTypographyProps={{ color: 'white' }} />
        </ListItem>
        <ListItem>
          <ListItemIcon> <IconCalendar color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
          <ListItemText primary={`Days on MLS: ${listing.days_on_mls}`} primaryTypographyProps={{ color: 'white' }} />
        </ListItem>
        <ListItem>
          <ListItemIcon> <IconCalendar color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
          <ListItemText 
            primary={`List Date: ${new Date(listing?.list_date || '').toLocaleDateString()}`} 
            primaryTypographyProps={{ color: 'white' }} 
          />
        </ListItem>
        {listing.sold_price && (
          <ListItem>
              <ListItemIcon> <IconMoneybag color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
              <ListItemText primary={`Sold Price: $${listing.sold_price.toLocaleString()}`} primaryTypographyProps={{ color: 'white' }} />
          </ListItem>
        )}
        {listing.last_sold_date && (
          <ListItem>
              <ListItemIcon> <IconCalendar color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
              <ListItemText primary={`Last Sold Date: ${new Date(listing?.last_sold_date || '').toLocaleDateString()}`} primaryTypographyProps={{ color: 'white' }} />
          </ListItem>
        )}
        {listing.assessed_value && (
          <ListItem>
              <ListItemIcon> <IconMoneybag color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
              <ListItemText primary={`Assessed Value: $${listing.assessed_value.toLocaleString()}`} primaryTypographyProps={{ color: 'white' }} />
          </ListItem>
        )}
        {listing.estimated_value && (
          <ListItem>
              <ListItemIcon> <IconMoneybag color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
              <ListItemText primary={`Estimated Value: $${listing.estimated_value.toLocaleString()}`} primaryTypographyProps={{ color: 'white' }} />
          </ListItem>
        )}
        {listing.lot_sqft && (
          <ListItem>
              <ListItemIcon> <IconRuler color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
              <ListItemText primary={`Lot Sqft: ${listing.lot_sqft}`} primaryTypographyProps={{ color: 'white' }} />
          </ListItem>
        )}
        {listing.price_per_sqft && (
          <ListItem>
              <ListItemIcon> <IconMoneybag color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
              <ListItemText primary={`Price per Sqft: ${listing.price_per_sqft}`} primaryTypographyProps={{ color: 'white' }} />
          </ListItem>
        )}
        {listing.county && (
          <ListItem>
              <ListItemIcon> <IconMapPin color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
              <ListItemText primary={`County: ${listing.county}`} primaryTypographyProps={{ color: 'white' }} />
          </ListItem>
        )}
        <ListItem>
            <ListItemIcon> <IconHome color={theme.palette.text.secondary} stroke={1.5}/></ListItemIcon>
            <ListItemText primary={`HOA Fees: $${listing?.hoa_fee?.toLocaleString()}`} primaryTypographyProps={{ color: 'white' }} />
        </ListItem>
      </List>
      <Divider sx={{ backgroundColor: '#444' }} />
      <Box className="text-center items-center justify-between gap-2 mt-2 flex">
        <Box className='flex flex-col items-start justify-start'>
          <Typography fontSize={12} variant="body2" noWrap color="textSecondary">MLS: {listing.mls}</Typography>
          <Typography fontSize={12} variant="body2" noWrap color="textSecondary">MLS ID: {listing.mls_id}</Typography>
        </Box>
        <Box className='flex flex-col items-start'>
          <Typography fontSize={12} variant="body2" noWrap color="textSecondary">
            {listing.agent_email !== '-1' ? (
              <Link href={`mailto:${listing.agent_email}`} color='textSecondary' sx={{ textDecoration: 'none' }}>
                {listing.agent}
              </Link>
            ) : (
              `${listing.agent}`
            )}
          </Typography>
          <Typography fontSize={12} variant="body2" noWrap color="textSecondary">{listing.agent_email}</Typography>
        </Box>
        <Box className='flex flex-col items-start'>
          <Typography fontSize={10} variant="body2" noWrap color="textSecondary">
            {listing.broker_website !== '-1' ? (
              <Link href={listing.broker_website} color='textSecondary' target="_blank" rel="noopener">
                {listing.broker}
              </Link>
            ) : (
              `${listing.broker}`
            )}
          </Typography>
          <Typography fontSize={12} variant="body2" noWrap color="textSecondary">{listing.broker_phone}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const Overview = ({ data, listing }: OverviewProps) => {
  const [selectedListing, setSelectedListing] = useState<ListingType | 'loading' | null>(null);

  const crimeData = {
    labels: ['Crime Score'],
    datasets: [
      {
        label: 'Crime Score',
        data: [data.crime_score],
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const schoolData = {
    labels: ['School Score'],
    datasets: [
      {
        label: 'School Score',
        data: [data.school_score],
        backgroundColor: ['rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const marketTrendsData = {
    labels: ['Average Price', 'Median Price', 'Range Price'],
    datasets: [
      {
        label: 'Market Trends',
        data: [
          (JSON.parse(data.market_trends) as MarketTrends).average_price_2024,
          (JSON.parse(data.market_trends) as MarketTrends).median_price_2024,
          (JSON.parse(data.market_trends) as MarketTrends).range_estimated_price,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box className="overflow-auto" sx={{ p: 3 }}>
      <Typography variant="h6" color="white" gutterBottom>
        Report Overview
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
          <Box sx={{ height: '50vh', overflowY: 'auto' }}>
            <ListingDetails listing={listing} />
          </Box>
      </Grid>
      <Grid item xs={12} md={6}>
          <Card sx={{ height: '50vh' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Market Trends
              </Typography>
              <Pie 
                data={marketTrendsData} 
                options={{ 
                  maintainAspectRatio: true, 
                  aspectRatio: 1,
                }} 
                height={100} 
                width={100} 
              />
            </CardContent>
          </Card>
      </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Crime Score
              </Typography>
              <Bar data={crimeData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                School Score
              </Typography>
              <Bar data={schoolData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;