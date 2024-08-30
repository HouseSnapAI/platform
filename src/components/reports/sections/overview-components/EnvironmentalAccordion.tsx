// ** Next Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'


// ** Types
import { EnvDataType, Report } from '@/utils/types'

// ** Custom Components
import EnvCard from '../EnvComponents/EnvCard'

const EnvironmentalAccordion = ({envData, data}: {envData: EnvDataType, data: Report}) => {
    const [envDataProcessed, setEnvDataProcessed] = useState<any>({});
    const [county, setCounty] = useState<String>("");
    const [envScore, setEnvScore] = useState<number>();
    const [overallRisk, setOverallRisk] = useState<any>({});

    useEffect(() => {
        if(envData != undefined) {
            console.log(envData);
        
            let temp: any = {};
            let riskVals: any = {}
            Object.keys(envData).map((key) => {
                if (key == "county") {
                    setCounty(envData[key]);
                } else if (key == "overall_score") {
                    setEnvScore(envData[key]);
                } else {
                    let split = key.split("_");
                    let title = split[0];
                    if(title == "risk") {
                        console.log(split)
                        riskVals[split[1]] = envData[key];
                    } else {
                        split.shift();
                        let subType = split[split.length - 1]
                        split.pop();

                        if (!(title in temp)) {
                            temp[title] = {}
                        }

                        let subTitle = split.join("_")

                        if (!(subTitle in temp[title])) {
                            temp[title][subTitle] = {}
                        }

                        temp[title][subTitle][subType] = envData[key];
                    }
                }
            })
            
            setOverallRisk(riskVals);
            setEnvDataProcessed(temp);
        }
        
    }, [data]);


    return (
        <Accordion sx={{ maxHeight: '60vh', overflow: 'auto' }} className='w-full'>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                aria-controls="listing-details-content"
                id="listing-details-header"
                className='bg-[#6f6f6f]/10'
            >
                <Typography>Listing Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Box className="flex justify-between items-center w-full">
                    <Typography className='text-[#e4e4e4] text-[22px]'>Environmental Score: {envScore}</Typography>

                    <Box className='flex justify-center items-center bg-[#313131] rounded-sm px-[10px] py-[2px]'>
                        <Typography className='text-[#ababab] text-[15px]'>County: {county}</Typography>
                    </Box>
                </Box>

                <Box className="flex justify-center items-center gap-[10px] mt-[30px] mb-[50px]">
                    <Typography className='text-[#ababab] text-[18px]'>Overall Risk - {overallRisk.rating}</Typography>
                    <Typography className={`text-[#ababab] text-[18px] ml-[10px] ${overallRisk.score >= 70 ? 'text-[#db5a57]' : overallRisk.score >= 30 ? 'text-[#dfa137]' : 'text-[#349142]'}`}>{overallRisk.score != undefined && overallRisk.score.toFixed(2)}/100</Typography>
                </Box>

                <Box className="w-full  flex flex-col items-center gap-[30px]">
                    {
                        Object.keys(envDataProcessed).map((key: any, index: number) => {
                            return (
                                <EnvCard title={key} envData={envDataProcessed[key]} key={index}/>
                            )
                        })
                    }
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}

export default EnvironmentalAccordion