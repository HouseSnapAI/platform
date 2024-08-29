'use client';

// ** Next Imports
import React, { useState } from 'react'
import { useParams } from 'next/navigation';

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TextField from '@mui/material/TextField';

// ** Style Import
import { theme } from '@/utils/theme';

type AnalyticConfigObject = {
    name: string
}

type ActionAnalyticObject = {
    name: string,
    email: string,
    location: string,
    action: string,
    section: string,
    date: string
}

type SectionAnalyticObject = {
    name: string,
    email: string,
    location: string,
    section: string,
    duration: string,
    date: string
}

const ReportAnalytics = () => {

  const { reportId: listingId } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
  };

  const applyFilters = (analytics: any[], config: AnalyticConfigObject[]) => {
    return analytics.filter(analytic =>
      config.every(configItem =>
        analytic[configItem.name.toLowerCase() as keyof typeof analytic]
          .toString()
          .toLowerCase()
          .includes(filters[configItem.name.toLowerCase()]?.toLowerCase() || '')
      )
    );
  };

  const actionAnalyticsConfig: AnalyticConfigObject[] = [
    {
        name: 'Name',
    },
    {
        name: 'Email'
    },
    {
        name: "Location"
    },
    {
        name:'Action'
    },
    {
        name: 'Section'
    },
    {
        name: 'Date'
    }
  ]
  
  const sectionAnalyticsConfig: AnalyticConfigObject[] = [
    {
        name: 'Name',
    },
    {
        name: 'Email'
    },
    {
        name: "Location"
    },
    {
        name:'Section'
    },
    {
        name: 'Duration'
    },
    {
        name: 'Date'
    }
  ]

  const dummyAnalytics: ActionAnalyticObject[] = [
    {
        name: 'Nitin Kanchi',
        email: 'nkanchi@ucdavis.edu',
        location: 'Davis, CA',
        action: 'click',
        section: 'Home Details',
        date: new Date().toLocaleDateString()
    },
    {
        name: 'John Doe',
        email: 'johndoe@example.com',
        location: 'New York, NY',
        action: 'view',
        section: 'Property Photos',
        date: new Date().toLocaleDateString()
    },
    {
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        location: 'Los Angeles, CA',
        action: 'click',
        section: 'Contact Agent',
        date: new Date().toLocaleDateString()
    },
    {
        name: 'Alice Johnson',
        email: 'alicej@example.com',
        location: 'Chicago, IL',
        action: 'view',
        section: 'Property Details',
        date: new Date().toLocaleDateString()
    },
    {
        name: 'Bob Brown',
        email: 'bobb@example.com',
        location: 'Houston, TX',
        action: 'click',
        section: 'Schedule Tour',
        date: new Date().toLocaleDateString()
    },
    {
        name: 'Charlie Davis',
        email: 'charlied@example.com',
        location: 'Phoenix, AZ',
        action: 'view',
        section: 'Neighborhood Info',
        date: new Date().toLocaleDateString()
    },
    {
        name: 'Diana Evans',
        email: 'dianae@example.com',
        location: 'Philadelphia, PA',
        action: 'click',
        section: 'Mortgage Calculator',
        date: new Date().toLocaleDateString()
    },
    {
        name: 'Ethan Foster',
        email: 'ethanf@example.com',
        location: 'San Antonio, TX',
        action: 'view',
        section: 'School Info',
        date: new Date().toLocaleDateString()
    },
    {
        name: 'Fiona Green',
        email: 'fionag@example.com',
        location: 'San Diego, CA',
        action: 'click',
        section: 'Map View',
        date: new Date().toLocaleDateString()
    },
    {
        name: 'George Harris',
        email: 'georgeh@example.com',
        location: 'Dallas, TX',
        action: 'view',
        section: 'Price History',
        date: new Date().toLocaleDateString()
    }
  ]

  const sectionAnalytics: SectionAnalyticObject[] = [
    {
        name: 'Vishwa Akkati',
        email: 'vishwaakkati@gmail.com',
        location: 'Davis, CA',
        section: 'Home Details',
        duration: '10.5 seconds',
        date: new Date().toLocaleDateString()
    },
    {
        name: 'John Doe',
        email: 'johndoe@example.com',
        location: 'New York, NY',
        section: 'Property Photos',
        duration: '15.2 seconds',
        date: new Date().toLocaleDateString()
    },
    {
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        location: 'Los Angeles, CA',
        section: 'Contact Agent',
        duration: '8.3 seconds',
        date: new Date().toLocaleDateString()
    },
    {
        name: 'Alice Johnson',
        email: 'alicej@example.com',
        location: 'Chicago, IL',
        section: 'Property Details',
        duration: '12.7 seconds',
        date: new Date().toLocaleDateString()
    },
    {
        name: 'Bob Brown',
        email: 'bobb@example.com',
        location: 'Houston, TX',
        section: 'Schedule Tour',
        duration: '9.4 seconds',
        date: new Date().toLocaleDateString()
    },
    {
        name: 'Charlie Davis',
        email: 'charlied@example.com',
        location: 'Phoenix, AZ',
        section: 'Neighborhood Info',
        duration: '11.1 seconds',
        date: new Date().toLocaleDateString()
    },
    {
        name: 'Diana Evans',
        email: 'dianae@example.com',
        location: 'Philadelphia, PA',
        section: 'Mortgage Calculator',
        duration: '14.6 seconds',
        date: new Date().toLocaleDateString()
    },
    {
        name: 'Ethan Foster',
        email: 'ethanf@example.com',
        location: 'San Antonio, TX',
        section: 'School Info',
        duration: '13.2 seconds',
        date: new Date().toLocaleDateString()
    },
    {
        name: 'Fiona Green',
        email: 'fionag@example.com',
        location: 'San Diego, CA',
        section: 'Map View',
        duration: '10.9 seconds',
        date: new Date().toLocaleDateString()
    },
    {
        name: 'George Harris',
        email: 'georgeh@example.com',
        location: 'Dallas, TX',
        section: 'Price History',
        duration: '7.8 seconds',
        date: new Date().toLocaleDateString()
    }
  ]

  const renderTableHead = (config: AnalyticConfigObject[]) => (
    <TableHead className='bg-[#6f6f6f]/10'>
      <TableRow>
        {config.map(configItem => (
          <TableCell key={configItem.name}>
            <Typography noWrap color="textPrimary">{configItem.name}</Typography>
            <TextField
              variant="outlined"
              size="small"
              placeholder={`Filter ${configItem.name}`}
              value={filters[configItem.name.toLowerCase()] || ''}
              onChange={e => handleFilterChange(configItem.name.toLowerCase(), e.target.value)}
              fullWidth
              color='secondary'
            />
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  const renderActionTableBody = (analytics: ActionAnalyticObject[]) => (
    <TableBody>
      {applyFilters(analytics, actionAnalyticsConfig).map((analytic, index) => (
        <TableRow key={index} sx={{ border: '1px solid #6f6f6f' }}>
          {Object.keys(analytic).map(key => (
            <TableCell key={analytic[key as keyof ActionAnalyticObject].toString()}>
              <Typography noWrap color="textPrimary">
                {analytic[key as keyof ActionAnalyticObject].toString()}
              </Typography>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );

  const renderSectionTableBody = (analytics: SectionAnalyticObject[]) => (
    <TableBody>
      {applyFilters(analytics, sectionAnalyticsConfig).map((analytic, index) => (
        <TableRow key={index} sx={{ border: '1px solid #6f6f6f' }}>
          {Object.keys(analytic).map(key => (
            <TableCell key={analytic[key as keyof SectionAnalyticObject].toString()}>
              <Typography noWrap color="textPrimary">
                {analytic[key as keyof SectionAnalyticObject].toString()}
              </Typography>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );

  const dummySummary = {
    views: 123,
    avgTimeSpent: '12.5 seconds',
    popularSection: 'Property Photos',
    frequentLocation: 'New York, NY'
  };

  return (
    <Box className="w-[100vw] h-[100vh] bg-black p-2 overflow-y-auto">
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Card sx={{ flex: 1, mx: 1 }}>
          <CardContent>
            <Typography fontSize={14} color='text.secondary'>Views</Typography>
            <Typography fontSize={16} color='text.primary'>{dummySummary.views}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, mx: 1 }}>
          <CardContent>
            <Typography fontSize={14} color='text.secondary'>Avg Time Spent</Typography>
            <Typography fontSize={16} color='text.primary'>{dummySummary.avgTimeSpent}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, mx: 1 }}>
          <CardContent>
            <Typography fontSize={14} color='text.secondary'>Popular Section</Typography>
            <Typography fontSize={16} color='text.primary'>{dummySummary.popularSection}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, mx: 1 }}>
          <CardContent>
            <Typography fontSize={14} color='text.secondary'>Frequent Location</Typography>
            <Typography fontSize={16} color='text.primary'>{dummySummary.frequentLocation}</Typography>
          </CardContent>
        </Card>
      </Box>
      <Card>
        <CardHeader title="Analytics" />
        <CardContent className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <Tabs value={selectedTab} onChange={handleTabChange} aria-label="analytics tabs">
            <Tab label="Action Analytics" color='secondary' sx={{
              textTransform: 'none', 
              '&.Mui-selected': { color: theme.palette.text.primary }
            }} />
            <Tab label="Section Analytics" color='secondary' sx={{
              textTransform: 'none', 
              '&.Mui-selected': { color: theme.palette.text.primary }
            }} />
          </Tabs>
          <Table className=' border border-[#6f6f6f] rounded-md ' sx={{'& .MuiTableCell-root': {
              borderBottom: theme.palette.divider 
          }}}>
              {selectedTab === 0 ? renderTableHead(actionAnalyticsConfig) : renderTableHead(sectionAnalyticsConfig)}
          </Table>
          <Box sx={{maxHeight: '60vh', overflow: 'auto', '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-track': { background: 'black' } }}>
              <Table className=' border border-[#6f6f6f] rounded-md ' sx={{'& .MuiTableCell-root': {
                  borderBottom: theme.palette.divider 
              }}}>
                  {selectedTab === 0 ? renderActionTableBody(dummyAnalytics) : renderSectionTableBody(sectionAnalytics)}
              </Table>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ReportAnalytics