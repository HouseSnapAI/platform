import {Chat, ChatHistoryType, User, UserType } from "./types";
import { v4 as uuidv4 } from 'uuid';
import { HumanMessage } from '@langchain/core/messages';


type FetchUserType = {
    email: string,
    setUserInfo: (data:any)=>void
}

type FetchChatHistoryType = {
    chatId: string[],
    email: string,
    setChatHistory: (data:any)=>void
}

export const fetchUser = async ({ email, setUserInfo }: FetchUserType) => {
    const cachedUserInfo = localStorage.getItem('userInfo');
    // if (cachedUserInfo) {
    //     setUserInfo(JSON.parse(cachedUserInfo));
    //     return;
    // }

    const response = await fetch('/api/auth/user', {
      method: 'POST',
      body: JSON.stringify({ email: email }),

    });
    // If user is not logged in, redirect to login
    if (response.status !== 200) {
      window.location.href = "/api/auth/login"
    }

    const data = await response.json();
    setUserInfo(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
  }

export const fetchUserInfo = async (email: string) => {
  const cachedUserInfo = localStorage.getItem('userInfo');
  // if (cachedUserInfo) {
  //     setUserInfo(JSON.parse(cachedUserInfo));
  //     return;
  // }
  const encodedEmail = encodeURIComponent(email);
  const response = await fetch(`/api/auth/user/${encodedEmail}`, {
    method: 'GET',
  });
  const data = await response.json();
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
}

export const fetchChatHistory = async ({ chatId, email, setChatHistory }: FetchChatHistoryType) => {
    const response = await fetch('/api/chat/fetch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ chat_uuid: chatId[0], email: email })
    });

    if (response.status === 200) {
      const data = await response.json();
      setChatHistory({
        chatId: {S: chatId[0] as string},
        email: {S: email as string},
        messages: {L: data.messages.L}
      });
      console.log("FETCHED CHAT HISTORY")
    } else {
      console.error('Error fetching chat history');
    }
  }; 

type FetchChatType = {
  chat_id: string,
  user_id: string
}

export const fetchChat = async ({ chat_id, user_id }: FetchChatType) => {

  const response = await fetch('/api/chat/fetch', {
    method: 'POST',
    body: JSON.stringify({ chat_id: chat_id, user_id: user_id }),
  });

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    console.error('Error fetching chat');
  }
}

type CreateChatType = {
    email: string,
    initialMessage: string
}
  
export const createChat = async ({ email, initialMessage }: CreateChatType) => {
    const chat_uuid = uuidv4();
    const response = await fetch('/api/chat/create', {
      method: 'POST',
      body: JSON.stringify({ email: email, chat_uuid: chat_uuid, initialMessage: initialMessage }),
    });

    if (response.status !== 200) {
      console.log("Error creating chat")
    } else {
      window.location.href = `/chat/${chat_uuid}?initialMessage=${initialMessage}`;
    }

}

type createNewChatType = {
  user: User,
  initialMessage: string
}

export const createNewChat = async ({ user, initialMessage }: createNewChatType) => {
  const response = await fetch('/api/chat/create/create', {
    method: 'POST',
    body: JSON.stringify({ user: user, initialMessage: initialMessage }),
  });

  if (response.status !== 200) {
    console.log("Error creating chat")
  } else {
    const data = await response.json();
    const userUpdateResponse = await fetch('/api/auth/user/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // change to supabase user
        id: user.id,
        // TODO: change listings_detail_label to listing_id after supabase listings table is updated
        chats: [...user.chats||[], { updated_at: new Date().toISOString(), id: data.chat.id }]
      }),
    });
    if (userUpdateResponse.status !== 200) {
      console.error('Error updating user chats');
    }

    window.location.href = `/chat/${data.chat.id}?initialMessage=${initialMessage}`;
  }

}

type DeleteChatType ={
  id: string,
  user: User
}

export const deleteUserChat = async ({ id, user }: DeleteChatType) => {
  const response = await fetch('/api/auth/user/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: user.id, chats: user.chats.filter((chat: any) => chat.id !== id) }),
  });

  response.status === 200 ? console.log('Chat deleted successfully') : console.error('Error deleting chat');
}

type UpdateChatType = {
    chatHistory: ChatHistoryType,
    setChatHistory: (data:any)=>void,
    email: string
}

export const updateChatTable = async ({ chatHistory, setChatHistory, email }: UpdateChatType) => {
    try {
      const response = await fetch('/api/chat/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatObject: {
            chatId: chatHistory.chatId,
            messages: chatHistory.messages,
          },
          email: email,
        }),
      });

      if (response.status !== 200) {
        console.error('Error updating chat table');
      } else {
        console.log('Chat table updated successfully');

        setChatHistory(chatHistory);
      }
    } catch (error) {
      console.error('Error updating chat table:', error);
    }
};

export const updateChat = async (chat: Chat) => {
  const response = await fetch('/api/chat/update/update', {
    method: 'POST',
    body: JSON.stringify({ chat: chat }),
  });

  if (response.status !== 200) {
    console.error('Error updating chat');
  }
}

export async function generateChatTitle(initialMessage: string, model:any): Promise<string> {

const prompt = `
    Given the following initial inquiry to a chat realestate ai, generate a concise and descriptive title for the chat in under 7 tokens:
    Initial Inquiry: ${initialMessage}
    Title: `;

const response = await model.invoke([new HumanMessage(prompt)]);
return response.trim();
}

export const deleteChat = async (chatId:string, email:string) => {
  const response = await fetch('/api/chat/delete', {
    method: 'POST',
    body: JSON.stringify({ chat_id: chatId, email: email }),
  });

  if (response.status === 200) {
    console.log('Chat deleted successfully');
  } else {
    console.error('Error deleting chat');
  }
}


type UpdateEngagementsParams = {
  listings_detail_label: string;
  zipcode: string;
  viewed: boolean;
  clicked: boolean;
  user: User;
};

export const updateEngagements = async ({
  listings_detail_label,
  zipcode,
  viewed,
  clicked,
  user
}: UpdateEngagementsParams) => {
  const response = await fetch('/api/listings/update', {
    method: 'POST',
    body: JSON.stringify({ listings_detail_label, zipcode, viewed, clicked, email: user.email }),
  });

  if (response.status === 200) {
    console.log('Engagements updated successfully');

    console.log("VIEWED", [...user.viewed||[], { engage_date: new Date().toISOString(), id: listings_detail_label }])
    console.log("CLICKED", [...user.clicked||[], { engage_date: new Date().toISOString(), id: listings_detail_label }])
    // Update user's viewed and clicked arrays
    const userUpdateResponse = await fetch('/api/auth/user/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // change to supabase user
        id: user.id,
        // TODO: change listings_detail_label to listing_id after supabase listings table is updated
        viewed: viewed ? [...user.viewed||[], { engage_date: new Date().toISOString(), id: listings_detail_label }] : user.viewed,
        clicked: clicked ? [...user.clicked||[], { engage_date: new Date().toISOString(), id: listings_detail_label }] : user.clicked,
      }),
    });

    if (userUpdateResponse.status === 200) {
      console.log('User engagements updated successfully');
    } else {
      const data = await userUpdateResponse.json();
      console.error('Error updating user engagements:', data);
    }
  } else {
    const data = await response.json();
    console.error('Error updating engagements:', data);
  }
};

export async function updateUserEngagements(listings_detail_label: string, viewed: boolean, clicked: boolean, email: string) {
  const response = await fetch('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      email, 
      viewed: viewed ? listings_detail_label : null,
      clicked: clicked ? listings_detail_label : null
    }),
  });

  if (response.status === 200) {
    console.log('User engagements updated successfully');
  } else {
    const data = await response.json();
    console.error('Error updating user engagements:', data);
  }
}

export const addSavedHouse = async (address:string, email:string, user_id:string) => {
  const response = await fetch('/api/listings/savedHouses/add', {
    method: 'POST',
    body: JSON.stringify({ user_id: user_id, email: email, address: address }),
  });

  if (response.status === 200) {
    console.log('Saved House added successfully');
  } else {
    const data = await response.json();
    console.error('Error adding saved house:', data);
  }
}

export const saveHouse = async (id:string, user: User) => {
  const response = await fetch('/api/auth/user/update', {
    method: 'PATCH',
    body: JSON.stringify({ id: user.id, saved: [...user.saved||[], { updated_at: new Date().toISOString(), id: id }] }),
  });

  if (response.status === 200) {
    console.log('Saved House added successfully');
  } else {
    const data = await response.json();
    console.error('Error adding saved house:', data);
  }
}

export const deleteSavedHouse = async (address:string, email:string, user_id:string) => {
  const response = await fetch('/api/listings/savedHouses/delete', {
    method: 'POST',
    body: JSON.stringify({ user_id: user_id, email: email, address: address }),
  });

  if (response.status === 200) {
    console.log('Saved House deleted successfully');
  } else {
    const data = await response.json();
    console.error('Error deleting saved house:', data);
  }
}

export const unsaveHouse = async (id:string, user: User) => {
  const response = await fetch('/api/auth/user/update', {
    method: 'PATCH',
    body: JSON.stringify({ id: user.id, saved: user.saved.filter((house: any) => house.id !== id) }),
  });
  
  if (response.status === 200) {
    console.log('Saved House deleted successfully');
  } else {
    const data = await response.json();
    console.error('Error deleting saved house:', data);
  }
}