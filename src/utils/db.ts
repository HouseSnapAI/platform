import {Chat, ChatHistoryType, User, UserType } from "./types";
import { v4 as uuidv4 } from 'uuid';
import { HumanMessage } from '@langchain/core/messages';

export const fetchUserInfo = async (email: string) => {
  const cachedUserInfo = localStorage.getItem('userInfo');
  if (cachedUserInfo) {
    return JSON.parse(cachedUserInfo);
  }
  const encodedEmail = encodeURIComponent(email);
  const response = await fetch(`/api/auth/user/${encodedEmail}`, {
    method: 'GET',
  });
  const data = await response.json();
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
}

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

type createNewChatType = {
  user: User,
  initialMessage: string
}

export const createNewChat = async ({ user, initialMessage }: createNewChatType) => {
  const response = await fetch('/api/chat/create', {
    method: 'POST',
    body: JSON.stringify({ id: user.id, initialMessage: initialMessage }),
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
    
    localStorage.setItem('userInfo', JSON.stringify({...user, chats: [...user.chats||[], { updated_at: new Date().toISOString(), id: data.chat.id }]}));
    window.location.href = `/chat/${data.chat.id}?initialMessage=${initialMessage}`;
  }

}

type DeleteUserChatType ={
  id: string,
  user: User
}

export const deleteUserChat = async ({ id, user }: DeleteUserChatType) => {
  const response = await fetch('/api/auth/user/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: user.id, chats: user.chats.filter((chat: any) => chat.id !== id) }),
  });

  if (response.status === 200) {
    console.log('Chat deleted successfully')
    localStorage.setItem('userInfo', JSON.stringify({...user, chats: user.chats.filter((chat: any) => chat.id !== id) }));
  } else {
    console.error('Error deleting chat')
  }
}

export const updateChat = async (chat: Chat) => {

  const response = await fetch('/api/chat/update', {
    method: 'POST',
    body: JSON.stringify({ chat: chat }),
  });

  if (response.status !== 200) {
    console.error('Error updating chat');
  }
  return chat
}

export async function generateChatTitle(initialMessage: string, model:any): Promise<string> {

const prompt = `
    Given the following initial inquiry to a chat realestate ai, generate a concise and descriptive title for the chat in under 7 tokens:
    Initial Inquiry: ${initialMessage}
    Title: `;

const response = await model.invoke([new HumanMessage(prompt)]);
return response.trim();
}

type UpdateEngagementsParams = {
  id: string;
  zipcode: string;
  viewed: boolean;
  clicked: boolean;
  user: User;
};

export const updateEngagements = async ({
  id,
  zipcode,
  viewed,
  clicked,
  user
}: UpdateEngagementsParams) => {
  try {

    const userUpdateResponse = await fetch('/api/auth/user/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user.id,
        viewed: [...user.viewed || [], { engage_date: new Date().toISOString(), id: id }],
        clicked: [...user.clicked || [], { engage_date: new Date().toISOString(), id: id }],
      }),
    });

    if (userUpdateResponse.status === 200) {
      console.log('User engagements updated successfully');
      const updatedUser = {
        ...user,
        viewed: [...user.viewed || [], { engage_date: new Date().toISOString(), id: id }],
        clicked: [...user.clicked || [], { engage_date: new Date().toISOString(), id: id }]
      };
      localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      return updatedUser;
    } else {
      const data = await userUpdateResponse.json();
      console.error('Error updating user engagements:', data);
      return user;
    }
  } catch (error) {
    console.error('Error updating user engagements:', error);
    return user;
  }
};

export const saveHouse = async ({id, user}: {id:string, user: User}) => {
  try {
    const response = await fetch('/api/auth/user/update', {
      method: 'PATCH',
      body: JSON.stringify({ id: user.id, saved: [...user.saved || [], { engage_date: new Date().toISOString(), id: id }] }),
    });

    if (response.status === 200) {
      console.log('Saved House added successfully');
      const updatedUser = {
        ...user,
        saved: [...user.saved || [], { engage_date: new Date().toISOString(), id: id }]
      };
      localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      return updatedUser;
    } else {
      const data = await response.json();
      console.error('Error adding saved house:', data);
      return user;
    }
  } catch (error) {
    console.error('Error adding saved house:', error);
    return user;
  }
}

export const deleteSavedHouse = async ({id, user}: {id:string, user: User}) => {
  try {
    const response = await fetch('/api/auth/user/update', {
      method: 'PATCH',
      body: JSON.stringify({ id: user.id, saved: user.saved.filter((house: any) => house.id !== id) }),
    });
  
    if (response.status === 200) {
      console.log('Saved House deleted successfully');
      const updatedUser = {
        ...user,
        saved: user.saved.filter((house: any) => house.id !== id)
      };
      localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      return updatedUser;
    } else {
      const data = await response.json();
      console.error('Error deleting saved house:', data);
      return user;
    }
  } catch (error) {
    console.error('Error deleting saved house:', error);
    return user;
  }
}