"use client"

// ** Next Imports
import {useState, useEffect, SetStateAction} from 'react'
import { useParams, useSearchParams } from 'next/navigation';

// ** MUI Imports
import  Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

// ** Custom Imports
import SideBar from '@/components/sidebar/Sidebar';
import PersistentDrawer from '@/components/sidebar/PersistentDrawer';

// ** Type Imports
import { DrawerContentType, User, Chat, ListingType, Message } from '@/utils/types';

// ** Style Imports
import { useTheme } from '@mui/material/styles';

// ** Auth Imports
import { useUser } from '@auth0/nextjs-auth0/client';
import ChatInterface from '@/components/chat-interface/ChatInterface';
import { chatStarter, initChat } from '@/utils/vars';

// ** UUID Imports
import { createNewChat, fetchChat, fetchListing, fetchUserInfo, updateChat } from '@/utils/db';
import ListingPage from '@/components/listing/ListingPage';
import MapPage from '@/components/map/MapPage';
import { Typography } from '@mui/material';
import React from 'react';

const ChatPage = () => {

  // ** User States
  const {user, isLoading} = useUser();
  const [userInfo, setUserInfo] = useState<User | null>(null)

  const params = useParams();
  const query = useSearchParams();
  
  // ** Drawer States
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState<DrawerContentType>({title: '', component: '', props: {}});
  
  // Chat Message States
  const [inputValue, setInputValue] = useState<string>(query.get('initialMessage') || '')
  const [chatHistory, setChatHistory] = useState<Chat>({
    id: "new chat",
    user_id: userInfo?.id as string,
    chat_history: [initChat],
    title: "New Chat",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })
  const [loading, setLoading] = useState(false);

  // Listing States
  const [listings, setListings] = useState<Partial<ListingType>[]>([])
  const [ids, setIds] = useState<string[]>([])
  const [hoveredListing, setHoveredListing] = useState<Partial<ListingType> | null>(null);
  const [selectedListing, setSelectedListing] = useState<ListingType | 'loading' | null>(null); // New state
  const [callFunction, setCallFunction] = useState(false);

  const theme = useTheme();

  // Fetch user information from DB
  useEffect(() => {

    const fetchUser = async (email: string) =>{
      const data = await fetchUserInfo(email);
      setUserInfo(data)


      const idData = await fetch('/api/listing/search-engine/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: data}),
    });

    
    if (idData.status !== 200) {
        setIds([])
    } else {
        const responseData = await idData.json()
        setIds(responseData.listings.map((listing: {listing_id: string, match_score: number}) => listing.listing_id))
      }
    }

    if (user?.email) {
      fetchUser(user.email)
    }


  }, [user?.email])

  const fetchChatHistory = () => {
      let currentListing = sessionStorage.getItem('listing');
      console.log(currentListing)
      if(currentListing == null || currentListing == "undefined") {
        currentListing = "HomePage"
      }

      let obj = JSON.parse(sessionStorage.getItem(currentListing)!!);

      

      if(!obj) {
        if(currentListing != "HomePage") {

          let listObj = JSON.parse(sessionStorage.getItem('listingObj')!!);
          console.log(listObj)
          
          const init: Message = {
            role: listObj.full_street_line,
            content: "You are an ai real estate agent who is helping users find the perfect home. You are also a helpful assistant that can help users with their questions. Answer professionally and in 1-2 sentences. Additionally use any and all of the data about the user provided to you to help make ur descision",
          }
  
          setChatHistory({
            id: "new chat",
            user_id: userInfo?.id as string,
            chat_history: [init],
            title: "New Chat",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
          
          return;
        }
        setChatHistory({
          id: "new chat",
          user_id: userInfo?.id as string,
          chat_history: [initChat],
          title: "New Chat",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      } else {
        const chat = obj.chat;
        if (chat) {
          setChatHistory(chat);
        }
      }
  }

  const resetChat = () => {
    
    let currentListing = sessionStorage.getItem('listing');
    if(currentListing == null || currentListing == "undefined") {
      currentListing = "HomePage"
    }
    sessionStorage.removeItem(currentListing);
    fetchChatHistory();
    setInputValue('');
    setLoading(false);
  }

  // Fetch Chat History
  useEffect(() => {
    fetchChatHistory();
  }, [])

  // Drawer open/close
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  // If enter is clicked
  const handleClick = async (newChat: boolean) => {
    setLoading(true);
    let chatId: string | null = null;
    let currentListing = sessionStorage.getItem('listing');

    if(currentListing == null || currentListing == "undefined") {
      currentListing = "HomePage"
    }

    console.log("CURRENT LISTING ", currentListing)

    // If New chat
    if (newChat && userInfo) {
      chatId = await createNewChat({ user: userInfo, initialMessage: inputValue })
      sessionStorage.setItem(currentListing, JSON.stringify({chatId: chatId!!, chat: ""}));

      // Normal handle click
    } else if (userInfo) {
      chatId = JSON.parse(sessionStorage.getItem(currentListing)!!).chatId;
      console.log(chatId)
    }
    if(user && chatId) {
      const storedChatObj = JSON.parse(sessionStorage.getItem(currentListing)!!)

      setInputValue('')

      // Update chat history first
      let temp = {
        created_at: chatHistory.created_at,
        title: chatHistory.title,
        updated_at: chatHistory.updated_at,
        user_id: chatHistory.user_id,
        chat_history: [...chatHistory.chat_history, 
            { role: "user", content: inputValue, listings: []}
        ],
        id: chatId,
    }
      setChatHistory(temp);

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

      const chatObj = {
        ...temp,
        chat_history: [...chatHistory.chat_history,
            { role: "user", content: inputValue, listings: []},
            data
        ],
        user_id: userInfo!!.id
      };

      console.log(chatObj)
      console.log(userInfo!!.id)

      let updatedChat = chatObj;
      if (!newChat) {
        updatedChat = await updateChat(chatObj);
      } 

      setChatHistory(updatedChat) // Double check if chat isnt updated properly
      storedChatObj.chat = updatedChat;

      setLoading(false);

      if (currentListing == "HomePage") {
        const userF = sessionStorage.getItem('userFilters');

        let userFilters = null;
        if(userF) { userFilters = JSON.parse(userF); }
        console.log(userFilters);

        // call filters API
        // Call on updateFilters from listing page function
        const updateFilters = await fetch(`/api/chat/filter`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              prompt: inputValue, 
              userFilters: userFilters,
          })
        })

        sessionStorage.setItem('userFilters', JSON.stringify(await updateFilters.json()));
        
        //console.log(await updateFilters.json());
        setCallFunction(!callFunction);
      }



      sessionStorage.setItem(currentListing, JSON.stringify(storedChatObj));
    }
    
}
// Fetch Listings
  
    
useEffect(() => {
  const fetchListingData = async (ids: string[]) => {
    const fetchedListings = await fetchListing({ ids });

    if (fetchedListings.status === 200) {
      setListings(fetchedListings.data || []);
    } else {
      console.error('Error fetching listings:', fetchedListings.message);
      setListings([]);
    }
  };

  if (ids.length > 0) {
    fetchListingData(ids);
  } else{
    setListings([])
  }
}, [ids])

  useEffect(() => {
    const listingId = sessionStorage.getItem('listing');
    const listingObj = JSON.parse(sessionStorage.getItem('listingObj')!!);
    if(listingId == null || listingId == "undefined" || listingObj == null || listingObj == "undefined") {
      sessionStorage.removeItem('listing');
      sessionStorage.removeItem('listingObj');
    } else {
      setSelectedListing(listingObj);
    }
  }, [])

  const setCurrentListing = (listing: ListingType| 'loading' | null) => {
    console.log("RUNNING")
    if (listing && listing !== 'loading') { 
    sessionStorage.setItem('listing', listing?.id as string);
    sessionStorage.setItem('listingObj', JSON.stringify(listing));
  }

  console.log(sessionStorage.getItem('listing'))

    fetchChatHistory();

    setSelectedListing(listing);
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
        setSelectedListing={setCurrentListing}
      /> 

      <Box className="flex flex-col w-full h-[100vh] gap-2 flex-grow">
        <Box className="flex w-full h-[45px] items-center justify-center" sx={{backgroundColor: theme.palette.background.paper}}>
          <Typography fontSize={16} className='text-[#c1c1c1]' >HouseSnap<span className="bg-gradient-to-r from-purple-400 via-pink-500 fade-in-on-scroll to-red-500 text-transparent bg-clip-text">AI</span></Typography>
        </Box>
        
        <Box className="flex w-full h-[calc(100vh-60px)] flex-grow">
        {/* Listings + Filter */}
        <Box className="flex flex-grow w-1/2 pb-2 pl-2">
          <ListingPage 
            userInfo={userInfo} 
            setUserInfo={setUserInfo} 
            listings={listings} 
            setIds={setIds} 
            onHover={setHoveredListing} 
            hoveredListing={hoveredListing}
            selectedListing={selectedListing} // Pass selectedListing
            setSelectedListing={setCurrentListing} // Pass setSelectedListing
            callFunction={callFunction}
          />
        </Box>

        {/* MAP & CHAT BOX */} 
        <Box className="flex flex-col gap-2 w-1/2 h-full pb-2 px-2">
          <MapPage 
            listings={listings} 
            hoveredListing={hoveredListing} 
            setSelectedListing={setCurrentListing} 
            selectedListing={selectedListing}
          />
          
          <ChatInterface 
            key={JSON.stringify(chatHistory)}
            setInputValue={setInputValue} 
            inputValue={inputValue} 
            chatHistory={chatHistory}
            handleClick={handleClick}
            userInfo={userInfo}
            loading={loading}
            resetChat={resetChat}
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