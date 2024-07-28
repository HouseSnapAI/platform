// ** Next Imports
import React, { useEffect, useState } from 'react'
// ** Type Imports 
import { UserType, UserPreferencesType, UserChatType } from '@/utils/types'

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
import { fetchUser, deleteChat } from '@/utils/db'
import SpinnerComponent from '@/components/common/CustomSpinner'

// ** Style Imports
import { useTheme } from '@mui/material/styles'
import { format, isToday, isThisWeek, parseISO } from 'date-fns'
import Skeleton from '@mui/material/Skeleton'

const ChatHistory = () => {
  const theme = useTheme()
  const { user, isLoading } = useUser()
  const [userInfo, setUserInfo] = useState<[UserType, UserPreferencesType] | []>([])
  const [todayChats, setTodayChats] = useState<UserChatType[]>([])
  const [lastWeekChats, setLastWeekChats] = useState<UserChatType[]>([])
  const [olderChats, setOlderChats] = useState<UserChatType[]>([])

  useEffect(() => {
    if (user?.email) {
      fetchUser({ email: user.email, setUserInfo })
    }
  }, [user?.email])

  const handleDelete = (chatId:string) => {
    // Implement the delete functionality here
    if(user?.email){
      deleteChat(chatId, user?.email)
      fetchUser({ email: user.email, setUserInfo })
    }
  }

  const sortAndGroupChats = (chats: UserChatType[]) => {
    const sortedChats = chats.sort((a, b) => new Date(b.M.updated.S).getTime() - new Date(a.M.updated.S).getTime())
    const todayChats = sortedChats.filter(chat => isToday(parseISO(chat.M.updated.S)))
    const lastWeekChats = sortedChats.filter(chat => isThisWeek(parseISO(chat.M.updated.S)) && !isToday(parseISO(chat.M.updated.S)))
    const olderChats = sortedChats.filter(chat => !isThisWeek(parseISO(chat.M.updated.S)))

    return { todayChats, lastWeekChats, olderChats }
  }

  useEffect(()=>{
    const { todayChats, lastWeekChats, olderChats } = userInfo[0] ? sortAndGroupChats(userInfo[0]?.chats?.L || []) : { todayChats: [], lastWeekChats: [], olderChats: [] }
    setTodayChats(todayChats)
    setLastWeekChats(lastWeekChats)
    setOlderChats(olderChats)
  },[userInfo])

  const renderChats = (chats: UserChatType[], label: string) => (
    <Box>
      <Typography pl={1} pt={1} pb={0.5} fontSize={14} className='text-[#6f6f6f]' sx={{borderBottom: `1px solid ${theme.palette.divider}`}}>{label}</Typography>
      {chats.map((chat) => (
        <Box key={chat.M.chat_id.S} className='flex flex-row justify-between transition-all cursor-pointer ease-in-out duration-300 p-1' sx={{borderBottom: `1px solid ${theme.palette.divider}`}} onClick={() => {window.location.href = `/chat/${chat.M.chat_id.S}`}}>
          <Button fullWidth endIcon={
            <IconTrash className='text-[#6f6f6f] hover:text-red-500 transition-colors ease-in-out duration-300' size={18} strokeWidth={1.5} onClick={() => handleDelete(chat.M.chat_id.S)}/>
          } style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textTransform: 'none' }}>
            {chat.M.title.S.length > 25 ? chat.M.title.S.substring(0, 25) + '...' : chat.M.title.S}
          </Button>
        </Box>
      ))}
    </Box>
  )

  return (
    <Box className="flex flex-col">
      {userInfo[0] ? (
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