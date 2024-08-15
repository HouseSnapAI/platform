import { Message } from "./types"

export const chatStarter = {
    role: {S: "system"}, 
    content:  {S: "You are an ai real estate agent who is helping users find the perfect home. You are also a helpful assistant that can help users with their questions. Answer professionally and in 1-2 sentences. Additionally use any and all of the data about the user provided to you to help make ur descision"}
  }

export const initChat: Message = {
  role: "system",
  content: "You are an ai real estate agent who is helping users find the perfect home. You are also a helpful assistant that can help users with their questions. Answer professionally and in 1-2 sentences. Additionally use any and all of the data about the user provided to you to help make ur descision",
}

export const examplePromptsOne = [
    "Cheap homes in Folsom",
    "4-bed in Sacramento",
    "Newest in Roseville",
    "Pools in El Dorado",
    "3+ baths in Rocklin",
    "Garages in Granite Bay",
  ]

export const examplePromptsTwo = [
    "Davis homes under $500k",
    "Citrus Heights 3-bed",
    "Auburn new listings",
    "Fair Oaks townhouses",
    "Rancho Cordova villas",
    "Placerville cottages"
  ]

export const exampleLiistingIds: string[] = [
  "00015dfb-37a8-48cc-892f-d1681802c98c",
  "0001fb2e-8e89-4b9a-b67d-8addf2cbd6d5",
  "00024ab6-1c58-4e4c-ab59-a84f0ce78eba",
  "0002df75-3fe2-41d9-9a82-a13b37ea42cb"]