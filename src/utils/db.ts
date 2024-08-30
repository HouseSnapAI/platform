import { report } from "process";
import {ActionAnalyticObject, Chat, ListingType, SectionAnalyticObject, User } from "./types";
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
    return (data.chat.id);
  }

}

export const updateChat = async (chat: Chat) => {

  // console.log(chat)

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
  listing: ListingType;
  viewed: boolean;
  clicked: boolean;
  user: User;
};

export const updateEngagements = async ({
  id,
  listing,
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
      // console.log('User engagements updated successfully');
      const updatedUser = {
        ...user,
        viewed: [...user.viewed || [], { engage_date: new Date().toISOString(), id: id }],
        clicked: [...user.clicked || [], { engage_date: new Date().toISOString(), id: id }]
      };
      localStorage.setItem('userInfo', JSON.stringify(updatedUser));

      if (viewed || clicked) {
      const listingResponse = await fetch('/api/listing/update', {
        method: 'PATCH',
        body: JSON.stringify({ id: listing.id, num_views: listing.num_views + (viewed ? 1 : 0), num_clicks: listing.num_clicks + (clicked ? 1 : 0) }),
      });

      if (listingResponse.status !== 200) {
        console.error('Error updating listing');
      }
    
    }


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

export const saveHouse = async ({id, user, listing}: {id:string, user: User, listing: ListingType}) => {
  try {
    const response = await fetch('/api/auth/user/update', {
      method: 'PATCH',
      body: JSON.stringify({ id: user.id, saved: [...user.saved || [], { engage_date: new Date().toISOString(), id: id }] }),
    });

    if (response.status === 200) {
      // console.log('Saved House added successfully');
      const updatedUser = {
        ...user,
        saved: [...user.saved || [], { engage_date: new Date().toISOString(), id: id }]
      };
      localStorage.setItem('userInfo', JSON.stringify(updatedUser));

      const listingResponse = await fetch('/api/listing/update', {
        method: 'PATCH',
        body: JSON.stringify({ id: listing.id, num_saved: listing.num_saved + 1 }),
      });

      if (listingResponse.status !== 200) {
        console.error('Error updating listing');
      }

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

export const deleteSavedHouse = async ({id, user, listing}: {id:string, user: User, listing: ListingType}) => {
  try {
    const response = await fetch('/api/auth/user/update', {
      method: 'PATCH',
      body: JSON.stringify({ id: user.id, saved: user.saved.filter((house: any) => house.id !== id) }),
    });
  
    if (response.status === 200) {
      // console.log('Saved House deleted successfully');
      const updatedUser = {
        ...user,
        saved: user.saved.filter((house: any) => house.id !== id)
      };
      localStorage.setItem('userInfo', JSON.stringify(updatedUser));

      const listingResponse = await fetch('/api/listing/update', {
        method: 'PATCH',
        body: JSON.stringify({ id: listing.id, num_saved: listing.num_saved - 1 }),
      });

      if (listingResponse.status !== 200) {
        console.error('Error updating listing');
      }

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

// LISTING FUNCTIONS

type FetchListingType = {
  ids: string[];
};

export const fetchListing = async ({ ids }: FetchListingType) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/listing/fetch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids }),
    });

    const data = await response.json();

    if (response.status === 200) {
      return { status: 200, data };
    } else {
      console.error('Error fetching listing');
      console.log(ids)
      return { status: response.status, message: data.message || 'Error fetching listing' };
    }
  } catch (error) {
    console.error('Error fetching listing:', error);
    return { status: 500, message: 'Internal server error' };
  }
};

export const fetchListingByPublicId = async (public_id: string)=>{
  try{
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/listing/fetch/by-public-id`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({public_id})
    })
    const data = await response.json();

    if (response.status === 200) {
      return { status: 200, data };
    } else {
      console.error('Error fetching listing');
      console.log(public_id)
      return { status: response.status, message: data.message || 'Error fetching listing' };
    }
  } catch (error) {
    console.error('Error fetching listing:', error);
    return { status: 500, message: 'Internal server error' };
  }
}

// REPORT FUNCTIONS
export const checkReport = async (listingId: string, userId: string) => {
  const response = await fetch(`/api/report/check`, {
    method: 'POST',
    body: JSON.stringify({ listing_id: listingId, user_id: userId }),
  });

  if (response.status === 200) {
    return true
  } else {
    return false
  }
}

export const checkReportByListing = async (listingId: string, userId: string) => {
  const response = await fetch(`/api/report/check`, {
    method: 'POST',
    body: JSON.stringify({ listing_id: listingId, user_id: userId }),
  });

  if (response.status === 200) {
    const data = await response.json()
    return {valid: true, data: data}
  } else {
    return {valid: false, data:null}
  }
}

export const fetchReport = async (listing_id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  console.log("LISINTGID", listing_id)
  const response = await fetch(`${baseUrl}/api/report/fetch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ listing_id }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch report');
  }

  return response.json();
};

export const fetchReportsByUser = async(user_id: string) => {
  const response = await fetch(`/api/report/fetch/by-user`, {
    method: 'POST',
    body: JSON.stringify({ user_id: user_id }),
  });

  if (response.status === 200) {
    const data = await response.json()
    if (data) {
      // console.log(data)
      return data;
    } else {
      return null;
    }
  } else {
    return null
  }
}


export const fetchCrimeData = async(crime_data_ids: number[]) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/report/crime-data`, {
    method: 'POST',
    body: JSON.stringify({ crime_data_ids: crime_data_ids }),
  });

  if (response.status === 200) {
    const data = await response.json()
    // console.log("DATAINDB", data)
    if (data) {
      // console.log(data)
      return data;
    } else {
      return null;
    }
  } else {
    return null
  }
}

export const fetchEnvData = async(listing_id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/report/environmental-data`, {
    method: 'POST',
    body: JSON.stringify({ listing_id: listing_id }),
  });

  if (response.status === 200) {
    const data = await response.json()
    // console.log("DATAINDB", data)
    if (data) {
      // console.log(data)
      return data;
    } else {
      return null;
    }
  } else {
    return null
  }
}

// PUBLIC ANALYTIC RELATED
export const updateInteraction = async ({public_id, interaction}:{public_id:string, interaction: ActionAnalyticObject | SectionAnalyticObject}) =>{
  // WRITE CODE TO HANDLE BOTH TYPES OF OBJ
  const response = await fetch(`/api/analytics/update`, {
    method: 'POST',
    body: JSON.stringify({public_id, interaction})
  }) 
}