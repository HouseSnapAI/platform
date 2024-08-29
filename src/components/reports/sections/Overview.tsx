'use client';

// ** Next Imports
import React from 'react';

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Style
import { useTheme } from '@mui/material/styles';

// ** Types
import { CensusData, CrimeDataType, EnvDataType, HomeDetails, ListingType, MarketTrendsType, Report, TopSchools } from '@/utils/types'

// ** Utils
import { exampleHomeDetails } from '@/utils/vars'

// ** Accordion Components
import ListingAccordion from './overview-components/ListingAccordion'
import HomeDetailsAccordion from './overview-components/HomeDetails';
import MarketTrendsAccordion from './overview-components/MarketTrendsAccordion';
import SchoolScoresAccordion from './overview-components/SchoolScoresAccordion';
import DemographicsAccordion from './overview-components/DemographicsAccordion';
import CrimeDataAccordion from './overview-components/CrimeDataAccordion';
import AgentCard from './overview-components/AgentCard';




type OverviewProps = {
    data: Report
    listing: ListingType
    crimeData: CrimeDataType
    envData: EnvDataType
}

const Overview = ({ data, listing, crimeData, envData }: OverviewProps) => {
  const homeDetails: HomeDetails = data.home_details ? JSON.parse(data.home_details) : exampleHomeDetails;
  const marketTrends: MarketTrendsType = JSON.parse(data.market_trends);
  const topSchools: TopSchools = JSON.parse(data.top_schools);
  const censusData: CensusData = JSON.parse(data.census_data);

  const theme = useTheme();
 
  return (
    <Box className="flex w-full items-center justify-evenly" sx={{ height: '80vh', overflow: 'hidden' }}>
      <Box className='w-[700px] h-full overflow-y-auto'>
        <Box className="w-full py-2 flex flex-col items-center gap-2 px-2 ">
          {/* Listing Details Accordion */}
          <ListingAccordion listing={listing} />

          <HomeDetailsAccordion listing={listing} homeDetails={homeDetails} />

        {/* Comparable Homes Accordion */}
        <MarketTrendsAccordion marketTrends={marketTrends} listing={listing} />
          
          {/* School Scores Accordion */}
          <SchoolScoresAccordion topSchools={topSchools} schoolScore={data.school_score} />

          {/* Demographics Accordion */}
          <DemographicsAccordion censusData={censusData} listing={listing} />

          {/* Crime Data Accordion */}
          <CrimeDataAccordion crimeData={crimeData} crimeScore={data.crime_score} />

          {/* Disclosure Packet */}
          <></>
        </Box>
      </Box>


      <Box className="w-[400px] h-full overflow-y-auto">
        <AgentCard listing={listing} />
      </Box>
    </Box>
  )
}

export default Overview