import { use } from 'react';
import Overview from '@/components/reports/sections/Overview';
import { fetchReportsByPublicId, fetchListing, fetchCrimeData, fetchEnvData } from '@/utils/db';
import { Report, ListingType } from '@/utils/types';

import Box from '@mui/material/Box';
type ReportPageProps = {
  params: {
    publicId: string;
  };
};

const fetchData = async (publicId: string) => {
  const report: Report = await fetchReportsByPublicId(publicId);
  if (!report || report.status !== 'complete') {    
    return { notFound: true };
  }

  console.log("REPORT ID",report.listing_id)
  const listingResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/listing/fetch/single`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: report.listing_id }),
  });
  const listing = await listingResponse.json();
  console.log("listing",listing)
  if (!listing) {
    return { notFound: true };
  }

  const crimeData = await fetchCrimeData(report.crime_data_ids);

  const envData = await fetchEnvData(report.listing_id);

  return { report, listing, crimeData, envData };
};

const ReportPage = ({ params }: ReportPageProps) => {
  const { publicId } = params;
  const { report, listing, crimeData, envData } = use(fetchData(publicId[0]));

  console.log("listingUNQIUE",listing)

  if (!report || !listing) {
    return <div>Report or Listing not found</div>;
  }

  return (
    <Box className='w-[100vw] h-[100vh] bg-black flex flex-col items-center justify-center'>
        <Overview data={report} listing={listing} crimeData={crimeData} envData={envData} isPublic={true} />
    </Box>
  );
};

export default ReportPage;