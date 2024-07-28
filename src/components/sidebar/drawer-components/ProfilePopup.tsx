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
import { UserPreferencesType, UserType } from '@/utils/types';

// ** Style Imports
import { useTheme } from '@mui/material/styles';

// ** Utils Imports
import { fetchUser } from '@/utils/db';
import { useUser } from '@auth0/nextjs-auth0/client';
import { getInitials } from '@/utils/utils';

// ** Icon Imports
import { IconAnalyze, IconEdit, IconFile, IconHistory, IconHome, IconLogout, IconSettings } from '@tabler/icons-react';

// ** Component Imports
import SettingsPopup from './profile-components/SettingsPopup';

const ProfilePopup = () => {
    const { user, isLoading } = useUser()
    const [userInfo, setUserInfo] = useState<[UserType, UserPreferencesType] | []>([])

    const theme = useTheme()

    useEffect(() => {
      if (user?.email) {
        fetchUser({ email: user.email, setUserInfo })
      }
    }, [user?.email])

    const hasIncompletePreferences = userInfo[1] && (
      !userInfo[1].budget?.L.length ||
      !userInfo[1].locations?.L.length ||
      !userInfo[1].size_of_house?.L.length ||
      !userInfo[1].beds_baths?.L.length ||
      !userInfo[1].property_types?.L.length
    );

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget.parentElement); 
        setSettingsOpen(true);
    };

    const handleSettingsClose = () => {
        setSettingsOpen(false);
        setAnchorEl(null);
    };

    return (
    <Box className=' flex w-full flex-col'>
      {userInfo[0]?.name?.S && userInfo[0]?.email?.S ? (
        <>
            <Box mt={1} pl={1} pr={1} pb={1} className='flex w-full gap-2 items-center justify-evenly' sx={{borderBottom: `1px solid ${theme.palette.divider}`}}>
                <Box 
                    className="min-w-[40px] min-h-[40px] max-h-[40px] max-w-[40px] rounded-full flex items-center justify-center bg-gradient-to-r outline outline-black from-purple-400 via-pink-500 to-red-500 border border-black hover:outline hover:outline-3 hover:outline-white transition-all duration-300 cursor-pointer"
                >   
                    <Tooltip title={userInfo[0]?.name?.S || 'Guest User'} placement="right">            
                        <Typography variant="h6" className="text-white">
                            {getInitials(userInfo[0]?.name?.S || 'Guest User')}
                        </Typography> 
                    </Tooltip>
                </Box>
                <Box className='flex flex-col'>
                    <Typography fontSize={12} color='text.secondary'>{userInfo[0]?.name?.S}</Typography>
                    <Typography fontSize={12} color='text.secondary'> {userInfo[0]?.email?.S}</Typography>
                </Box>
                <IconButton href='/api/auth/logout'>
                    <IconEdit className='text-[#6f6f6f] hover:text-white duration-300 transition-all ease-in-out' />
                </IconButton>
            {/* Add more user info as needed */}
            </Box>
            <Box mt={1} pl={1} pr={1} pb={1} className='flex w-full gap-2 items-center justify-evenly' sx={{borderBottom: `1px solid ${theme.palette.divider}`}}> 
                <Button sx={{textTransform: 'none', borderColor: theme.palette.divider }} className='flex flex-col' variant='outlined'>
                    <Typography fontSize={14} noWrap textAlign={'left'}>{userInfo[1]?.viewed?.L?.length}</Typography>
                    <Typography fontSize={10} noWrap className='text-[#6f6f6f]'>Saved Houses</Typography>
                </Button>
                <Button sx={{textTransform: 'none', borderColor: theme.palette.divider }} className='flex flex-col' variant='outlined'>
                    <Typography fontSize={14} noWrap textAlign={'left'}>{userInfo[1]?.clicked?.L?.length}</Typography>
                    <Typography fontSize={10} noWrap className='text-[#6f6f6f]'>Houses History</Typography>
                </Button>
            </Box>
            <Box mt={1} pl={1} pr={1} pb={1} className='flex w-full gap-2 items-center justify-evenly' sx={{borderBottom: `1px solid ${theme.palette.divider}`}}> 
                <Button
                    onClick={() => {
                        window.location.href = '/api/auth/logout';
                    }}
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
                            <IconLogout 
                                size={20} 
                                className="text-[#6f6f6f] p-0 hover:text-white duration-300 transition-all ease-in-out"/>
                        </IconButton>
                    }
                >
                    <Typography fontSize={12}>Logout</Typography>
                </Button>
            </Box>
            <Box mt={1} pl={1} pr={1} pb={1} className='flex w-full gap-2 items-center justify-evenly' sx={{borderBottom: `1px solid ${theme.palette.divider}`}}> 
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
                            <Box className="ml-[134px] w-2 h-2 bg-purple-500 rounded-full"></Box>
                        )
                    }
                >
                    <Typography fontSize={12}>Settings</Typography>
                </Button>
            </Box>
            <Box mt={1} pl={1} pr={1} pb={1} className='flex w-full gap-2 items-center justify-evenly' sx={{borderBottom: `1px solid ${theme.palette.divider}`}}> 
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
            </Box>
            <Box mt={1} pl={1} pr={1} pb={1} className='flex w-full gap-2 items-center justify-evenly' sx={{borderBottom: `1px solid ${theme.palette.divider}`}}> 
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
                            <IconFile 
                                size={20} 
                                className="text-[#6f6f6f] p-0 hover:text-white duration-300 transition-all ease-in-out"/>
                        </IconButton>
                    }
                >
                    <Typography fontSize={12}>Reports</Typography>
                </Button>
            </Box>
            <SettingsPopup anchorEl={anchorEl} open={settingsOpen} onClose={handleSettingsClose} userInfo={userInfo} setUserInfo={setUserInfo} />
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
  );
};

export default ProfilePopup;