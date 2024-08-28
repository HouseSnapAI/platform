// ** Next Imports
import React, { useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// ** Chart Imports
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, PointElement, LineController, LineElement } from 'chart.js';

// ** Types
import { ListingType, Report, CensusData, CrimeDataType, EnvDataType } from '@/utils/types';
import Tooltip from '@mui/material/Tooltip';
import { IconInfoCircle } from '@tabler/icons-react';

// ** Style
import { useTheme } from '@mui/material/styles';


type Props = {
    envData: Partial<EnvDataType> | undefined;
}

ChartJS.register(ArcElement, ChartTooltip, Legend, PointElement, LineController, LineElement);

const EnvCard = ({envData}: Props) => {

    const theme = useTheme();
    
    console.log(envData);

    return (
        <Box>
            ENV COMPONENT
        </Box>
    )
}

export default EnvCard