// USER
// - id : UUID
// - email: string
// - profileimgUrl: string
// - name: string
// - createdAt : Date
// - updatedAt : Date
// - chats : string[]



// User Preferences
// - user_id
// - budget
// - locations
// - windowShopping
// - ideal house descriptions
// - size of house
// - property types

// Listings
// active: boolean
// listingUrl: string


// Relation - Listings leads
// - user_id : string
// - viewed_listing_ids = []
// - duration: number
// - clicked_listing_ids= []

//Chats - DynamoDB
// object_id : string
// message history: {
//   user_id: string
//   role: string
//   message: string
//   createdAt: Date
// }