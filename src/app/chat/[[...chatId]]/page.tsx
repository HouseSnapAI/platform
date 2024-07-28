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
import { ChatHistoryType, UserType, UserPreferencesType, DrawerContentType } from '@/utils/types';

// ** Auth Imports
import { useUser } from '@auth0/nextjs-auth0/client';
import ChatInterface from '@/components/chat-interface/ChatInterface';
import { chatStarter } from '@/utils/vars';

// ** UUID Imports
import { createChat, fetchChatHistory, fetchUser, updateChatTable } from '@/utils/db';

const ChatPage = () => {

  // ** User States
  const {user, isLoading} = useUser();
  const [userInfo, setUserInfo] = useState<[UserType, UserPreferencesType] | []>([])

  const params = useParams();
  const chatId = (params.chatId || ['newChat']) as string[];
  const query = useSearchParams();

  // ** Drawer States
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState<DrawerContentType>({title: '', component: '', props: {}});

  // Chat Message States
  const [inputValue, setInputValue] = useState<string>(query.get('initialMessage') || '')
  const [chatHistory, setChatHistory] = useState<ChatHistoryType>({
    chatId: {S: chatId[0] as string},
    email: {S: user?.email as string},
    messages: {L: [{M: chatStarter}]}
  })
  const [loading, setLoading] = useState(false);


  // Fetch user information from DB
  useEffect(() => {

    if (user?.email) {
      fetchUser({ email: user?.email, setUserInfo });
    }
  }, [user?.email])

  // Fetch Chat History
  useEffect(() => {
  
    if (chatId[0] !== 'newChat' && user?.email) {
      setLoading(true);
      fetchChatHistory({ chatId: chatId, email: user?.email, setChatHistory });
      setLoading(false);
    }

    // If the query has an initial message, handle the click
    if (query.get('initialMessage') && chatHistory.messages.L.length <= 2 && user?.email) {
      
      handleClick()
      const url = new URL(window.location.href);
      url.search = '';
      window.history.replaceState({}, document.title, url.toString());
    }
  }, [chatId[0], user?.email, query.get('initialMessage')]);

  // Drawer open/close
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  // If enter is clicked
  const handleClick = async () => {
    setLoading(true);
    // If New chat
    if (chatId[0] === "newChat" && user?.email) {
      createChat({ email: user?.email as string, initialMessage: inputValue })
      // Normal handle click
    } else if(user) {
      const userInformation = {
        name: userInfo[0]?.name?.S,
        locations: userInfo[1]?.locations.L.map((l: { S: string }) => l.S),
        budget: [userInfo[1]?.budget.L?.[0].N, userInfo[1]?.budget.L?.[1].N],
        beds: userInfo[1]?.beds_baths.L?.[0].N,
        baths: userInfo[1]?.beds_baths.L?.[1].N,
        size_of_house: [userInfo[1]?.size_of_house.L?.[0].N, userInfo[1]?.size_of_house.L?.[1].N],
        house_descriptions: userInfo[1]?.house_descriptions.S ,
      }

      setInputValue('')
      
      // Update chat history first
      setChatHistory({
          ...chatHistory,
            messages: {L: [...chatHistory.messages.L, 
                { M: {role: {S: "user"}, content: {S: inputValue}}}
        ]}
      });
      // get response
      const response = await fetch(`/api/chat`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
              prompt: inputValue, 
              chatHistory: chatHistory, 
              userInfo: userInformation
          })
      })

      const data = await response.json()


    await updateChatTable({chatHistory: {
      ...chatHistory,
      messages: {L: [...chatHistory.messages.L, 
          { M: {role: {S: "user"}, content: {S: inputValue}}},
          { M: {role: {S: "assistant"}, content: {S: data.content}}}
       ]
    }}, setChatHistory, email: user?.email as string});

    setLoading(false);
  }
}

  return (
    userInfo.length > 0 ? 
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

      {/* CHAT BOX */}
      {chatHistory.messages.L.length === 1 ? 
        <Chatbox 
          drawerOpen={drawerOpen} 
          setInputValue={setInputValue} 
          inputValue={inputValue} 
          handleClick={handleClick}
          email={user?.email}
        />
      : 
        <ChatInterface 
          key={JSON.stringify(chatHistory)}
          drawerOpen={drawerOpen} 
          setInputValue={setInputValue} 
          inputValue={inputValue} 
          chatHistory={chatHistory}
          handleClick={handleClick}
          userInfo={userInfo[0]}
          chatId={chatId[0]}
          loading={loading}
        />
      }

      {/* CHAT INTERFACE */}
      
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