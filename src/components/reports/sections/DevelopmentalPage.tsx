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
import { ListingType, Report, School } from '@/utils/types';

type DevelopmentalPageProps = {
  data: Report;
  listing: ListingType;
}

// ** Chart
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, ChartTooltip, Legend);

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
                <Typography fontSize={14}>{data.top_schools.elementary[0].Name}</Typography>
                <Typography fontSize={14} color={data.top_schools.elementary[0].Score > 80 ? "success.main" : "error.main"}>
                    {data.top_schools.elementary[0].Score.toFixed(0 )}
                </Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">{data.top_schools.elementary[0].Address} {data.top_schools.elementary[0].City}, {data.top_schools.elementary[0].Zip}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Distance: {data.top_schools.elementary[0].Distance}</Typography>
                {parseFloat(data.top_schools.elementary[0].Distance) > 1.5 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">Grades: {data.top_schools.elementary[0].Grades}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">Phone: {data.top_schools.elementary[0].Phone}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Enrollment: {data.top_schools.elementary[0].Enrollment}</Typography>
                {data.top_schools.elementary[0]["Student/\nTeacher Ratio"] > 30 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Student/Teacher Ratio: {data.top_schools.elementary[0]["Student/\nTeacher Ratio"]}</Typography>
                {data.top_schools.elementary[0]["Student/\nTeacher Ratio"] > 30 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
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
                    <Typography fontSize={14} color="text.primary">Hispanic: <span className='text-[#6f6f6f]'>{data.top_schools.elementary[0].Hispanic}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Asian: <span className='text-[#6f6f6f]'>{data.top_schools.elementary[0].Asian}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Black: <span className='text-[#6f6f6f]'>{data.top_schools.elementary[0].Black}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">White: <span className='text-[#6f6f6f]'>{data.top_schools.elementary[0].White}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">American Indian: <span className='text-[#6f6f6f]'>{data.top_schools.elementary[0]["American\nIndian"]}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Pacific Islander: <span className='text-[#6f6f6f]'>{data.top_schools.elementary[0]["Pacific\nIslander"]}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Two or More Races: <span className='text-[#6f6f6f]'>{data.top_schools.elementary[0]["Two or\nMore Races"]}</span></Typography>
                  </Box>
                </Box>
              </Popover>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Full-time Teachers: {data.top_schools.elementary[0]["Full-time Teachers"]}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">State Percentile: {data.top_schools.elementary[0]["State Percentile (2023)"]}</Typography>
                {parseFloat(data.top_schools.elementary[0]["State Percentile (2023)"] || "") < 80 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">Statewide Rank: {data.top_schools.elementary[0]["Statewide Rank (2023)"]}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Average Standard Score: {data.top_schools.elementary[0]["Average Standard Score (2023)"]}</Typography>
                {parseFloat(data.top_schools.elementary[0]["Average Standard Score (2023)"] || "") < 80 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Rank Change from Previous Year: {data.top_schools.elementary[0]["Rank Change from Previous Year"]}</Typography>
                {parseFloat(data.top_schools.elementary[0]["Rank Change from Previous Year"] || "") < 0 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
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
                <Typography fontSize={14}>{data.top_schools.middle[0].Name}</Typography>
                <Typography fontSize={14} color={data.top_schools.middle[0].Score > 80 ? "success.main" : "error.main"}>
                    {data.top_schools.middle[0].Score.toFixed(0)}
                </Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">{data.top_schools.middle[0].Address} {data.top_schools.middle[0].City}, {data.top_schools.middle[0].Zip}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Distance: {data.top_schools.middle[0].Distance}</Typography>
                {parseFloat(data.top_schools.middle[0].Distance) > 1.5 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">Grades: {data.top_schools.middle[0].Grades}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">Phone: {data.top_schools.middle[0].Phone}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Enrollment: {data.top_schools.middle[0].Enrollment}</Typography>
                {data.top_schools.middle[0]["Student/\nTeacher Ratio"] > 30 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Student/Teacher Ratio: {data.top_schools.middle[0]["Student/\nTeacher Ratio"]}</Typography>
                {data.top_schools.middle[0]["Student/\nTeacher Ratio"] > 30 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
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
                    <Typography fontSize={14} color="text.primary">Hispanic: <span className='text-[#6f6f6f]'>{data.top_schools.middle[0].Hispanic}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Asian: <span className='text-[#6f6f6f]'>{data.top_schools.middle[0].Asian}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Black: <span className='text-[#6f6f6f]'>{data.top_schools.middle[0].Black}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">White: <span className='text-[#6f6f6f]'>{data.top_schools.middle[0].White}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">American Indian: <span className='text-[#6f6f6f]'>{data.top_schools.middle[0]["American\nIndian"]}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Pacific Islander: <span className='text-[#6f6f6f]'>{data.top_schools.middle[0]["Pacific\nIslander"]}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Two or More Races: <span className='text-[#6f6f6f]'>{data.top_schools.middle[0]["Two or\nMore Races"]}</span></Typography>
                  </Box>
                </Box>
              </Popover>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Full-time Teachers: {data.top_schools.middle[0]["Full-time Teachers"]}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">State Percentile: {data.top_schools.middle[0]["State Percentile (2023)"]}</Typography>
                {parseFloat(data.top_schools.middle[0]["State Percentile (2023)"] || "") < 80 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">Statewide Rank: {data.top_schools.middle[0]["Statewide Rank (2023)"]}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Average Standard Score: {data.top_schools.middle[0]["Average Standard Score (2023)"]}</Typography>
                {parseFloat(data.top_schools.middle[0]["Average Standard Score (2023)"] || "") < 80 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Rank Change from Previous Year: {data.top_schools.middle[0]["Rank Change from Previous Year"]}</Typography>
                {parseFloat(data.top_schools.middle[0]["Rank Change from Previous Year"] || "") < 0 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
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
                <Typography fontSize={14}>{data.top_schools.high[0].Name}</Typography>
                <Typography fontSize={14} color={data.top_schools.high[0].Score > 80 ? "success.main" : "error.main"}>
                    {data.top_schools.high[0].Score.toFixed(0)}
                </Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">{data.top_schools.high[0].Address} {data.top_schools.high[0].City}, {data.top_schools.high[0].Zip}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Distance: {data.top_schools.high[0].Distance}</Typography>
                {parseFloat(data.top_schools.high[0].Distance) > 1.5 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">Grades: {data.top_schools.high[0].Grades}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">Phone: {data.top_schools.high[0].Phone}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Enrollment: {data.top_schools.high[0].Enrollment}</Typography>
                {data.top_schools.high[0]["Student/\nTeacher Ratio"] > 30 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Student/Teacher Ratio: {data.top_schools.high[0]["Student/\nTeacher Ratio"]}</Typography>
                {data.top_schools.high[0]["Student/\nTeacher Ratio"] > 30 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
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
                    <Typography fontSize={14} color="text.primary">Hispanic: <span className='text-[#6f6f6f]'>{data.top_schools.high[0].Hispanic}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Asian: <span className='text-[#6f6f6f]'>{data.top_schools.high[0].Asian}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Black: <span className='text-[#6f6f6f]'>{data.top_schools.high[0].Black}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">White: <span className='text-[#6f6f6f]'>{data.top_schools.high[0].White}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">American Indian: <span className='text-[#6f6f6f]'>{data.top_schools.high[0]["American\nIndian"]}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Pacific Islander: <span className='text-[#6f6f6f]'>{data.top_schools.high[0]["Pacific\nIslander"]}</span></Typography>
                  </Box>
                  <Box className='flex justify-between items-center'>
                    <Typography fontSize={14} color="text.primary">Two or More Races: <span className='text-[#6f6f6f]'>{data.top_schools.high[0]["Two or\nMore Races"]}</span></Typography>
                  </Box>
                </Box>
              </Popover>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Full-time Teachers: {data.top_schools.high[0]["Full-time Teachers"]}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">State Percentile: {data.top_schools.high[0]["State Percentile (2023)"]}</Typography>
                {parseFloat(data.top_schools.high[0]["State Percentile (2023)"] || "") < 80 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.secondary">Statewide Rank: {data.top_schools.high[0]["Statewide Rank (2023)"]}</Typography>
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Average Standard Score: {data.top_schools.high[0]["Average Standard Score (2023)"]}</Typography>
                {parseFloat(data.top_schools.high[0]["Average Standard Score (2023)"] || "") < 80 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
              <Box className='flex justify-between items-center'>
                <Typography fontSize={14} color="text.primary">Rank Change from Previous Year: {data.top_schools.high[0]["Rank Change from Previous Year"]}</Typography>
                {parseFloat(data.top_schools.high[0]["Rank Change from Previous Year"] || "") < 0 ? <IconMinus size={14} color={theme.palette.error.main} /> : <IconPlus size={14} color={theme.palette.primary.main} />}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DevelopmentalPage