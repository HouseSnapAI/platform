import { CrimeDataType } from '@/utils/types';
import { ChartOptions } from 'chart.js';
import { loansAdjustment } from './vars';
import { supabase } from '@/supabase/client';

export async function mortgageCalc(listPrice: number, creditScore: number, downpayment: number) {
    const loanAmount = listPrice - downpayment;
    const ltv = (loanAmount / listPrice) * 100;

    const data = loansAdjustment;

    let llpaAdjustment = 0.0;
    let creditData: any;

    if (creditScore >= 780) {
        creditData = data["Purchase_Money_Loans_LLPA_by_Credit_Score_LTV_Ratio"][">= 780"];
    } else if (creditScore >= 760) {
        creditData = data["Purchase_Money_Loans_LLPA_by_Credit_Score_LTV_Ratio"]["760 - 779"];
    } else if (creditScore >= 740) {
        creditData = data["Purchase_Money_Loans_LLPA_by_Credit_Score_LTV_Ratio"]["740 - 759"];
    } else if (creditScore >= 720) {
        creditData = data["Purchase_Money_Loans_LLPA_by_Credit_Score_LTV_Ratio"]["720 - 739"];
    } else if (creditScore >= 700) {
        creditData = data["Purchase_Money_Loans_LLPA_by_Credit_Score_LTV_Ratio"]["700 - 719"];
    } else if (creditScore >= 680) {
        creditData = data["Purchase_Money_Loans_LLPA_by_Credit_Score_LTV_Ratio"]["680 - 699"];
    } else if (creditScore >= 660) {
        creditData = data["Purchase_Money_Loans_LLPA_by_Credit_Score_LTV_Ratio"]["660 - 679"];
    } else if (creditScore >= 640) {
        creditData = data["Purchase_Money_Loans_LLPA_by_Credit_Score_LTV_Ratio"]["640 - 659"];
    } else {
        creditData = data["Purchase_Money_Loans_LLPA_by_Credit_Score_LTV_Ratio"]["< 639"];
    }

    if (ltv <= 30) {
        llpaAdjustment = parseFloat(creditData["<= 30.00%"].replace('%', '')) / 100;
    } else if (ltv <= 60) {
        llpaAdjustment = parseFloat(creditData["30.01% - 60.00%"].replace('%', '')) / 100;
    } else if (ltv <= 70) {
        llpaAdjustment = parseFloat(creditData["60.01% - 70.00%"].replace('%', '')) / 100;
    } else if (ltv <= 75) {
        llpaAdjustment = parseFloat(creditData["70.01% - 75.00%"].replace('%', '')) / 100;
    } else if (ltv <= 80) {
        llpaAdjustment = parseFloat(creditData["75.01% - 80.00%"].replace('%', '')) / 100;
    } else if (ltv <= 85) {
        llpaAdjustment = parseFloat(creditData["80.01% - 85.00%"].replace('%', '')) / 100;
    } else if (ltv <= 90) {
        llpaAdjustment = parseFloat(creditData["85.01% - 90.00%"].replace('%', '')) / 100;
    } else if (ltv <= 95) {
        llpaAdjustment = parseFloat(creditData["90.01% - 95.00%"].replace('%', '')) / 100;
    } else {
        llpaAdjustment = parseFloat(creditData["> 95.00%"].replace('%', '')) / 100;
    }


    const { data: response } = await supabase
        .from('mortgage_30')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .single();

    const adjustedAnnualRate = response.mortgage30us + llpaAdjustment;
    const monthlyRate = adjustedAnnualRate / 100 / 12;
    const n = 30 * 12;

    const monthlyMortgagePayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);

    const lowerEndTax = (0.01 * listPrice) / 12;
    const upperEndTax = (0.02 * listPrice) / 12;

    return {
        monthlyMortgagePayment,
        adjustedAnnualRate,
        lowerEndTax,
        upperEndTax
    };
}

export const crimeDataUtil = (crimeData: CrimeDataType, theme:any) => {
    const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);

    const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

    const crimeTrendLabels: string[] = [];
    const crimeTrendValuesReported: any[] = [];
    const crimeTrendValuesCleared: any[] = [];

    if(crimeData?.all_violent_crime_trend[0]){

        Object.keys(crimeData?.all_violent_crime_trend[0]).map((data) => {
            if (data != "series") {
                crimeTrendLabels.push(data)
                crimeTrendValuesReported.push(crimeData?.all_violent_crime_trend[0][data])
                crimeTrendValuesCleared.push(crimeData?.all_violent_crime_trend[1][data])
            }
            
        })
    }
        
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
        backgroundColor: ['#1472b5', '#dba63b', '#32ad5e', '#7646ab', "#bf3b93", "#c7464d"],
        borderColor: ['#0a99ff', '#f2be55', '#4ccf7a', '#9e6fd1', "#f76ac8", "#f27c83"],
        borderWidth: 1.5,
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
      return {
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
      }
}