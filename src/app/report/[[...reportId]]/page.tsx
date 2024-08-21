"use client"

// ** Next Imports
import {useState, useEffect} from 'react'
import { useParams } from 'next/navigation';

// ** MUI Imports
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// ** Type Imports
import { User, Report, ListingType } from '@/utils/types';

// ** Style Imports
import { useTheme } from '@mui/material/styles';

// ** Auth Imports
import { useUser } from '@auth0/nextjs-auth0/client';

// ** Util Imports
import { checkReport, fetchReport, fetchUserInfo } from '@/utils/db';

// ** Icon Imports
import { IconGraph, IconMap, IconPaywall } from '@tabler/icons-react';

// ** Component Imports
import PricingPaymentComponent from '@/components/reports/pricing/PricingPageComponent';
import CashFlow from '@/components/reports/sections/CashFlow';
import Overview from '@/components/reports/sections/Overview';


const ChatPage = () => {

  // ** User States
  const {user} = useUser();
  const [userInfo, setUserInfo] = useState<User | null>(null)
 
  // ** Report States
  const [data, setData] = useState<Report | Partial<Report>>({status: 'empty'});
  const [status, setStatus] = useState('empty');
  const [authReport, setAuthReport] = useState(false);

  // ** Listing States
  const [listing, setListing] = useState<ListingType | null>(null);

  const { reportId } = useParams();

  const theme = useTheme();

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <Overview data={data as Report} listing={listing as ListingType} />;
      case 1:
        return <CashFlow data={data as Report} listing={listing as ListingType} />;
      default:
        return <Overview data={data as Report} listing={listing as ListingType} />;
    }
  };

  const fetchSingleListing = async (id: string) => {
    try {
      const response = await fetch('/api/listing/fetch/single', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const fetchedListing = await response.json();
      setListing(fetchedListing);
    } catch (error) {
      console.error('Error fetching listing:', error);
    }
  }

  useEffect(() => {
    const updateReport = async () => {
      console.log('Checking report validity for reportId:', reportId[0], 'and userId:', userInfo?.id);
      const valid = await checkReport(reportId[0] as string, userInfo?.id as string);
      console.log('Report validity:', valid);
      setAuthReport(valid);
      if(valid){
        console.log('Fetching report for reportId:', reportId[0]);
        const report = await fetchReport(reportId[0] as string);
        if (report && report.status == 'complete'){
          console.log('Report fetched successfully:', report);
          setData({...report } as Report);
          fetchSingleListing(report.listing_id);
        } else {
          console.log('No report found, setting status to empty');
          setData({status: 'empty'});
        }
        if(report.status){
          setStatus(report.status);
        }
      } else{
        setData({status: 'unauthorized'});
      }
    }
    if(userInfo?.id){
      updateReport();
    }
  }, [reportId[0], userInfo?.id]);

  useEffect(() => {
    
    const setupEventSource = () => {
      if(userInfo?.id && authReport && data?.status == 'empty'){
          console.log('Setting up EventSource');
          const clientId = userInfo?.id;
          const eventSource = new EventSource(`/api/report/event?clientId=${clientId}`);

          eventSource.onmessage = async (event) => {
            console.log('Received event:', event);
            const message = JSON.parse(event.data);
            console.log('Parsed message:', message);
            setStatus(message.message);
            if (message.message === 'complete') {
                console.log('Lambda finished message received');
                const report = await fetchReport(reportId[0] as string);
                if (report){
                  console.log('Report fetched successfully:', report);
                  setData({...report, status: 'populated'});
                } else {
                  console.log('No report found, setting status to empty');
                  setData({status: 'empty'});
                }
                eventSource.close();
                window.location.reload()
            }
          };

          eventSource.onerror = () => {
            console.log('EventSource error, closing connection');
            eventSource.close();
            if (status !== 'complete') {
              console.log('Reopening EventSource as status is not complete');
              setupEventSource();
            }
          };

          return () => {
            console.log('Closing EventSource');
            eventSource.close();
            window.location.reload()
          };
      }
    };

    setupEventSource();

  }, [userInfo, authReport, data]);

  // Fetch user information from DB
  useEffect(() => {

    const fetchUser = async (email: string) =>{
      const data = await fetchUserInfo(email);
      setUserInfo(data)
    }

    if (user?.email) {
      fetchUser(user.email)
    }


  }, [user?.email])

  const [open, setOpen] = useState<boolean>(false)

  return (
    userInfo && data.status == 'complete' && listing ? 
    <Box className="flex w-[100vw] h-[100vh] overflow-hidden flex-row bg-black relative">
      <Box className="flex flex-col w-full h-[100vh] gap-2 flex-grow">
      <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <PricingPaymentComponent userId={userInfo?.id as string} />
        </Modal>

        {/* Header */}
        <Box className="flex w-full h-[45px] items-center justify-between" sx={{backgroundColor: theme.palette.background.paper}}>
          <Box className="w-[305px]"></Box>
          <Typography fontSize={16} className='text-[#c1c1c1]' >HouseSnap<span className="bg-gradient-to-r from-purple-400 via-pink-500 fade-in-on-scroll to-red-500 text-transparent bg-clip-text">AI</span></Typography>
          <Box className="flex gap-2">
            <Tooltip title="Back to Explore">
                <IconButton onClick={() =>{window.location.href = '/chat'}}>
                    <IconMap className='text-[#c1c1c1]' />
                </IconButton>
            </Tooltip>
            <Box className="mt-[3px] flex justify-center items-center gap-[5px] bg-[#383838] py-[4px] px-3 rounded-sm shadow-lg">
              <Typography fontSize={14} className='text-[#c1c1c1]' >Reports Remaining:</Typography>
              <Typography fontSize={14} className='text-[#c1c1c1]' >{userInfo?.reports_remaining}</Typography>
              <IconGraph className='text-[#c1c1c1] w-[19px]' />
            </Box>        
            <Box onClick={() => setOpen(true)} className="mt-[3px] flex justify-center items-center gap-[5px] mr-[30px] py-[4px] px-3 rounded-sm shadow-lg cursor-pointer bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:scale-[1.05] hover:shadow-xl transition-all ease-in-out duration-500">
              <Typography fontSize={14} className='text-white' >Buy More</Typography>
              <IconPaywall className='text-white w-[19px]' />
            </Box>
          </Box>
        </Box>
        
        {/* Tabs */}
        <Tabs TabIndicatorProps={{
                    sx: {
                      bgcolor: "#c243d8",
                    }
                  }}  value={selectedTab} color="secondary" onChange={handleTabChange} sx={{ backgroundColor: theme.palette.background.paper, textTransform: 'none'  }}>
          <Tab label="Overview" color='secondary' sx={{ textTransform: 'none' }} />
          <Tab label="Cash Flow" sx={{ textTransform: 'none' }} />
        </Tabs>

        {/* Main Body */}
        <Box className="flex w-full h-[calc(100vh-60px)] flex-grow">
          {renderTabContent()}
        </Box>
      </Box>
      

      
    </Box> : 
    <Box className="flex w-[100vw] h-[100vh] overflow-hidden flex-row bg-black relative">
      <Typography color="white">Data: {JSON.stringify(data)} status: {status} authReport: {authReport.toString()}</Typography>
    </Box>
  )
}

export default ChatPage;