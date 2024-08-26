// ** Next Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';

// ** Style
import { useTheme } from '@mui/material/styles';

// ** Icons
import { IconInfoCircle, IconMinus, IconPlus, IconChevronDown} from '@tabler/icons-react';

// ** Types
import { ListingType, Report, School, TopSchools } from '@/utils/types';

type DevelopmentalPageProps = {
  data: Report;
  listing: ListingType;
}

// ** Chart
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, LinearScale, CategoryScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, ChartTooltip, Legend, LinearScale, CategoryScale, BarElement);

const DevelopmentalPage = ({ data, listing }: DevelopmentalPageProps) => {
  const chartData = (score: number) => ({
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: [theme.palette.primary.dark, 'rgba(224, 224, 224, 0)'],
        borderColor: [theme.palette.primary.main, 'rgba(224, 224, 224, 0)'],
        hoverBackgroundColor: [theme.palette.primary.dark, 'rgba(224, 224, 224, 0)'],
        hoverBorderColor: [theme.palette.primary.main, 'rgba(224, 224, 224, 0)'],
        borderRadius: 10, // Rounded corners
      },
    ],
  });

  const chartOptions = {
    cutout: '80%', // Adjust cutout to make the chart smaller
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
  };

  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [topSchools, setTopSchools] = useState<TopSchools>(JSON.parse(data.top_schools));

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, schoolType: string) => {
    setAnchorEl(event.currentTarget);
    toggleDemographics(schoolType);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [isDemographicsOpen, setIsDemographicsOpen] = useState({
    elementary: false,
    middle: false,
    high: false,
  });

  const toggleDemographics = (schoolType: string) => {
    setIsDemographicsOpen(prevState => ({
      ...prevState,
      //@ts-ignore
      [schoolType]: !prevState[schoolType],
    }));
  };

  if(!topSchools) {
    console.log(data.top_schools)
    return <Box>
      <Typography fontSize={14} fontWeight={600} sx={{ margin: 0 }}>
        Loading...
      </Typography>
    </Box>
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card className='relative'> {/* Adjust size of the card */}
            <CardContent className='flex items-center'>
                <Box className='flex flex-col'>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography fontSize={14} fontWeight={600} sx={{ margin: 0 }}>
                  School Score
                </Typography>
                <Tooltip title={`Calculated using up to date Mortgage Prime Rates.`}>
                  <IconInfoCircle color="#6f6f6f" className="absolute top-5 right-4" size={14} style={{ cursor: 'pointer' }} />
                </Tooltip>
              </Box>
              <Typography fontSize={14} color="text.secondary" sx={{ marginBottom: 2 }}>
                A comprehensive score on the schools in the area
              </Typography>
                    <Box className='relative w-[200px] h-[200px] flex flex-col items-center justify-center'>
                        <Typography fontSize={16} align="center" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            {data.school_score.toFixed(0)}
                        </Typography>
                        <Doughnut data={chartData(data.school_score)} options={chartOptions} />
                    </Box>
                </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className='relative'> {/* Adjust size of the card */}
          <CardContent className='flex items-center'>
                <Box className='flex flex-col'>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography fontSize={14} fontWeight={600} sx={{ margin: 0 }}>
                  Amenities Score
                </Typography>
                <Tooltip title={`Calculated using up to date Mortgage Prime Rates.`}>
                  <IconInfoCircle color="#6f6f6f" className="absolute top-5 right-4" size={14} style={{ cursor: 'pointer' }} />
                </Tooltip>
              </Box>
              <Typography fontSize={14} color="text.secondary" sx={{ marginBottom: 2 }}>
                A comprehensive score on the schools in the area
              </Typography>
                    <Box className='relative w-[200px] h-[200px] flex flex-col items-center justify-center'>
                        <Typography fontSize={16} align="center" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            {data.school_score.toFixed(0)}
                        </Typography>
                        <Doughnut data={chartData(data.school_score)} options={chartOptions} />
                    </Box>
                </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className='relative'> {/* Adjust size of the card */}
          <CardContent className='flex items-center'>
                <Box className='flex flex-col'>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography fontSize={14} fontWeight={600} sx={{ margin: 0 }}>
                  Transportation Score
                </Typography>
                <Tooltip title={`Calculated using up to date Mortgage Prime Rates.`}>
                  <IconInfoCircle color="#6f6f6f" className="absolute top-5 right-4" size={14} style={{ cursor: 'pointer' }} />
                </Tooltip>
              </Box>
              <Typography fontSize={14} color="text.secondary" sx={{ marginBottom: 2 }}>
                A comprehensive score on the schools in the area
              </Typography>
                    <Box className='relative w-[200px] h-[200px] flex flex-col items-center justify-center'>
                        <Typography fontSize={16} align="center" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            {data.school_score.toFixed(0)}
                        </Typography>
                        <Doughnut data={chartData(data.school_score)} options={chartOptions} />
                    </Box>
                </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className='relative'>
            <CardContent>
              <Typography fontSize={14} fontWeight={600} sx={{ marginBottom: 2 }}>Top Elementary School</Typography>
              <Tooltip title={`Calculated using up to date Mortgage Prime Rates.`}>
                  <IconInfoCircle color="#6f6f6f" className="absolute top-5 right-4" size={14} style={{ cursor: 'pointer' }} />
              </Tooltip>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14}>{topSchools.elementary[0]?.Name || 'N/A'}</Typography>
                <Typography fontSize={14} color={topSchools.elementary[0]?.Score > 80 ? "success.main" : "error.main"}>
                    {topSchools.elementary[0]?.Score?.toFixed(0) || 'N/A'}
                </Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">{topSchools.elementary[0]?.Address || 'N/A'} {topSchools.elementary[0]?.City || 'N/A'}, {topSchools.elementary[0]?.Zip || 'N/A'}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Distance: {topSchools.elementary[0]?.Distance || 'N/A'}</Typography>
                {parseFloat(topSchools.elementary[0]?.Distance || '0') > 1.5 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">Grades: {topSchools.elementary[0]?.Grades || 'N/A'}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">Phone: {topSchools.elementary[0]?.Phone || 'N/A'}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Enrollment: {topSchools.elementary[0]?.Enrollment || 'N/A'}</Typography>
                {topSchools.elementary[0]?.["Student/\nTeacher Ratio"] > 30 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Student/Teacher Ratio: {topSchools.elementary[0]?.["Student/\nTeacher Ratio"] || 'N/A'}</Typography>
                {topSchools.elementary[0]?.["Student/\nTeacher Ratio"] > 30 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} className="flex items-center" color="text.secondary">
                  Demographics 
                  <IconChevronDown 
                    size={16} 
                    color='#6f6f6f'
                    //@ts-ignore
                    onClick={(e) => handlePopoverOpen(e, 'elementary')} 
                    style={{ cursor: 'pointer' }}
                  /> 
                </Typography>
              </Box>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Box p={2}>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Hispanic: <span className='text-[#6f6f6f]'>{topSchools.elementary[0]?.Hispanic || 'N/A'}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Asian: <span className='text-[#6f6f6f]'>{topSchools.elementary[0]?.Asian || 'N/A'}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Black: <span className='text-[#6f6f6f]'>{topSchools.elementary[0]?.Black || 'N/A'}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">White: <span className='text-[#6f6f6f]'>{topSchools.elementary[0]?.White || 'N/A'}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">American Indian: <span className='text-[#6f6f6f]'>{topSchools.elementary[0]?.["American\nIndian"] || 'N/A'}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Pacific Islander: <span className='text-[#6f6f6f]'>{topSchools.elementary[0]?.["Pacific\nIslander"] || 'N/A'}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Two or More Races: <span className='text-[#6f6f6f]'>{topSchools.elementary[0]?.["Two or\nMore Races"] || 'N/A'}</span></Typography>
                  </Box>
                </Box>
              </Popover>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Full-time Teachers: {topSchools.elementary[0]?.["Full-time Teachers"] || 'N/A'}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">State Percentile: {topSchools.elementary[0]?.["State Percentile (2023)"] || 'N/A'}</Typography>
                {parseFloat(topSchools.elementary[0]?.["State Percentile (2023)"] || '0') < 80 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">Statewide Rank: {topSchools.elementary[0]?.["Statewide Rank (2023)"] || 'N/A'}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Average Standard Score: {topSchools.elementary[0]?.["Average Standard Score (2023)"] || 'N/A'}</Typography>
                {parseFloat(topSchools.elementary[0]?.["Average Standard Score (2023)"] || '0') < 80 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Rank Change from Previous Year: {topSchools.elementary[0]?.["Rank Change from Previous Year"] || 'N/A'}</Typography>
                {parseFloat(topSchools.elementary[0]?.["Rank Change from Previous Year"] || '0') < 0 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className='relative'>
            <CardContent>
              <Typography fontSize={14} fontWeight={600} sx={{ marginBottom: 2 }}>Top Middle School</Typography>
              <Tooltip title={`Calculated using up to date Mortgage Prime Rates.`}>
                  <IconInfoCircle color="#6f6f6f" className="absolute top-5 right-4" size={14} style={{ cursor: 'pointer' }} />
              </Tooltip>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14}>{topSchools.middle[0]?.Name || 'N/A'}</Typography>
                <Typography fontSize={14} color={topSchools.middle[0]?.Score > 80 ? "success.main" : "error.main"}>
                    {topSchools.middle[0]?.Score?.toFixed(0) || 'N/A'}
                </Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">{topSchools.middle[0]?.Address || 'N/A'} {topSchools.middle[0]?.City || 'N/A'}, {topSchools.middle[0]?.Zip || 'N/A'}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Distance: {topSchools.middle[0]?.Distance || 'N/A'}</Typography>
                {parseFloat(topSchools.middle[0]?.Distance || '0') > 1.5 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">Grades: {topSchools.middle[0]?.Grades || 'N/A'}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">Phone: {topSchools.middle[0]?.Phone || 'N/A'}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Enrollment: {topSchools.middle[0]?.Enrollment || 'N/A'}</Typography>
                {topSchools.middle[0]?.["Student/\nTeacher Ratio"] > 30 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Student/Teacher Ratio: {topSchools.middle[0]?.["Student/\nTeacher Ratio"] || 'N/A'}</Typography>
                {topSchools.middle[0]?.["Student/\nTeacher Ratio"] > 30 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} className="flex items-center" color="text.secondary">
                  Demographics 
                  <IconChevronDown 
                    size={16} 
                    color='#6f6f6f' 
                    //@ts-ignore
                    onClick={(e) => handlePopoverOpen(e, 'middle')} 
                    style={{ cursor: 'pointer' }} 
                  /> 
                </Typography>
              </Box>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Box p={2}>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Hispanic: <span className='text-[#6f6f6f]'>{topSchools.middle[0]?.Hispanic || 'N/A'}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Asian: <span className='text-[#6f6f6f]'>{topSchools.middle[0]?.Asian || 'N/A'}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Black: <span className='text-[#6f6f6f]'>{topSchools.middle[0]?.Black || 'N/A'}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">White: <span className='text-[#6f6f6f]'>{topSchools.middle[0]?.White || 'N/A'}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">American Indian: <span className='text-[#6f6f6f]'>{topSchools.middle[0]?.["American\nIndian"] || 'N/A'}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Pacific Islander: <span className='text-[#6f6f6f]'>{topSchools.middle[0]?.["Pacific\nIslander"] || 'N/A'}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Two or More Races: <span className='text-[#6f6f6f]'>{topSchools.middle[0]?.["Two or\nMore Races"] || 'N/A'}</span></Typography>
                  </Box>
                </Box>
              </Popover>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Full-time Teachers: {topSchools.middle[0]?.["Full-time Teachers"] || 'N/A'}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">State Percentile: {topSchools.middle[0]?.["State Percentile (2023)"] || 'N/A'}</Typography>
                {parseFloat(topSchools.middle[0]?.["State Percentile (2023)"] || '0') < 80 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">Statewide Rank: {topSchools.middle[0]?.["Statewide Rank (2023)"] || 'N/A'}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Average Standard Score: {topSchools.middle[0]?.["Average Standard Score (2023)"] || 'N/A'}</Typography>
                {parseFloat(topSchools.middle[0]?.["Average Standard Score (2023)"] || '0') < 80 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Rank Change from Previous Year: {topSchools.middle[0]?.["Rank Change from Previous Year"] || 'N/A'}</Typography>
                {parseFloat(topSchools.middle[0]?.["Rank Change from Previous Year"] || '0') < 0 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className='relative'>
            <CardContent>
              <Typography fontSize={14} fontWeight={600} sx={{ marginBottom: 2 }}>Top High School</Typography>
              <Tooltip title={`Calculated using up to date Mortgage Prime Rates.`}>
                  <IconInfoCircle color="#6f6f6f" className="absolute top-5 right-4" size={14} style={{ cursor: 'pointer' }} />
              </Tooltip>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14}>{topSchools.high[0]?.Name || 'N/A'}</Typography>
                <Typography fontSize={14} color={topSchools.high[0]?.Score > 80 ? "success.main" : "error.main"}>
                    {topSchools.high[0]?.Score?.toFixed(0) || 'N/A'}
                </Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">{topSchools.high[0]?.Address || 'N/A'} {topSchools.high[0]?.City || 'N/A'}, {topSchools.high[0]?.Zip || 'N/A'}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Distance: {topSchools.high[0]?.Distance || 'N/A'}</Typography>
                {parseFloat(topSchools.high[0]?.Distance || '0') > 1.5 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">Grades: {topSchools.high[0]?.Grades || 'N/A'}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">Phone: {topSchools.high[0]?.Phone || 'N/A'}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Enrollment: {topSchools.high[0]?.Enrollment || 'N/A'}</Typography>
                {topSchools.high[0]?.["Student/\nTeacher Ratio"] > 30 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Student/Teacher Ratio: {topSchools.high[0]?.["Student/\nTeacher Ratio"] || 'N/A'}</Typography>
                {topSchools.high[0]?.["Student/\nTeacher Ratio"] > 30 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} className="flex items-center" color="text.secondary">
                  Demographics 
                  <IconChevronDown 
                    size={16} 
                    color='#6f6f6f' 
                    //@ts-ignore
                    onClick={(e) => handlePopoverOpen(e, 'high')} 
                    style={{ cursor: 'pointer' }} 
                  /> 
                </Typography>
              </Box>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Box p={2}>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Hispanic: <span className='text-[#6f6f6f]'>{topSchools.high[0]?.Hispanic || 'N/A'}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Asian: <span className='text-[#6f6f6f]'>{topSchools.high[0]?.Asian || 'N/A'}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Black: <span className='text-[#6f6f6f]'>{topSchools.high[0]?.Black || 'N/A'}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">White: <span className='text-[#6f6f6f]'>{topSchools.high[0]?.White || 'N/A'}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">American Indian: <span className='text-[#6f6f6f]'>{topSchools.high[0]?.["American\nIndian"] || 'N/A'}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Pacific Islander: <span className='text-[#6f6f6f]'>{topSchools.high[0]?.["Pacific\nIslander"] || 'N/A'}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Two or More Races: <span className='text-[#6f6f6f]'>{topSchools.high[0]?.["Two or\nMore Races"] || 'N/A'}</span></Typography>
                  </Box>
                </Box>
              </Popover>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Full-time Teachers: {topSchools.high[0]?.["Full-time Teachers"] || 'N/A'}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">State Percentile: {topSchools.high[0]?.["State Percentile (2023)"] || 'N/A'}</Typography>
                {parseFloat(topSchools.high[0]?.["State Percentile (2023)"] || '0') < 80 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">Statewide Rank: {topSchools.high[0]?.["Statewide Rank (2023)"] || 'N/A'}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Average Standard Score: {topSchools.high[0]?.["Average Standard Score (2023)"] || 'N/A'}</Typography>
                {parseFloat(topSchools.high[0]?.["Average Standard Score (2023)"] || '0') < 80 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Rank Change from Previous Year: {topSchools.high[0]?.["Rank Change from Previous Year"] || 'N/A'}</Typography>
                {parseFloat(topSchools.high[0]?.["Rank Change from Previous Year"] || '0') < 0 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DevelopmentalPage