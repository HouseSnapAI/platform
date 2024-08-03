"use client"

// ** Next Imports
import {useState, useEffect} from 'react'
import { useParams, useSearchParams } from 'next/navigation';

// ** MUI Imports
import  Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

// ** Custom Imports
import SideBar from '@/components/sidebar/Sidebar';
import PersistentDrawer from '@/components/sidebar/PersistentDrawer';
import Chatbox from '@/components/chatbox/Chatbox';

// ** Type Imports
import { ChatHistoryType, UserType, UserPreferencesType, DrawerContentType, User, Chat } from '@/utils/types';

// ** Style Imports
import { useTheme } from '@mui/material/styles';

// ** Auth Imports
import { useUser } from '@auth0/nextjs-auth0/client';
import ChatInterface from '@/components/chat-interface/ChatInterface';
import { chatStarter, initChat } from '@/utils/vars';

// ** UUID Imports
import { createNewChat, fetchChat, fetchUserInfo, updateChat } from '@/utils/db';
import ListingPage from '@/components/listing/ListingPage';
import MapPage from '@/components/map/MapPage';

const ChatPage = () => {

  // ** User States
  const {user, isLoading} = useUser();
  const [userInfo, setUserInfo] = useState<User | null>(null)

  const params = useParams();
  const chatId = (params.chatId || ['newChat']) as string[];
  const query = useSearchParams();

  // ** Drawer States
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState<DrawerContentType>({title: '', component: '', props: {}});

  // Chat Message States
  const [inputValue, setInputValue] = useState<string>(query.get('initialMessage') || '')
  const [chatHistory, setChatHistory] = useState<Chat>({
    id: chatId[0] as string,
    user_id: userInfo?.id as string,
    chat_history: [initChat],
    title: "New Chat",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  // Fetch user information from DB
  useEffect(() => {

    const fetchUser = async (email: string) =>{
      const data = await fetchUserInfo(email);
      console.log("USER DATA SUPA", data)
      setUserInfo(data)
    }

    if (user?.email) {
      fetchUser(user.email)
    }
  }, [user?.email])

  // Fetch Chat History
  useEffect(() => {
    const fetchChatData = async () => {
      if (chatId[0] !== 'newChat' && userInfo?.id) {
        setLoading(true);
        const chatData = await fetchChat({chat_id: chatId[0], user_id: userInfo?.id});
        if (chatData) {
          setChatHistory(chatData);
        }
        setLoading(false);
      }
    };

    if (userInfo?.id) {
      fetchChatData();
    }

    // If the query has an initial message, handle the click
    if (query.get('initialMessage') && chatHistory.chat_history.length <= 2 && userInfo?.email) {
      handleClick();
      const url = new URL(window.location.href);
      url.search = '';
      window.history.replaceState({}, document.title, url.toString());
    }
  }, [chatId[0], userInfo?.id, query.get('initialMessage')]);

  // Drawer open/close
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  // If enter is clicked
  const handleClick = async () => {
    console.log("IN")
    setLoading(true);
    // If New chat
    if (chatId[0] === "newChat" && userInfo) {
      console.log("new chat ", userInfo, inputValue)
      createNewChat({ user: userInfo, initialMessage: inputValue })
      // Normal handle click
    } else if(user) {
      console.log("responding")

      setInputValue('')
      
      // Update chat history first
      setChatHistory({
          ...chatHistory,
            chat_history: [...chatHistory.chat_history, 
                { role: "user", content: inputValue, listings: []}
            ]
        }
      );

      // get response
      const response = await fetch(`/api/chat/response`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
              prompt: inputValue, 
              chat: chatHistory, 
              user: userInfo
          })
      })

      const data = await response.json()
      console.log("GOT DATA", data)


    const updatedChat = await updateChat({
      ...chatHistory,
        chat_history: [...chatHistory.chat_history, 
            { role: "user", content: inputValue, listings: []},
            data
        ]
    });

    setChatHistory(updatedChat) // Double check if chat isnt updated properly

    setLoading(false);
  }
}

  return (
    userInfo ? 
    <Box className="flex w-[100vw] h-[100vh] overflow-hidden flex-row bg-black relative">
      <SideBar 
        setDrawerContent={setDrawerContent} 
        setDrawerOpen={setDrawerOpen} 
        userInfo={userInfo}
      />

      <PersistentDrawer 
        open={drawerOpen} 
        handleDrawerClose={handleDrawerClose} 
        content={drawerContent} 
      /> 

      <Box className="flex flex-col w-full h-[100vh]  gap-4 flex-grow">
        <Box className="flex w-full h-[50px]" sx={{borderBottom: `1px solid ${theme.palette.divider}`, backgroundColor: theme.palette.background.paper}}>
        </Box>
        <Box className="flex w-full h-full flex-grow">
        {/* Listings + Filter */}
        <Box className="flex flex-grow pb-2 pl-2">
          <ListingPage />
        </Box>

        {/* MAP & CHAT BOX */} 
        <Box className="flex flex-col gap-2 w-[50%] h-full pb-2 px-2">
          <MapPage />
          
          <ChatInterface 
            key={JSON.stringify(chatHistory)}
            setInputValue={setInputValue} 
            inputValue={inputValue} 
            chatHistory={chatHistory}
            handleClick={handleClick}
            userInfo={userInfo}
            chatId={chatId[0]}
            loading={loading}
            />
          
        </Box>
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