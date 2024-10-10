// ** Next Imports
import React from 'react'


// ** MUI Imports
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Styles
import { useTheme } from '@mui/material/styles'

// ** Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// ** Types
import { TopSchools } from '@/utils/types'
import { IconPlus, IconMinus } from '@tabler/icons-react'

const SchoolScoresAccordion = ({topSchools, schoolScore }: {topSchools: TopSchools, schoolScore: number}) => {

const theme = useTheme()

  return (
    <Accordion sx={{ maxHeight: '60vh', overflow: 'auto' }} className='w-full'>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
      aria-controls="school-scores-content"
      id="school-scores-header"
      className='bg-[#6f6f6f]/10'
      >
      <Typography>School Scores</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Box>
        <Typography fontSize={16} fontWeight={600} sx={{ marginBottom: 2 }}>Overall School Score: {schoolScore.toFixed(0) || 0}</Typography>
        {['elementary', 'middle', 'high'].map((level) => (
          <Accordion key={level}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls={`${level}-schools-content`}
              id={`${level}-schools-header`}
            >
              <Typography>{`${level.charAt(0).toUpperCase() + level.slice(1)} Schools`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {topSchools[level as keyof TopSchools].map((school, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                    aria-controls={`${level}-school-${index}-content`}
                    id={`${level}-school-${index}-header`}
                  >
                    <Box className='flex justify-between items-center w-full'>
                      <Typography fontSize={14}>{school.Name}</Typography>
                      <Typography fontSize={14} color={school.Score > 80 ? "success.main" : "error.main"}>
                        {school.Score?.toFixed(0) || 'N/A'}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box className='flex justify-between items-center'>
                      <Typography fontSize={14} color="text.secondary">{school.Address || 'N/A'} {school.City || 'N/A'}, {school.Zip || 'N/A'}</Typography>
                    </Box>
                    <Box className='flex justify-between items-center'>
                      <Typography fontSize={14} color="text.primary">Distance: {school.Distance || 'N/A'}</Typography>
                      {parseFloat(school.Distance || '0') > 1.5 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
                    </Box>
                    <Box className='flex justify-between items-center'>
                      <Typography fontSize={14} color="text.secondary">Grades: {school.Grades || 'N/A'}</Typography>
                    </Box>
                    <Box className='flex justify-between items-center'>
                      <Typography fontSize={14} color="text.secondary">Phone: {school.Phone || 'N/A'}</Typography>
                    </Box>
                    <Box className='flex justify-between items-center'>
                      <Typography fontSize={14} color="text.primary">Enrollment: {school.Enrollment || 'N/A'}</Typography>
                      {school["Student/\nTeacher Ratio"] > 30 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
                    </Box>
                    <Box className='flex justify-between items-center'>
                      <Typography fontSize={14} color="text.primary">Student/Teacher Ratio: {school["Student/\nTeacher Ratio"] || 'N/A'}</Typography>
                      {school["Student/\nTeacher Ratio"] > 30 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
                    </Box>
                    <Box className='flex justify-between items-center'>
                      <Typography fontSize={14} color="text.primary">Full-time Teachers: {school["Full-time Teachers"] || 'N/A'}</Typography>
                    </Box>
                    <Box className='flex justify-between items-center'>
                      <Typography fontSize={14} color="text.primary">State Percentile: {school["State Percentile (2023)"] || 'N/A'}</Typography>
                      {parseFloat(school["State Percentile (2023)"] || '0') < 80 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
                    </Box>
                    <Box className='flex justify-between items-center'>
                      <Typography fontSize={14} color="text.secondary">Statewide Rank: {school["Statewide Rank (2023)"] || 'N/A'}</Typography>
                    </Box>
                    <Box className='flex justify-between items-center'>
                      <Typography fontSize={14} color="text.primary">Average Standard Score: {school["Average Standard Score (2023)"] || 'N/A'}</Typography>
                      {parseFloat(school["Average Standard Score (2023)"] || '0') < 80 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
                    </Box>
                    <Box className='flex justify-between items-center'>
                      <Typography fontSize={14} color="text.primary">Rank Change from Previous Year: {school["Rank Change from Previous Year"] || 'N/A'}</Typography>
                      {parseFloat(school["Rank Change from Previous Year"] || '0') < 0 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </AccordionDetails>
  </Accordion>

  )
}

export default SchoolScoresAccordion