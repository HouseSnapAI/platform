// ** Next Imports
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// ** Chart Imports
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

// ** Types
import { ListingType, Report, CensusData } from '@/utils/types';
import Tooltip from '@mui/material/Tooltip';
import { IconInfoCircle } from '@tabler/icons-react';

// ** Style
import { useTheme } from '@mui/material/styles';

type Props = {
    data: Report;
    listing: ListingType;
}

const DemographicPage = ({data, listing}: Props) => {

    const theme = useTheme();

    const censusData: CensusData = JSON.parse(data.census_data);

    const createChartData = (columns:any[], color:any) => ({
        labels: columns.length > 1 ? columns.slice(1).map((col:any) => col.Description) : columns.map((col:any) => col.Description),
        datasets: [
            {
                label: 'Estimate',
                data: columns.length > 1 ? columns.slice(1).map((col:any) => col.Estimate) : columns.map((col:any) => col.Estimate), // Exclude the first column
                backgroundColor: color.background,
                borderColor: color.border,
                borderWidth: 1,
                errorBars: columns.length > 1 ? columns.slice(1).map((col:any) => col.Error) : columns.map((col:any) => col.Error), // Include error bars
            },
        ],
    });

    const maleIndex = censusData.B01001.Columns.findIndex((col:any) => col.Description === 'Male:');
    const femaleIndex = censusData.B01001.Columns.findIndex((col:any) => col.Description === 'Female:');

    const maleToFemaleColumns = censusData.B01001.Columns.slice(maleIndex, femaleIndex);
    const femaleToEndColumns = censusData.B01001.Columns.slice(femaleIndex);


    const chartOptions: ChartOptions<'bar'> = {
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: theme.palette.divider, // Set grid lines to white
                    z: -1, // Ensure grid lines are behind the bars
                },
            },
            x: {
                grid: {
                    color: theme.palette.divider, // Set grid lines to white
                    z: -1, // Ensure grid lines are behind the bars
                },
            },
        },
        plugins: {
            legend: {
                display: false, // Disable the legend
            },
        },
    };



    const colors = [
        { background: 'rgba(75, 192, 192, 0.2)', border: 'rgba(75, 192, 192, 1)' },
        { background: 'rgba(153, 102, 255, 0.2)', border: 'rgba(153, 102, 255, 1)' },
        { background: 'rgba(255, 159, 64, 0.2)', border: 'rgba(255, 159, 64, 1)' },
        { background: 'rgba(255, 99, 132, 0.2)', border: 'rgba(255, 99, 132, 1)' },
        { background: 'rgba(54, 162, 235, 0.2)', border: 'rgba(54, 162, 235, 1)' },
        { background: 'rgba(255, 206, 86, 0.2)', border: 'rgba(255, 206, 86, 1)' },
        { background: 'rgba(75, 192, 192, 0.2)', border: 'rgba(75, 192, 192, 1)' },
        { background: 'rgba(153, 102, 255, 0.2)', border: 'rgba(153, 102, 255, 1)' },
        { background: 'rgba(255, 159, 64, 0.2)', border: 'rgba(255, 159, 64, 1)' },
    ];

    const getMedianAgeRange = (columns: any[]) => {
        const mid = Math.floor(columns.length / 2);
        return columns.length % 2 !== 0 ? columns[mid].Description : `${columns[mid - 1].Description} - ${columns[mid].Description}`;
    };

    console.log("Census Data", censusData)

    return (
        <Box className='overflow-auto'>
            <Typography variant='h4'>Demographic</Typography>
            <Typography variant='h6'>data.year</Typography>
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
                            <Bar data={createChartData(maleToFemaleColumns, colors[0])} options={chartOptions} />
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
                            <Bar data={createChartData(femaleToEndColumns, colors[5])} options={chartOptions} />
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
                            <Bar data={createChartData(censusData.B02001.Columns, colors[1])} options={chartOptions} />
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
                            <Bar data={createChartData(censusData.B03002.Columns, colors[2])} options={chartOptions} />
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
                            <Bar data={createChartData(censusData.B19001.Columns, colors[3])} options={chartOptions} />
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
                            <Bar data={createChartData(censusData.B19013.Columns, colors[4])} options={chartOptions} />
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
                            <Bar data={createChartData(censusData.B23025.Columns, colors[5])} options={chartOptions} />
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
                            <Bar data={createChartData(censusData.B25001.Columns, colors[6])} options={chartOptions} />
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
                            <Bar data={createChartData(censusData.B25002.Columns, colors[7])} options={chartOptions} />
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
                            <Bar data={createChartData(censusData.B25003.Columns, colors[8])} options={chartOptions} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DemographicPage