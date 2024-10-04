'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { CensusData, CrimeDataType, EnvDataType, HomeDetails, ListingType, MarketTrendsType, Report, TopSchools } from '@/utils/types';
import { exampleHomeDetails } from '@/utils/vars';
import ListingAccordion from './overview-components/ListingAccordion';
import HomeDetailsAccordion from './overview-components/HomeDetails';
import MarketTrendsAccordion from './overview-components/MarketTrendsAccordion';
import SchoolScoresAccordion from './overview-components/SchoolScoresAccordion';
import DemographicsAccordion from './overview-components/DemographicsAccordion';
import CrimeDataAccordion from './overview-components/CrimeDataAccordion';
import AgentCard from './overview-components/AgentCard';
import DisclosureAccordion from './overview-components/DisclosureAccordion';
import EnvironmentalAccordion from './overview-components/EnvironmentalAccordion';
import { Chart, CategoryScale, LinearScale, PointElement, LineController, LineElement, ArcElement, Tooltip, Legend, BarElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineController, LineElement, ArcElement, Tooltip, Legend, BarElement);

type OverviewProps = {
  data: Report;
  listing: ListingType;
  crimeData: CrimeDataType;
  envData: EnvDataType;
  isPublic: boolean;
};

const Overview = ({ data, listing, crimeData, envData, isPublic }: OverviewProps) => {
  const homeDetails: HomeDetails = data.home_details ? JSON.parse(data.home_details) : exampleHomeDetails;
  const marketTrends: MarketTrendsType = JSON.parse(data.market_trends);
  const topSchools: TopSchools = JSON.parse(data.top_schools);
  const censusData: CensusData = JSON.parse(data.census_data);
  const theme = useTheme();

  const [interactions, setInteractions] = useState<any[]>([]);
  const [accordionTimes, setAccordionTimes] = useState<{ [key: string]: number }>({});
  const [hoveredAccordion, setHoveredAccordion] = useState<string | null>(null);

  const updateInteractions = async () => {
    if (!isPublic) {
      return;
    }

    const response = await fetch(`/interactions/${data.public_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ interactions }),
    });
  };

  const handleAccordionClick = (section: string) => {
    setInteractions((prev) => [...prev, { type: 'click', section, timestamp: new Date().toISOString() }]);
  };

  const handleAccordionHover = (section: string) => {
    console.log("IN HOVER")
    setHoveredAccordion(section);
    setInteractions((prev) => [...prev, { type: 'hover', section, timestamp: new Date().toISOString() }]);
  };

  const handleAccordionOpen = (section: string) => {
    setAccordionTimes((prev) => ({ ...prev, [section]: Date.now() }));
  };

  const handleAccordionClose = (section: string) => {
    const openTime = accordionTimes[section];
    if (openTime) {
      const timeSpent = Date.now() - openTime;
      setInteractions((prev) => [...prev, { type: 'timeSpent', section, timeSpent, timestamp: new Date().toISOString() }]);
      setAccordionTimes((prev) => ({ ...prev, [section]: 0 }));
    }
  };

  useEffect(() => {
    const interval = setInterval(updateInteractions, 60000); // Update interactions every minute
    return () => clearInterval(interval);
  }, [interactions]);

  const disclosureData = [
    { type: 'pests', message: 'No pests reported', status: 'medium' },
    { type: 'hvac', message: 'HVAC system last serviced in 2021', status: 'good' },
    { type: 'roofing', message: 'Roof replaced in 2018', status: 'good' },
    { type: 'flooding', message: 'No history of flooding', status: 'high' },
    { type: 'other', message: 'Minor cracks in the foundation', status: 'minor' }
  ];

  return (
    <Box className="flex w-full items-center justify-evenly relative" sx={{ height: '80vh', overflow: 'hidden' }}>
      <Box className="w-[700px] h-full overflow-y-auto">
        <Box className="w-full py-2 flex flex-col items-center gap-2 px-2 ">
          <ListingAccordion
            listing={listing}
            onClick={() => handleAccordionClick('Listing')}
            onMouseEnter={() => handleAccordionHover('Listing')}
            onOpen={() => handleAccordionOpen('Listing')}
            onClose={() => handleAccordionClose('Listing')}
          />
          <HomeDetailsAccordion
            listing={listing}
            homeDetails={homeDetails}
            onClick={() => handleAccordionClick('HomeDetails')}
            onMouseEnter={() => handleAccordionHover('HomeDetails')}
            onOpen={() => handleAccordionOpen('HomeDetails')}
            onClose={() => handleAccordionClose('HomeDetails')}
          />
          <MarketTrendsAccordion
            marketTrends={marketTrends}
            listing={listing}
            onClick={() => handleAccordionClick('MarketTrends')}
            onMouseEnter={() => handleAccordionHover('MarketTrends')}
            onOpen={() => handleAccordionOpen('MarketTrends')}
            onClose={() => handleAccordionClose('MarketTrends')}
          />
          <SchoolScoresAccordion
            topSchools={topSchools}
            schoolScore={data.school_score}
            onClick={() => handleAccordionClick('SchoolScores')}
            onMouseEnter={() => handleAccordionHover('SchoolScores')}
            onOpen={() => handleAccordionOpen('SchoolScores')}
            onClose={() => handleAccordionClose('SchoolScores')}
          />
          <DemographicsAccordion
            censusData={censusData}
            listing={listing}
            onClick={() => handleAccordionClick('Demographics')}
            onMouseEnter={() => handleAccordionHover('Demographics')}
            onOpen={() => handleAccordionOpen('Demographics')}
            onClose={() => handleAccordionClose('Demographics')}
          />
          <CrimeDataAccordion
            crimeData={crimeData}
            crimeScore={data.crime_score}
            onClick={() => handleAccordionClick('CrimeData')}
            onMouseEnter={() => handleAccordionHover('CrimeData')}
            onOpen={() => handleAccordionOpen('CrimeData')}
            onClose={() => handleAccordionClose('CrimeData')}
          />
          <EnvironmentalAccordion
            envData={envData}
            data={data}
            onClick={() => handleAccordionClick('Environmental')}
            onMouseEnter={() => handleAccordionHover('Environmental')}
            onOpen={() => handleAccordionOpen('Environmental')}
            onClose={() => handleAccordionClose('Environmental')}
          />
          <DisclosureAccordion
            disclosureData={disclosureData}
            onClick={() => handleAccordionClick('Disclosure')}
            onMouseEnter={() => handleAccordionHover('Disclosure')}
            onOpen={() => handleAccordionOpen('Disclosure')}
            onClose={() => handleAccordionClose('Disclosure')}
          />
        </Box>
      </Box>
      <Box className="w-[400px] h-full overflow-y-auto">
        <AgentCard listing={listing} isPublic={isPublic} public_id={data.public_id} />
      </Box>
    </Box>
  );
};

export default Overview;