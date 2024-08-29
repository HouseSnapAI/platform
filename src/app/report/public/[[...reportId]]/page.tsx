import { use } from 'react';
import Overview from '@/components/reports/sections/Overview';
import { fetchReport, fetchListing } from '@/utils/db';
import { Report, ListingType } from '@/utils/types';

import Box from '@mui/material/Box';
type ReportPageProps = {
  params: {
    reportId: string;
  };
};

const fetchData = async (reportId: string) => {
  const report = await fetchReport(reportId);
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

  return { report, listing };
};

const ReportPage = ({ params }: ReportPageProps) => {
  const { reportId } = params;
  const { report, listing } = use(fetchData(reportId[0]));

  console.log("listingUNQIUE",listing)

  if (!report || !listing) {
    return <div>Report or Listing not found</div>;
  }

  return (
    <Box className='w-[100vw] h-[100vh] bg-black p-4'>
        <Overview data={report} listing={listing} />
    </Box>
  );
};

export default ReportPage;