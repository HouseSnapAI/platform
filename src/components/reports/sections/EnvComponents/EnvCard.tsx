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
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


// ** Style
import { useTheme } from '@mui/material/styles';


type Props = {
    envData: Partial<EnvDataType> | undefined;
    title: string;
}

ChartJS.register(ArcElement, ChartTooltip, Legend, PointElement, LineController, LineElement);

const EnvCard = ({envData, title}: Props) => {

    const theme = useTheme();

    const color = (score: any) => {
        console.log(score)
        if (score == 0) {
            return "#828282"
        } else if (score >= 80) {
            return "#349142"
        } else if (score >= 60) {
            return "#77b526"
        } else if (score >= 40) {
            return "#e3d254"
        } else if (score >= 20) {
            return "#c77c1a"
        } else {
            return "#de413e"
        }
    }

    return (
        <Box className="">
            <Accordion square='false' sx={{backgroundColor: "#181818", width: "40vw", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px"}}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{color: "#787878"}}/>}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                <Box className="w-full flex items-center justify-between">
                    <Typography className="text-[17px] text-[#bfbfbf]">{title.charAt(0).toUpperCase() + title.slice(1)}</Typography>
                    <Box className="flex items-center justify-center gap-[5px] mr-[20px]">
                        {
                            envData &&
                            Object.entries(envData || {}).map(([key, value], index) => {
                                let name = key.split("_");
                                let itemName = name.join(" ");
                                return (
                                    <Tooltip title={`${itemName}`} arrow placement="top">
                                        <Box key={index} className={`w-[5vw] h-[22px] bg-white rounded-sm`} style={{ backgroundColor: color(parseFloat(value.score || '0')) }}></Box>
                                    </Tooltip>
                                )
                            })
                        }
                    </Box>
                </Box>

                </AccordionSummary>
                <AccordionDetails>
                    <Box className="w-full flex flex-col items-center gap-[10px]">
                        {
                            Object.entries(envData || {}).map(([key, value], index) => {
                                console.log(value.score)
                                let name = key.split("_");
                                name.pop();
                                let itemName = name.join(" ");
                                itemName = itemName.charAt(0).toUpperCase() + itemName.slice(1);
                                return (
                                    <Box className="w-full bg-[#212121] px-[15px] rounded-md py-[10px] flex justify-between items-center">
                                        <Box className="flex items-center justify-start gap-[15px]  w-[140px]">
                                            <Box className={`w-[8px] h-[8px] rounded-full`} style={{ backgroundColor: color(parseFloat(value.score || '0')) }}></Box>
                                            <Typography className="text-[#ababab] text-[15px]">{itemName}</Typography>
                                        </Box>
                                        <Box className="flex flex-col gap-[2px] items-center justify-center">
                                            <Typography className="text-[14px] text-[#bcbcbc]">{value.rate == undefined || value.rate == null || value.rate == "Not Applicable" || value.rate == "No Rating" ? "N/A" : value.rate}</Typography>
                                            <Typography className="text-[12px] text-[#8f8f8f]">rate</Typography>
                                        </Box>
                                        <Box className="flex flex-col gap-[2px] items-center justify-center">
                                            <Typography className="text-[14px] text-[#bcbcbc]">{value.score == undefined || value.score == null || value.score == 0 ? "N/A" : parseFloat(value.score).toFixed(2)}</Typography>
                                            <Typography className="text-[12px] text-[#8f8f8f]">risk score</Typography>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default EnvCard