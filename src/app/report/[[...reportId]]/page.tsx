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

// ** Type Imports
import { User } from '@/utils/types';

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

const ChatPage = () => {

  // ** User States
  const {user} = useUser();
  const [userInfo, setUserInfo] = useState<User | null>(null)
 
  // ** Report States
  const [data, setData] = useState({status: 'empty'});
  const [status, setStatus] = useState('empty');
  const [authReport, setAuthReport] = useState(false);

  const { reportId } = useParams();

  const theme = useTheme();

 

  useEffect(() => {
    const createEventSource = async () => {
      console.log('Checking report validity for reportId:', reportId[0], 'and userId:', userInfo?.id);
      const valid = await checkReport(reportId[0] as string, userInfo?.id as string);
      console.log('Report validity:', valid);
      setAuthReport(valid);
      if(valid){
        console.log('Fetching report for reportId:', reportId[0]);
        const report = await fetchReport(reportId[0] as string);
        if (report){
          console.log('Report fetched successfully:', report);
          setData({...report, status: 'populated'});
        } else {
          console.log('No report found, setting status to empty');
          setData({status: 'empty'});
        }
      }
    }
    if(userInfo?.id){
      createEventSource();
    }
  }, [reportId[0], userInfo?.id]);

  useEffect(() => {
    
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
        }
        };

        return () => {
        console.log('Closing EventSource');
        eventSource.close();
        };
    }

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
    userInfo ? 
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
        <Box className="flex w-full h-[45px] items-center justify-between" sx={{backgroundColor: theme.palette.background.paper}}>
          <Box className="w-[105px]"></Box>
          <Typography fontSize={16} className='text-[#c1c1c1]' >HouseSnap<span className="bg-gradient-to-r from-purple-400 via-pink-500 fade-in-on-scroll to-red-500 text-transparent bg-clip-text">AI</span></Typography>
          <Box className="flex gap-2 items-center">
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
              <Typography fontSize={14} className='text-[#c1c1c1]' >Buy More</Typography>
              <IconPaywall className='text-[#c1c1c1] w-[19px]' />
            </Box>
          </Box>
        </Box>
        
        <Box className="flex w-full h-[calc(100vh-60px)] flex-grow">
            <Typography color="text.secondary">Report Goes Here {reportId} Data: {JSON.stringify(data)} Lambda Finished: {status} </Typography>
        </Box>
      </Box>
      

      
    </Box> : 
    <Box className="flex w-[100vw] h-[100vh] overflow-hidden flex-row bg-black relative">
      <Box className="w-[67px] h-[100vh] bg-[#111111] border-[#3a3939]"></Box>
      <Box className="flex-1 items-center justify-center p-4 w-[64%]">
        <Skeleton variant="rectangular" height={60} />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="rectangular" height={400} />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </Box>
    </Box>
  )
}

export default ChatPage;