// ** Next Imports
import {useState, useEffect} from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Button  from '@mui/material/Button';

// ** Type Imports
import { ListingRecordType, ListingType, User } from '@/utils/types';

// ** Style Imports
import { useTheme } from '@mui/material/styles';

// ** Utils Imports
import { fetchListing, fetchUserInfo, fetchReportsByUser } from '@/utils/db';
import { useUser } from '@auth0/nextjs-auth0/client';
import { getInitials } from '@/utils/utils';

// ** Icon Imports
import { IconAnalyze, IconEdit, IconFile, IconLogout, IconSettings, IconLock } from '@tabler/icons-react';

// ** Component Imports
import SettingsPopup from './profile-components/SettingsPopup';
import SavedHousesPopup from './profile-components/SavedHousesPopup';
import HousesHistoryPopup from './profile-components/HousesHistoryPopup';
import React from 'react';
import ReportsPopup from './profile-components/ReportsPopup';
import { Modal } from '@mui/material';
import PricingPaymentComponent from '@/components/reports/pricing/PricingPageComponent';

interface ProfilePopupProps {
    setSelectedListing: (listing: ListingType | 'loading' | null) => void;
    handleClose: () => void;
  }

const ProfilePopup = ({ setSelectedListing, handleClose }: ProfilePopupProps) => {
    const { user, isLoading } = useUser()
    const [userInfo, setUserInfo] = useState<User | null>(null)

    const theme = useTheme()

    const [savedHouses, setSavedHouses] = useState<ListingRecordType[]>([]);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [savedHousesOpen, setSavedHousesOpen] = useState(false);
    const [housesHistoryOpen, setHousesHistoryOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [reportsOpen, setReportsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [housesHistory, setHousesHistory] = useState<ListingRecordType[]>([]);
    const [reports, setReports] = useState<any[] | null>(null);

    const setSaved = async (data: any) => {
        const temp = data?.saved || [];
        let ids: string[] = [];

        temp.forEach((item: any) => {
            ids.push(item.id)
        })

        await fetchListing({ ids }).then(({ data }) => {
            setSavedHouses(data);
        });
    }

    const setHistory = async (data: any) => {
        if(data?.clicked == null || data?.clicked == undefined) {
            return;
        }
        let ids: string[] = [];

        data.clicked.forEach((element: { id: string; }) => {
            if (!ids.includes(element.id)) {
                ids.push((element.id));
            }
        })

        await fetchListing({ ids }).then(({ data }) => {
            // console.log(data);
            setHousesHistory(data);
        });
    }

    const setReportsHandler = async (data: any) => {
        let user_id: string = data?.id;
        if(user_id == undefined || user_id == null) {
            return;
        }
        
        await fetchReportsByUser(user_id).then((res) => {
            if (res == null && data.reports_remaining > 0) {
                setReports([])
            } else {
                setReports(res);
            }        
        });
    }

    useEffect(() => {
        const fetchUserInfoData = async (email:string)=>{
            await fetchUserInfo(email).then(async (data) => {
                setUserInfo(data);
                await setHistory(data)
                await setSaved(data)
                await setReportsHandler(data);
            });
          };
          
          if (user?.email) {
            fetchUserInfoData(user.email);
          }
    }, [user?.email])

    const hasIncompletePreferences = userInfo && (
        !userInfo.max_budget ||
        !userInfo.min_budget ||
        !userInfo.location ||
        !userInfo.min_size_of_house ||
        !userInfo.max_size_of_house ||
        !userInfo.beds ||
        !userInfo.baths ||
        !userInfo.property_types
      );

    const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget.parentElement); 
        setSettingsOpen(true);
    };

    const handleSettingsClose = () => {
        setSettingsOpen(false);
        setAnchorEl(null);
    };

    const handleSavedHousesClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget.parentElement); 
        setSavedHousesOpen(true);
    };

    const handleSavedHousesClose = () => {
        setSavedHousesOpen(false);
        setAnchorEl(null);
    };

    const handleHousesHistoryClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget.parentElement); 
        setHousesHistoryOpen(true);
    };

    const handleHousesHistoryClose = () => {
        setHousesHistoryOpen(false);
        setAnchorEl(null);
    };

    const handleReportsClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget.parentElement); 
        setReportsOpen(true);
    };

    const handleReportsClose = () => {
        setReportsOpen(false);
        setAnchorEl(null);
    };

    return (
    <>
    <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
        <PricingPaymentComponent userId={userInfo?.id as string} />
    </Modal>
    <Box className=' flex w-full flex-col'>
      {userInfo?.name && userInfo?.email ? (
        <>
            <Box mt={1} pl={1} pr={1} pb={1} className='flex w-full gap-2 items-center justify-evenly' sx={{borderBottom: `1px solid ${theme.palette.divider}`}}>
                <Box 
                    className="min-w-[40px] min-h-[40px] max-h-[40px] max-w-[40px] rounded-full flex items-center justify-center bg-gradient-to-r outline outline-black from-purple-400 via-pink-500 to-red-500 border border-black hover:outline hover:outline-3 hover:outline-white transition-all duration-300 cursor-pointer"
                >   
                    <Tooltip title={userInfo?.name || 'Guest User'} placement="right">            
                        <Typography variant="h6" className="text-white">
                            {getInitials(userInfo?.name || 'Guest User')}
                        </Typography> 
                    </Tooltip>
                </Box>
                <Box className='flex flex-col'>
                    <Typography fontSize={12} color='text.primary'>{userInfo?.name}</Typography>
                    <Typography fontSize={12} color='text.secondary'> {userInfo?.email}</Typography>
                </Box>
            {/* Add more user info as needed */}
            </Box>
            <Box mt={1} pl={1} pr={1} pb={1} className='flex w-full gap-2 items-center justify-evenly' sx={{borderBottom: `1px solid ${theme.palette.divider}`}}> 
                <Button onClick={handleSavedHousesClick} sx={{textTransform: 'none', borderColor: theme.palette.divider }} className='flex flex-col' variant='outlined'>
                    <Typography fontSize={14} color='text.primary' noWrap textAlign={'left'}>{userInfo?.saved?.length||0}</Typography>
                    <Typography fontSize={10} color='text.secondary' noWrap>Saved Houses</Typography>
                </Button>
                <Button onClick={handleHousesHistoryClick} sx={{textTransform: 'none', borderColor: theme.palette.divider }} className='flex flex-col' variant='outlined'>
                    <Typography fontSize={14} color='text.primary' noWrap textAlign={'left'}>{userInfo?.clicked?.length||0}</Typography>
                    <Typography fontSize={10} color='text.secondary' noWrap>Houses History</Typography>
                </Button>
            </Box>
            <Box mt={1} pl={1} pr={1} pb={1} className='flex w-full gap-2 items-center justify-evenly' sx={{borderBottom: `1px solid ${theme.palette.divider}`}}> 
                <Button
                    onClick={() => {
                        sessionStorage.clear();
                        window.location.href = '/api/auth/logout';
                    }}
                    sx={{ 
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                        paddingLeft: 1,
                        paddingTop: 0.5,
                        paddingBottom: 0.5,
                    }}  
                    fullWidth
                    startIcon={
                        <IconButton
                            sx={{ 
                                textTransform: 'none',
                                justifyContent: 'flex-start',
                                padding: 0,
                            }}
                        >
                            <IconLogout 
                                size={20} 
                                className="text-[#6f6f6f] p-0 hover:text-white duration-300 transition-all ease-in-out"/>
                        </IconButton>
                    }
                >
                    <Typography color='text.primary' fontSize={12}>Logout</Typography>
                </Button>
            </Box>
            {/* <Box mt={1} pl={1} pr={1} pb={1} className='flex w-full gap-2 items-center justify-evenly' sx={{borderBottom: `1px solid ${theme.palette.divider}`}}> 
                <Button
                    onClick={handleSettingsClick}
                    sx={{ 
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                        paddingLeft: 1,
                        paddingTop: 0.5,
                        paddingBottom: 0.5,
                    }}  
                    color='primary' 
                    fullWidth
                    startIcon={
                        <IconButton
                            sx={{ 
                                textTransform: 'none',
                                justifyContent: 'flex-start',
                                padding: 0,
                            }}
                        >
                            <IconSettings 
                                size={20} 
                                className="text-[#6f6f6f] p-0 hover:text-white duration-300 transition-all ease-in-out"/>
                        </IconButton>
                    }
                    endIcon={
                        hasIncompletePreferences && (
                            <Box className=" w-2 h-2 bg-purple-500 rounded-full"></Box>
                        )
                    }
                >
                    <Typography fontSize={12}>Settings</Typography>
                </Button>
            </Box> */}
            {/* <Box mt={1} pl={1} pr={1} pb={1} className='flex w-full gap-2 items-center justify-evenly' sx={{borderBottom: `1px solid ${theme.palette.divider}`}}> 
                <Button
                    sx={{ 
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                        paddingLeft: 1,
                        paddingTop: 0.5,
                        paddingBottom: 0.5,
                    }}  
                    color='primary' 
                    fullWidth
                    startIcon={
                        <IconButton
                            sx={{ 
                                textTransform: 'none',
                                justifyContent: 'flex-start',
                                padding: 0,
                            }}
                        >
                            <IconAnalyze 
                                size={20} 
                                className="text-[#6f6f6f] p-0 hover:text-white duration-300 transition-all ease-in-out"/>
                        </IconButton>
                    }
                >
                    <Typography fontSize={12}>Your Plan</Typography>
                </Button>
            </Box> */}
            <Box mt={1} pl={1} pr={1} pb={1} className='flex w-full gap-2 items-center justify-evenly' sx={{borderBottom: `1px solid ${theme.palette.divider}`}}> 
                {
                    reports == null ? 
                        <Button
                        onClick={() => setModalOpen(true)}
                        sx={{ 
                            textTransform: 'none',
                            justifyContent: 'flex-start',
                            paddingLeft: 1,
                            paddingTop: 0.5,
                            paddingBottom: 0.5,
                            color: "#ababab",
                            backgroundColor: "#212121",
                        }}
                        className='flex items-center cursor-default'  
                        fullWidth
                        startIcon={
                                <IconLock 
                                    size={20} 
                                    className="text-[#6f6f6f] p-0"/>
                        }

                    >
                        <Typography color='text.primary' fontSize={12}>Reports</Typography>
                    </Button>
                :
                    <Button
                        onClick={handleReportsClick}
                        sx={{ 
                            textTransform: 'none',
                            justifyContent: 'flex-start',
                            paddingLeft: 1,
                            paddingTop: 0.5,
                            paddingBottom: 0.5,
                        }}  
                        fullWidth
                        startIcon={
                            <IconButton
                                sx={{ 
                                    textTransform: 'none',
                                    justifyContent: 'flex-start',
                                    padding: 0,
                                }}
                            >
                                <IconFile 
                                    size={20} 
                                    className="text-[#6f6f6f] p-0 hover:text-white duration-300 transition-all ease-in-out"/>
                            </IconButton>
                        }
                    >
                        <Typography color='text.primary' fontSize={12}>Reports</Typography>
                    </Button> 
                }
            </Box>

            <SettingsPopup anchorEl={anchorEl} open={settingsOpen} onClose={handleSettingsClose} userInfo={userInfo} setUserInfo={setUserInfo} />
            {savedHousesOpen && <SavedHousesPopup handleClose={handleClose} setSelectedListing={setSelectedListing} userInfo={userInfo} savedHouses={savedHouses} anchorEl={anchorEl} open={savedHousesOpen} onClose={handleSavedHousesClose} />}

            {housesHistoryOpen && <HousesHistoryPopup handleClose={handleClose} setSelectedListing={setSelectedListing} housesHistory={housesHistory} userInfo={userInfo} anchorEl={anchorEl} open={housesHistoryOpen} onClose={handleHousesHistoryClose} />}

            {reportsOpen && <ReportsPopup reports={reports} userInfo={userInfo} anchorEl={anchorEl} open={reportsOpen} onClose={handleReportsClose} />}
        </>
          
      ) : (
        <>
            <Box mt={1} pl={1} pr={1} pb={1} className='flex w-full gap-2 items-center justify-evenly' sx={{borderBottom: `1px solid ${theme.palette.divider}`}}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box className='flex flex-col'>
                    <Skeleton width={100} height={20} />
                    <Skeleton width={150} height={20} />
                </Box>
                <Skeleton variant="rectangular" width={30} height={30} />
            </Box>
            <Box mt={1} pl={1} pr={1} pb={1} className='flex w-full gap-2 items-center justify-evenly' sx={{borderBottom: `1px solid ${theme.palette.divider}`}}> 
               <Skeleton variant="rectangular" width={175} height={40} className='rounded-md' />     
               <Skeleton variant="rectangular" width={175} height={40} className='rounded-md' />     
            </Box>
            <Box mt={1} pl={1} pr={1} pb={1} className='flex w-full gap-2 items-center justify-evenly' sx={{borderBottom: `1px solid ${theme.palette.divider}`}}> 
               <Skeleton variant="rectangular" width={40} height={30} className='rounded-md' />
               <Box className='flex flex-col'>
                    <Skeleton variant="text" width={175} height={15} className='rounded-md' />     
                    <Skeleton variant="text" width={100} height={15} className='rounded-md' />     
               </Box>     
            </Box>
            <Box mt={1} pl={1} pr={1} pb={1} className='flex w-full gap-2 items-center justify-evenly' sx={{borderBottom: `1px solid ${theme.palette.divider}`}}> 
               <Skeleton variant="rectangular" width={40} height={30} className='rounded-md' />
               <Box className='flex flex-col'>
                    <Skeleton variant="text" width={175} height={15} className='rounded-md' />     
                    <Skeleton variant="text" width={100} height={15} className='rounded-md' />     
               </Box>     
            </Box>
            <Box mt={1} pl={1} pr={1} pb={1} className='flex w-full gap-2 items-center justify-evenly' sx={{borderBottom: `1px solid ${theme.palette.divider}`}}> 
               <Skeleton variant="rectangular" width={40} height={30} className='rounded-md' />
               <Box className='flex flex-col'>
                    <Skeleton variant="text" width={175} height={15} className='rounded-md' />     
                    <Skeleton variant="text" width={100} height={15} className='rounded-md' />     
               </Box>     
            </Box>
            <Box mt={1} pl={1} pr={1} pb={1} className='flex w-full gap-2 items-center justify-evenly' sx={{borderBottom: `1px solid ${theme.palette.divider}`}}> 
               <Skeleton variant="rectangular" width={40} height={30} className='rounded-md' />
               <Box className='flex flex-col'>
                    <Skeleton variant="text" width={175} height={15} className='rounded-md' />     
                    <Skeleton variant="text" width={100} height={15} className='rounded-md' />     
               </Box>     
            </Box>
        </>
      )}
    </Box>
    </>
  );
};

export default ProfilePopup;