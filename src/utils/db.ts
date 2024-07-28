import {ChatHistoryType } from "./types";
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
    if (cachedUserInfo) {
        setUserInfo(JSON.parse(cachedUserInfo));
        return;
    }

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


export const updateEngagements = async (listings_detail_label:string, zipcode:string, viewed:boolean, clicked:boolean, email:string) => {
  const response = await fetch('/api/listings/update', {
    method: 'POST',
    body: JSON.stringify({ listings_detail_label: listings_detail_label, zipcode: zipcode, viewed: viewed, clicked: clicked, email: email }),
  });

  if (response.status === 200) {
    console.log('Engagements updated successfully');
  } else {
    const data = await response.json();
    console.error('Error updating engagements:', data);
  }
}