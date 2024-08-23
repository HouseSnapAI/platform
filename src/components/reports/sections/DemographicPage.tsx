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

// ** Types
import { ListingType, Report, CensusData } from '@/utils/types';

type Props = {
    data: Report;
    listing: ListingType;
}

const DemographicPage = ({data, listing}: Props) => {

    const censusData: CensusData = JSON.parse(data.census_data);

    const createChartData = (columns:any[]) => ({
        labels: columns.map((col:any) => col.Description),
        datasets: [
            {
                label: 'Estimate',
                data: columns.map((col:any) => col.Estimate),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Box className='overflow-auto'>
            <Typography variant='h4'>Demographic</Typography>
            <Typography variant='h6'>year</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant='h5'>{censusData.B01001.TableTitle}</Typography>
                            <Bar data={createChartData(censusData.B01001.Columns)} options={chartOptions} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant='h5'>{censusData.B02001.TableTitle}</Typography>
                            <Bar data={createChartData(censusData.B02001.Columns)} options={chartOptions} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant='h5'>{censusData.B03002.TableTitle}</Typography>
                            <Bar data={createChartData(censusData.B03002.Columns)} options={chartOptions} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant='h5'>{censusData.B19001.TableTitle}</Typography>
                            <Bar data={createChartData(censusData.B19001.Columns)} options={chartOptions} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant='h5'>{censusData.B19013.TableTitle}</Typography>
                            <Bar data={createChartData(censusData.B19013.Columns)} options={chartOptions} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant='h5'>{censusData.B23025.TableTitle}</Typography>
                            <Bar data={createChartData(censusData.B23025.Columns)} options={chartOptions} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant='h5'>{censusData.B25001.TableTitle}</Typography>
                            <Bar data={createChartData(censusData.B25001.Columns)} options={chartOptions} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant='h5'>{censusData.B25002.TableTitle}</Typography>
                            <Bar data={createChartData(censusData.B25002.Columns)} options={chartOptions} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant='h5'>{censusData.B25003.TableTitle}</Typography>
                            <Bar data={createChartData(censusData.B25003.Columns)} options={chartOptions} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DemographicPage