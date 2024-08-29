// ** Next Imports
import React from 'react'


// ** MUI Imports
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

// ** Style Imports
import { useTheme } from '@mui/material/styles'

// ** Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// ** Types
import { CrimeDataType } from '@/utils/types'
import { crimeDataUtil } from '../utils/helper'

// ** Chart Imports
import { Bar as RechartsBar, Line, Doughnut } from 'react-chartjs-2';


const CrimeDataAccordion = ({crimeData, crimeScore}: {crimeData: CrimeDataType, crimeScore: number}) => {

    const theme = useTheme()

     // ** CRIME DATA
     const { 
        crimeTrendOptions,
        crimeTrendData,
        offenseTypeLabels,
        offenseTypeValues,
        crimeLocationLabels,
        crimeLocationValues,
        weaponsLabels,
        weaponsValues,
        offenderAgeLabels,
        offenderAgeValues,
        victimAgeLabels,
        victimAgeValues,
        ethnicityLabels,
        ethnicityValuesOffender,
        ethnicityValuesVictim,
        raceLabels,
        raceValuesOffender,
        raceValuesVictim,
        relationshipLabels,
        relationshipValues,
        sexLabels,
        sexValuesOffender,
        sexValuesVictim,
        sexBarData,
        ethnicityData,
        ethnicityChartOptions,
        ageBarData,
        ageBarOptions,
        sexBarOptions,
        raceOptions,
        raceData,
        typeData,
        chartOptions,
        relationshipOptions,
        tempLabelsRel,
        tempValsRel
      } = crimeDataUtil(crimeData, theme);
  
  return (
    <Accordion sx={{ maxHeight: '60vh', overflow: 'auto' }} className='w-full'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
      aria-controls="crime-data-content"
      id="crime-data-header"
    >
      <Typography>Crime Data</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Box className='overflow-y-auto pb-[100px] flex flex-col bg-[#121212] w-full rounded-md py-[20px] px-[20px]'>
        <Typography className='text-[#e4e4e4] text-[22px]'>Crime Score: {crimeScore.toFixed(3)}</Typography>
      </Box>

      {/* Crime Trend Accordion */}
      <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
            <Typography>Crime Trend</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="mt-[20px] flex flex-col">
              <Typography className='text-[#ababab] text-[16px]'>Crime Trend</Typography>
              <Line data={crimeTrendData} options={crimeTrendOptions} />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Crime Type Accordion */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
            <Typography>Crime Type</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className='flex bg-[#181818] rounded-md shadow-lg flex-col justify-center items-center min-w-[150px] w-full py-[15px] gap-[10px]'>
              <Box className='h-[150px] w-[130px] flex justify-center items-center'>
                <Doughnut data={typeData(offenseTypeLabels, offenseTypeValues)} options={chartOptions} />
              </Box>
              <Typography className='text-[#949494] text-[15px]'>Crime Type</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Location Accordion */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
            <Typography>Location</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className='flex bg-[#181818] rounded-lg shadow-md flex-col justify-center items-center min-w-[150px] w-full py-[15px] gap-[10px]'>
              <Box className='h-[150px] w-[130px] flex justify-center items-center'>
                <Doughnut data={typeData(crimeLocationLabels, crimeLocationValues)} options={chartOptions} />
              </Box>
              <Typography className='text-[#949494] text-[15px]'>Location</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Weapons Accordion */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
            <Typography>Weapon(s)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className='flex bg-[#181818] rounded-lg shadow-md flex-col justify-center items-center min-w-[150px] w-full py-[15px] gap-[10px]'>
              <Box className='h-[150px] w-[130px] flex justify-center items-center'>
                <Doughnut data={typeData(weaponsLabels, weaponsValues)} options={chartOptions} />
              </Box>
              <Typography className='text-[#949494] text-[15px]'>Weapon(s)</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Age Data Accordion */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
            <Typography>Age Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className='mt-[20px] flex items-start justify-center w-full flex-col gap-[10px]'>
              <Typography className='text-[#ababab] text-[16px]'>Age Data</Typography>
              <RechartsBar style={{ width: "90%", height: "90%" }} data={ageBarData} options={ageBarOptions} />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Ethnicity Data Accordion */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
            <Typography>Ethnicity Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="mt-[40px] flex items-center justify-around flex-wrap">
              <Box className='flex flex-col items-center justify-center gap-[5px]'>
                <Typography className='text-[#ababab] text-[16px]'>Ethnicity Data</Typography>
                <Typography className='text-[#838383] text-[14px] mb-[5px]'>Hispanic, Not Hispanic, Unknown</Typography>
                <Box className='h-[220px] w-[220px] flex justify-center items-center'>
                  <Doughnut data={ethnicityData} options={ethnicityChartOptions} />
                </Box>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Offender and Victim Race Accordion */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
            <Typography>Offender and Victim Race</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className='flex justify-center items-center gap-[40px] bg-[#181818] rounded-sm shadow-lg h-[240px] px-[20px]'>
              <Box className='flex flex-col justify-center gap-[10px] items-center'>
                <Typography className='text-[#ababab] text-[16px]'>Offender Race</Typography>
                <Box className='h-[150px] w-[130px] flex justify-center items-center'>
                  <Doughnut data={raceData(raceLabels, raceValuesOffender)} options={raceOptions} />
                </Box>
                <Typography className='text-[#838383] text-[14px]'>Majority: {raceLabels[raceValuesOffender.indexOf(Math.max(...raceValuesOffender))]} - {Math.max(...raceValuesOffender)} crimes</Typography>
              </Box>
              <Box className='flex flex-col justify-center gap-[10px] items-center'>
                <Typography className='text-[#ababab] text-[16px]'>Victim Race</Typography>
                <Box className='h-[150px] w-[130px] flex justify-center items-center'>
                  <Doughnut data={raceData(raceLabels, raceValuesVictim)} options={raceOptions} />
                </Box>
                <Typography className='text-[#838383] text-[14px]'>{raceLabels[raceValuesVictim.indexOf(Math.max(...raceValuesVictim))]} - {Math.max(...raceValuesVictim)} victims</Typography>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Sex Data Accordion */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
            <Typography>Sex Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className='mt-[40px] flex justify-center gap-[30px] items-center'>
              <Box className='flex items-start justify-center w-full flex-col gap-[10px]'>
                <Typography className='text-[#ababab] text-[16px]'>Sex Data</Typography>
                <RechartsBar style={{ width: "90%", height: "90%" }} data={sexBarData} options={sexBarOptions} />
              </Box>
              <Box className='bg-[#181818] rounded-lg shadow-lg gap-[30px] flex justify-center items-center py-[20px] px-[20px]'>
                <Box className='flex flex-col justify-center gap-[10px]'>
                  <Typography className='text-[#ababab] text-[16px] mb-[10px] underline'>Offender</Typography>
                  <Typography className='text-[#838383] text-[14px]'>Male: {crimeData?.offender_sex[0].Male} crimes</Typography>
                  <Typography className='text-[#838383] text-[14px]'>Female: {crimeData?.offender_sex[0].Female} crimes</Typography>
                  <Typography className='text-[#838383] text-[14px]'>Unknown: {crimeData?.offender_sex[0].Unknown} crimes</Typography>
                </Box>
                <Box className='flex flex-col justify-center gap-[10px]'>
                  <Typography className='text-[#ababab] text-[16px] mb-[10px] underline'>Victim</Typography>
                  <Typography className='text-[#838383] text-[14px]'>Male: {crimeData?.victim_sex[0].Male} victims</Typography>
                  <Typography className='text-[#838383] text-[14px]'>Female: {crimeData?.victim_sex[0].Female} victims</Typography>
                  <Typography className='text-[#838383] text-[14px]'>Unknown: {crimeData?.victim_sex[0].Unknown} victims</Typography>
                </Box>
              </Box>
            </Box>

            {/* Relationship to Victim Data Accordion */}
            <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
              <Typography>Relationship to Victim Data</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box className="mt-[50px] flex flex-col gap-[20px]">
                <Typography className='text-[#ababab] text-[16px]'>Relationship to Victim Data</Typography>
                <Box className="flex items-center justify-around">
                  <Box className='bg-[#181818] rounded-lg shadow-lg gap-[10px] flex flex-col justify-center py-[20px] px-[20px]'>
                    <Typography className='text-[#ababab] text-[16px] mb-[10px] underline'>Most Common</Typography>
                    <Box className="flex justify-center items-center gap-[30px]">
                      <Box className='flex flex-col justify-center gap-[10px]'>
                        <Typography className='text-[#838383] text-[14px]'>{relationshipLabels.splice(relationshipValues.indexOf(Math.max(...relationshipValues)), 1)} - {relationshipValues.splice(relationshipValues.indexOf(Math.max(...relationshipValues)), 1)}</Typography>
                        <Typography className='text-[#838383] text-[14px]'>{relationshipLabels.splice(relationshipValues.indexOf(Math.max(...relationshipValues)), 1)} - {relationshipValues.splice(relationshipValues.indexOf(Math.max(...relationshipValues)), 1)}</Typography>
                        <Typography className='text-[#838383] text-[14px]'>{relationshipLabels.splice(relationshipValues.indexOf(Math.max(...relationshipValues)), 1)} - {relationshipValues.splice(relationshipValues.indexOf(Math.max(...relationshipValues)), 1)}</Typography>
                        <Typography className='text-[#838383] text-[14px]'>{relationshipLabels.splice(relationshipValues.indexOf(Math.max(...relationshipValues)), 1)} - {relationshipValues.splice(relationshipValues.indexOf(Math.max(...relationshipValues)), 1)}</Typography>
                      </Box>
                      <Box className='flex flex-col justify-center gap-[10px]'>
                        <Typography className='text-[#838383] text-[14px]'>{relationshipLabels.splice(relationshipValues.indexOf(Math.max(...relationshipValues)), 1)} - {relationshipValues.splice(relationshipValues.indexOf(Math.max(...relationshipValues)), 1)}</Typography>
                        <Typography className='text-[#838383] text-[14px]'>{relationshipLabels.splice(relationshipValues.indexOf(Math.max(...relationshipValues)), 1)} - {relationshipValues.splice(relationshipValues.indexOf(Math.max(...relationshipValues)), 1)}</Typography>
                        <Typography className='text-[#838383] text-[14px]'>{relationshipLabels.splice(relationshipValues.indexOf(Math.max(...relationshipValues)), 1)} - {relationshipValues.splice(relationshipValues.indexOf(Math.max(...relationshipValues)), 1)}</Typography>
                        <Typography className='text-[#838383] text-[14px]'>{relationshipLabels.splice(relationshipValues.indexOf(Math.max(...relationshipValues)), 1)} - {relationshipValues.splice(relationshipValues.indexOf(Math.max(...relationshipValues)), 1)}</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="flex flex-col items-center justify-center">
                    <Box className='h-[200px] w-[200px] flex justify-center items-center'>
                      <Doughnut data={typeData(tempLabelsRel, tempValsRel)} options={relationshipOptions} />
                    </Box>
                  </Box>
                </Box>
              </Box>

            </AccordionDetails>
            </Accordion>

          </AccordionDetails>
        </Accordion>
      
      
    </AccordionDetails>
  </Accordion>
  )
}

export default CrimeDataAccordion