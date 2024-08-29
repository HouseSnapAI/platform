import { GetServerSideProps } from 'next';
import Overview from '@/components/reports/sections/Overview';
import { fetchReport, fetchListing } from '@/utils/db';
import { Report, ListingType } from '@/utils/types';

type ReportPageProps = {
  data: Report;
  listing: ListingType;
};

const ReportPage = ({ data, listing }: ReportPageProps) => {
  return <Overview data={data} listing={listing} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { reportId } = context.params as { reportId: string };

  // Fetch the report data
  const report = await fetchReport(reportId);
  if (!report || report.status !== 'complete') {
    return {
      notFound: true,
    };
  }

  // Fetch the listing data
  const listing = await fetchListing(report.listing_id);
  if (!listing) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: report,
      listing,
    },
  };
};

export default ReportPage;