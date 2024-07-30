// ** Next Imports
import React, { useEffect, useState } from 'react'
// ** Type Imports 
import { UserType, UserPreferencesType, UserChatType, User } from '@/utils/types'

// ** MUI Imports
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Tabler Icons
import { IconFolderOpen, IconMessageCircle, IconTrash } from '@tabler/icons-react'

// ** Auth Imports
import { useUser } from '@auth0/nextjs-auth0/client'

// ** Utils Imports
import { fetchUser, deleteChat, fetchUserInfo, deleteUserChat } from '@/utils/db'
import SpinnerComponent from '@/components/common/CustomSpinner'

// ** Style Imports
import { useTheme } from '@mui/material/styles'
import { format, isToday, isThisWeek, parseISO } from 'date-fns'
import Skeleton from '@mui/material/Skeleton'

const ChatHistory = () => {
  const theme = useTheme()
  const { user, isLoading } = useUser()
  const [userInfo, setUserInfo] = useState<User | null>(null)
  const [todayChats, setTodayChats] = useState<{id: string, updated_at: string, title: string}[]>([])
  const [lastWeekChats, setLastWeekChats] = useState<{id: string, updated_at: string, title: string}[]>([])
  const [olderChats, setOlderChats] = useState<{id: string, updated_at: string, title: string}[]>([])

  useEffect(() => {
    const fetchUserInfoData = async (email:string)=>{
      const data = await fetchUserInfo(email);
      console.log("DATA", data)
      setUserInfo(data);
    };
    
    if (user?.email) {
      fetchUserInfoData(user.email);
    }
  }, [user?.email])

  const handleDelete = async (chatId:string) => {
    // Implement the delete functionality here
    // TODO: refetch user or update it 
    if(userInfo){
      await deleteUserChat({id:chatId, user:userInfo});
    // Remove the chat from userInfo.chats
    const updatedChats = userInfo.chats.filter(c => c.id !== chatId);
    setUserInfo({...userInfo, chats: updatedChats});
    }
  }

  const sortAndGroupChats = (chats: {id: string, updated_at: string, title: string}[]) => {
    const sortedChats = chats.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    const todayChats = sortedChats.filter(chat => isToday(parseISO(chat.updated_at)))
    const lastWeekChats = sortedChats.filter(chat => isThisWeek(parseISO(chat.updated_at)) && !isToday(parseISO(chat.updated_at)))
    const olderChats = sortedChats.filter(chat => !isThisWeek(parseISO(chat.updated_at)))

    return { todayChats, lastWeekChats, olderChats }
  }

  useEffect(()=>{
    const { todayChats, lastWeekChats, olderChats } = userInfo ? sortAndGroupChats(userInfo?.chats || []) : { todayChats: [], lastWeekChats: [], olderChats: [] }
    setTodayChats(todayChats)
    setLastWeekChats(lastWeekChats)
    setOlderChats(olderChats)
  },[userInfo])

  const renderChats = (chats: {id: string, updated_at: string, title: string}[], label: string) => (
    <Box>
      <Typography pl={1} pt={1} pb={0.5} fontSize={14} className='text-[#6f6f6f]' sx={{borderBottom: `1px solid ${theme.palette.divider}`}}>{label}</Typography>
      {chats.map((chat) => (
        <Box key={chat.id} className='flex flex-row justify-between transition-all cursor-pointer ease-in-out duration-300 p-1' sx={{borderBottom: `1px solid ${theme.palette.divider}`}} onClick={() => {window.location.href = `/chat/${chat.id}`}}>
          <Button
            fullWidth
            endIcon={
              <IconTrash className='text-[#6f6f6f] hover:text-red-500 transition-colors ease-in-out duration-300' size={18} strokeWidth={1.5} onClick={() => handleDelete(chat.id)}/>
            }
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textTransform: 'none' }}
            color={window.location.href.includes(`/chat/${chat.id}`) ? "secondary" : "primary"}
            variant={window.location.href.includes(`/chat/${chat.id}`) ? "contained" : "text"}
          >
            {chat.title.length > 25 ? chat.title.substring(0, 25) + '...' : chat.title}
          </Button>
        </Box>
      ))}
    </Box>
  )

  return (
    <Box className="flex flex-col">
      {userInfo ? (
        <>
          {todayChats.length > 0 && renderChats(todayChats, 'Today')}
          {lastWeekChats.length > 0 && renderChats(lastWeekChats, 'Last Week')}
          {olderChats.length > 0 && renderChats(olderChats, 'Older')}
          {todayChats.length === 0 && lastWeekChats.length === 0 && olderChats.length === 0 && (
            <Box className='flex flex-row h-full mt-2' pl={1}>
              <Typography className='text-left'>No chats available...</Typography>
            </Box>
          )}
        </>
      ) : (
        <Box className='flex flex-col mt-2'>
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
        </Box>
      )}
    </Box>
  )
}

export default ChatHistory