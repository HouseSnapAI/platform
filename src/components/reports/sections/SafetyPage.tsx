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
import { ListingType, Report, CensusData, CrimeDataType } from '@/utils/types';
import Tooltip from '@mui/material/Tooltip';
import { IconInfoCircle } from '@tabler/icons-react';

// ** Style
import { useTheme } from '@mui/material/styles';


type Props = {
    crimeData: CrimeDataType | undefined;
    data: Report;
    listing: ListingType;
}

ChartJS.register(ArcElement, ChartTooltip, Legend, PointElement, LineController, LineElement);

const SafetyPage = ({crimeData, data, listing}: Props) => {

    const theme = useTheme();
    const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);

    const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

    const crimeTrendLabels: string[] = [];
    const crimeTrendValuesReported: any[] = [];
    const crimeTrendValuesCleared: any[] = [];

    Object.keys(crimeData?.all_violent_crime_trend[0]).map((data) => {
        if (data != "series") {
            crimeTrendLabels.push(data)
            crimeTrendValuesReported.push(crimeData?.all_violent_crime_trend[0][data])
            crimeTrendValuesCleared.push(crimeData?.all_violent_crime_trend[1][data])
        }
        
    })

    const crimeTrendData = {
        labels: crimeTrendLabels,
        datasets: [
          {
            label: 'Reported Crimes',
            data: crimeTrendValuesReported,
            borderColor: "rgb(177, 52, 235, 0.7)",
            backgroundColor: "rgb(177, 52, 235, 0.7)",
            yAxisID: 'y',
          },
          {
            label: 'Cleared Crimes',
            data: crimeTrendValuesCleared,
            borderColor: "#666",
            backgroundColor: "#666",
            yAxisID: 'y1',
          }
        ]
      };

    const crimeTrendOptions: ChartOptions<"line"> = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            
        },
        scales: {
            x: {
                grid: {
                    color: theme.palette.divider, // Set grid lines to white
                    z: -1, // Ensure grid lines are behind the bars
                },
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                grid: {
                    color: theme.palette.divider, // Set grid lines to white
                    z: -1, // Ensure grid lines are behind the bars
                },
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
        
                // grid line settings
                grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            },
        }
    }

    const offenseTypeLabels: any[] = [];
    const offenseTypeValues: any[] = [];

    crimeData?.offense_linked_to_another_offense.map((offense) => {
        if (offense.value != 0) {
            offenseTypeLabels.push(offense.key)
            offenseTypeValues.push(offense.value)
        }
    })

    const crimeLocationLabels: any[] = [];
    const crimeLocationValues: any[] = [];

    crimeData?.crime_location.map((location) => {
        if (location.value != 0) {
            crimeLocationLabels.push(location.key)
            crimeLocationValues.push(location.value)
        }
    })

    const weaponsLabels: any[] = [];
    const weaponsValues: any[] = [];

    crimeData?.type_of_weapon.map((weapon) => {
        if (weapon.value != 0) {
            weaponsLabels.push(weapon.key)
            weaponsValues.push(weapon.value)
        }
    })

    const offenderAgeLabels: any[] = [];
    const offenderAgeValues: any[] = [];
    let totalValue = 0;

    crimeData?.offender_age.map((age) => {
        if (age.value != 0) {
            offenderAgeLabels.push(age.key)
            totalValue += age.value;
        }
    })

    crimeData?.offender_age.map((age) => {
        if (age.value != 0) {
            offenderAgeValues.push(age.value / totalValue)
        }
    })

    totalValue = 0;

    const victimAgeLabels: any[] = [];
    const victimAgeValues: any[] = [];

    crimeData?.victim_age.map((age) => {
        if (age.value != 0) {
            victimAgeLabels.push(age.key)
            totalValue += age.value;
        }
    })

    crimeData?.victim_age.map((age) => {
        if (age.value != 0) {
            victimAgeValues.push(age.value / totalValue)
        }
    })

    const ethnicityLabels = ["Hispanic", "Not Hispanic", "Unknown"];
    const ethnicityValuesOffender = [
        crimeData?.offender_ethnicity[0].value,
        crimeData?.offender_ethnicity[1].value,
        crimeData?.offender_ethnicity[2].value,
    ];
    const ethnicityValuesVictim = [
        crimeData?.victim_ethnicity[0].value,
        crimeData?.victim_ethnicity[1].value,
        crimeData?.victim_ethnicity[2].value,
    ];

    const raceLabels = ["White", "Black or African American", "Unknown", "Asian", "Native Hawaiian", "American Indian or Alaskan Native"];
    const raceValuesOffender = [
        crimeData?.offender_race[0].value,
        crimeData?.offender_race[1].value,
        crimeData?.offender_race[2].value,
        crimeData?.offender_race[3].value,
        crimeData?.offender_race[4].value,
        crimeData?.offender_race[5].value,
    ];
    const raceValuesVictim = [
        crimeData?.victim_race[0].value,
        crimeData?.victim_race[1].value,
        crimeData?.victim_race[2].value,
        crimeData?.victim_race[3].value,
        crimeData?.victim_race[4].value,
        crimeData?.victim_race[5].value,
    ];

    const relationshipLabels: any[] = [];
    const relationshipValues: any[] = [];
    const tempLabelsRel: any[] = [];
    const tempValsRel: any[] = [];

    console.log(crimeData?.victim_relationship_to_offender)

    crimeData?.victim_relationship_to_offender.map((relationship) => {
        if (relationship.value != 0) {
            relationshipLabels.push(relationship.key)
            relationshipValues.push(relationship.value)
            tempLabelsRel.push(relationship.key)
            tempValsRel.push(relationship.value)
        }
    })

    

    const sexLabels = ["Male", "Female", "Unknown"];
    let totalOffender = crimeData?.offender_sex[0].Male + crimeData?.offender_sex[0].Female + crimeData?.offender_sex[0].Unknown;
    let totalVictim = crimeData?.victim_sex[0].Male + crimeData?.victim_sex[0].Female + crimeData?.victim_sex[0].Unknown;
    const sexValuesOffender = [
        crimeData?.offender_sex[0].Male / totalOffender,
        crimeData?.offender_sex[0].Female / totalOffender,
        crimeData?.offender_sex[0].Unknown / totalOffender,
    ];
    const sexValuesVictim = [
        crimeData?.victim_sex[0].Male / totalVictim,
        crimeData?.victim_sex[0].Female / totalVictim,
        crimeData?.victim_sex[0].Unknown / totalVictim,
    ];

    const sexBarData = {
        labels: sexLabels,
        datasets: [
            {
                label: 'Offender',
                data: sexValuesOffender,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                barThickness: 15,
            },
            {
                label: 'Victim',
                data: sexValuesVictim,
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
                barThickness: 15,
            },
        ],
    
    }

    const ethnicityData = {
        labels: ethnicityLabels,
        datasets: [
          {
            label: "Offender",
            data: ethnicityValuesOffender,
            backgroundColor: ["#299ce3", "#116599", "#6b99b5"],
            borderColor: "#121212"
          },
          {
            label: "Victim",
            data: ethnicityValuesVictim,
            backgroundColor: ["#f5a940", "#b07320", "#e3c091"],
            borderColor: "#121212"
          },
        ],
      }
    
      const ethnicityChartOptions = {
        cutout: '55%', // Adjust cutout to make the chart smaller,
        aspectRatio: 1,
        plugins: {
          tooltip: { 
            enabled: true,
            callbacks: {
                label: function(context: any) {
                    let label = context.label,
                      currentValue = context.raw,
                      total = context.chart._metasets[context.datasetIndex].total;
        
                    let percentage = parseFloat((currentValue/total*100).toFixed(1));
        
                  return context.dataset.label + ": " + percentage + '%';
                }
            } 
        },
          legend: { display: false },
        },
        
      };

    /**
     * Generates a data object for a bar chart that displays offender and victim age data.
     * 
     * The data object contains two datasets, one for offender age and one for victim age. Each dataset has a label, data values, and styling properties.
     * 
     * The data values are extracted from the `crimeData` object, which is assumed to contain offense-related data. The `offenderAgeLabels`, `offenderAgeValues`, `victimAgeLabels`, and `victimAgeValues` variables are used to populate the data object.
     */
    const ageBarData = {
        labels: offenderAgeLabels,
        datasets: [
            {
                label: 'Offender Age',
                data: offenderAgeValues,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Victim Age',
                data: victimAgeValues,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    
    }

    const ageBarOptions: ChartOptions<'bar'> = {
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: theme.palette.divider, // Set grid lines to white
                    z: -1, // Ensure grid lines are behind the bars
                },
                ticks: {
                    format: {
                        style: 'percent'
                    }
                }
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
                display: true,
                position: 'top'
            },
        },
    };

    const sexBarOptions: any = {
        indexAxis: 'y',
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
                ticks: {
                    format: {
                        style: 'percent'
                    }
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
        },
    };
    
      const raceOptions = {
        cutout: '0%', // Adjust cutout to make the chart smaller,
        aspectRatio: 1,
        plugins: {
          tooltip: { 
            enabled: true,
            callbacks: {
                label: function(context: any) {
                    let label = context.label,
                      currentValue = context.raw,
                      total = context.chart._metasets[context.datasetIndex].total;
        
                    let percentage = parseFloat((currentValue/total*100).toFixed(1));
        
                  return percentage + '%';
                }
            } 
        },
          legend: { display: false },
        },
        
      };

    const raceData = (labels: any, values: any) => ({
    type: 'doughnut',
    labels: labels,
    datasets: [
        {
        data: values,
        backgroundColor: ['#0a99ff', '#f2be55', '#4ccf7a', '#9e6fd1', "#f76ac8", "#f27c83"],
        borderColor: "#121212"
        },
    ],
    })

    const typeData = (labels: any, values: any) => ({
        type: 'doughnut',
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: labels.map(() => randomRGB()),
            borderColor: "#121212"
          },
        ],
      })
    
      const chartOptions = {
        cutout: '65%', // Adjust cutout to make the chart smaller,
        aspectRatio: 1,
        title: "crime",
        plugins: {
          tooltip: { 
            enabled: true,
            callbacks: {
                label: function(context: any) {
                    let label = context.label,
                      currentValue = context.raw,
                      total = context.chart._metasets[context.datasetIndex].total;
        
                    let percentage = parseFloat((currentValue/total*100).toFixed(1));
        
                  return percentage + '%';
                }
            } 
        },
          legend: { display: false },
        },
        
      };

      const relationshipOptions = {
        cutout: '70%', // Adjust cutout to make the chart smaller,
        aspectRatio: 1,
        title: "crime",
        plugins: {
          tooltip: { 
            enabled: true,
            callbacks: {
                label: function(context: any) {
                    let label = context.label,
                      currentValue = context.raw,
                      total = context.chart._metasets[context.datasetIndex].total;
        
                    let percentage = parseFloat((currentValue/total*100).toFixed(1));
        
                  return percentage + '%';
                }
            } 
        },
          legend: { display: false },
        },
        
      };

    useEffect(() => {
        console.log(data);
        console.log(crimeData);
        // get all crime data id's and consolidate information based on the keys
    }, [data]);

    return (
        <Box className='flex px-[10px] w-[100vw] justify-center gap-[10px]'>
            <Box className='overflow-y-auto pb-[100px] flex flex-col bg-[#121212] w-[52%] rounded-md py-[20px] px-[20px]'>
                <Typography className='text-[#e4e4e4] text-[22px]'>Crime Score: {data.crime_score.toFixed(3)}</Typography>
                <Box className=' mt-[20px] flex justify-start items-center gap-[10px] flex-wrap'>
                    <Typography className='text-[#ababab] text-[16px]'>Agencies:</Typography>
                    {
                        crimeData?.agencies.map((agency) => (
                            <Box className='flex justify-center items-center bg-[#313131] rounded-sm px-[6px] py-[2px]'>
                                <Typography className='text-[#ababab] text-[12px]'>{agency}</Typography>
                            </Box>
                        ))
                    }
                </Box>
                <Box className="mt-[40px] flex flex-col">
                    <Typography className='text-[#ababab] text-[16px]'>Crime Trend</Typography>
                    <Line  data={crimeTrendData} options={crimeTrendOptions} />
                </Box>
                <Box className='flex justify-around items-center  mt-[40px] flex-wrap w-[100%]'>
                    <Box className='flex bg-[#181818] rounded-md shadow-lg flex-col justify-center items-center min-w-[150px] w-[27%] py-[15px] gap-[10px]'>
                        <Box className='h-[150px] w-[130px]  flex justify-center items-center'>
                            <Doughnut data={typeData(offenseTypeLabels, offenseTypeValues)} options={chartOptions} />
                        </Box>
                        <Typography className='text-[#949494] text-[15px]'>Crime Type</Typography>
                    </Box>
                    <Box className='flex bg-[#181818] rounded-lg shadow-md flex-col justify-center items-center min-w-[150px] w-[27%] py-[15px] gap-[10px]'>
                        <Box className='h-[150px] w-[130px]  flex justify-center items-center'>
                            <Doughnut data={typeData(crimeLocationLabels, crimeLocationValues)} options={chartOptions} />
                        </Box>
                        <Typography className='text-[#949494] text-[15px]'>Location</Typography>
                    </Box>
                    <Box className='flex bg-[#181818] rounded-lg shadow-md flex-col justify-center items-center min-w-[150px] w-[27%] py-[15px] gap-[10px]'>
                        <Box className='h-[150px] w-[130px]  flex justify-center items-center'>
                            <Doughnut data={typeData(weaponsLabels, weaponsValues)} options={chartOptions} />
                        </Box>
                        <Typography className='text-[#949494] text-[15px]'>Weapon(s)</Typography>
                    </Box>
                BN</Box>

                <Box className='mt-[20px] flex items-start justify-center w-[100%] flex-col gap-[10px]'>
                    <Typography className='text-[#ababab] text-[16px]'>Age Data</Typography>
                    <Bar style={{width: "90%", height: "90%"}} data={ageBarData} options={ageBarOptions} />
                </Box>

                <Box className="mt-[40px] flex items-center justify-around flex-wrap">
                    <Box className='flex flex-col items-center justify-center gap-[5px]'>
                        <Typography className='text-[#ababab] text-[16px]'>Ethnicity Data</Typography>
                        <Typography className='text-[#838383] text-[14px] mb-[5px]'>Hispanic, Not Hispanic, Unkown</Typography>
                        <Box className='h-[220px] w-[220px]  flex justify-center items-center'>
                            <Doughnut data={ethnicityData} options={ethnicityChartOptions} />
                        T</Box>
                    </Box>
                    <Box className='flex justify-center items-center gap-[40px] bg-[#181818] rounded-sm shadow-lg h-[240px] px-[20px]'>
                        <Box className='flex flex-col justify-center gap-[10px] items-center'>
                            <Typography className='text-[#ababab] text-[16px]'>Offender Race</Typography>
                            <Box className='h-[150px] w-[130px]  flex justify-center items-center'>
                                <Doughnut data={raceData(raceLabels, raceValuesOffender)} options={raceOptions} />
                            </Box>
                            <Typography className='text-[#838383] text-[14px]'>Majority: {raceLabels[raceValuesOffender.indexOf(Math.max(...raceValuesOffender))]} - {Math.max(...raceValuesOffender)} crimes</Typography>
                        </Box>
                        <Box className='flex flex-col justify-center gap-[10px] items-center'>
                            <Typography className='text-[#ababab] text-[16px]'>Victim Race</Typography>
                            <Box className='h-[150px] w-[130px]  flex justify-center items-center'>
                                <Doughnut data={raceData(raceLabels, raceValuesVictim)} options={raceOptions} />
                            </Box>
                            <Typography className='text-[#838383] text-[14px]'>{raceLabels[raceValuesVictim.indexOf(Math.max(...raceValuesVictim))]} - {Math.max(...raceValuesVictim)} victims</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box className='mt-[40px] flex justify-center gap-[30px] items-center'>
                    <Box className='flex items-start justify-center w-[50%] flex-col gap-[10px]'>
                        <Typography className='text-[#ababab] text-[16px]'>Sex Data</Typography>
                        <Bar style={{width: "90%", height: "90%"}} data={sexBarData} options={sexBarOptions} />
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
                            <Box className='h-[200px] w-[200px]  flex justify-center items-center'>
                                <Doughnut data={typeData(tempLabelsRel, tempValsRel)} options={relationshipOptions} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                
            </Box>
            <Box className='flex flex-col bg-[#121212] w-[47%] rounded-md py-[20px] px-[20px]'>
                <Typography className='text-[#e4e4e4] text-[22px]'>Environmental Score: {0}</Typography>
            </Box>
        </Box>
    )
}

export default SafetyPage