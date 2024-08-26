// ** Next Imports
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// ** Chart Imports
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { ChartOptions } from 'chart.js';

// ** Types
import { ListingType, Report, CensusData } from '@/utils/types';
import Tooltip from '@mui/material/Tooltip';
import { IconInfoCircle } from '@tabler/icons-react';

// ** Style
import { useTheme, alpha } from '@mui/material/styles';
import { hexToRgb } from '@mui/system';

// Register Chart.js components
import { Chart as ChartJS, BarElement, Tooltip as ChartTooltip, Legend, LinearScale, CategoryScale } from 'chart.js';
ChartJS.register(BarElement, ChartTooltip, Legend, LinearScale, CategoryScale);

type Props = {
    data: Report;
    listing: ListingType;
}

const DemographicPage = ({data, listing}: Props) => {

    const theme = useTheme();

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
        <Box className='overflow-auto'>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12} sm={6} sx={{height: '600px'}}>
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
                </Grid>
            </Grid>
        </Box>
    )
}

export default DemographicPage