export type SidebarType = {
    icon: React.ReactNode,
    title: string,
    onClick: (e:any) => void
  }

export type ListingType = {
  image: {S: string},
  address: {S: string},
  price: {S: string},
  bedrooms: {S: string},
  bathrooms: {S: string},
  sqft: {S: string}
}

export type MessageType = {M: {
  role: {S: string},
  content: {S: string},
}}

export type ChatHistoryType = {
  chatId: {S: string},
  email: {S:string},
  messages:{L: MessageType[]}
}

export type UserChatType = {
  M: {
    chat_id: {S: string},
    title: {S: string},
    updated: {S: string}
  }
}

export type UserType = {
  user_id: {S: string};
  email: {S: string};
  name?: {S: string};
  profileimgUrl?: {S: string};
  createdAt?: {S: string};
  updatedAt?: {S: string};
  chats?: {L: UserChatType[]};
  [key: string]: any;
};

export type UserPreferencesType = {
  user_id: {S: string};
  email: {S: string};
  budget: {L: {N: number}[]};
  locations: {L: {S: string}[]};
  house_descriptions: {S: string};
  size_of_house: {L: {N: number}[]};
  beds_baths: {L: {N: number}[]};
  property_types: {L: {S: string}[]};
  clicked:{L: {S: string}[]}
  viewed:{L: {S: string}[]}
  saved:{L: {S: string}[]}
};

export type DrawerContentType = {
  title: string,
  component: string,
  props: any
}

// LISTINGTYPE

export type ListingDetailType = {
  listings_detail_label: { S: string }, // Address
  zipcode: { S: string },
  "#_of_fireplaces"?: { N: number },
  "#_of_rooms"?: { N: number },
  "#_of_units"?: { N: number },
  agent_link?: { S: string },
  appliances?: { S: string },
  architectural_style?: { S: string },
  "area/district"?: { S: string },
  association_features?: { S: string },
  bath_features?: { S: string },
  bathrooms?: { N: number },
  bedrooms?: { N: number },
  cooling?: { S: string },
  county?: { S: string },
  dining_room_features?: { S: string },
  elementary_school_district?: { S: string },
  flooring?: { S: string },
  full_bathrooms?: { N: number },
  half_bathrooms?: { N: number },
  heating?: { S: string },
  highlights_text?: { S: string },
  interior_features?: { S: string },
  kitchen_features?: { S: string },
  laundry_features?: { S: string },
  listing_agent_name?: { S: string },
  listing_detail_monthly_cost?: { S: string },
  listing_detail_price?: { N: number },
  listing_office_name?: { S: string },
  listing_url?: { S: string },
  living_room_features?: { S: string },
  lot_features?: { S: string },
  master_bathroom_features?: { S: string },
  master_bedroom_features?: { S: string },
  middle_or_junior_school_district?: { S: string },
  mls_number: { S: string },
  num_clicks: { N: number },
  num_views: { N: number },
  open_parking_spaces?: { N: number },
  parking_features?: { S: string },
  patio_and_porch_features?: { S: string },
  pool?: { S: string },
  property_condition?: { S: string },
  property_description?: { S: string },
  property_images?: { L: { S: string }[] },
  rank?: { N: number },
  "remodeled/updated"?: { S: string },
  roof?: { S: string },
  "school_district_(county)"?: { S: string },
  senior_high_school_district?: { S: string },
  square_footage?: { N: number },
  total_parking_spaces?: { N: number },
  window_features?: { S: string },
  year_built?: { S: string },
  [key: string]: any
}

type SupaBaseListingType = {
  agentName: string,
  agentUrl:string, // bottom of page
  broker: string,
  brokerNumber: string, // bottom of page
  brokerLocation: string, // bottom of page
  dataSource: string, // bottom of page
  datSourceCopyright: string, // bottom of page
  additionalInformation: string // very bottom, footer of page
  imgs: string[],
  status: string, // for sale etc etc 
  price: number,
  monthlyPrice: number,
  beds: number,
  baths: number,
  halfBaths?: number,
  sqft: string,
  acreLot?: string,
  address: string,
  zipcode: string,
  latitude: number,
  longitude: number,
  url: string,
  propertyType: string,
  garage: string,
  yearBuilt: string,
  pricePerSqft: string,
  propertyDetails:string,
  propertyHistory: [{
    date: string,
    event: string,
    price: number,
    pricePerSqft: number,
    source: string
  }],
  propertyTax: [{
    year?: number,
    taxes?: number,
    totalAssesment?: number,
    land?: number, 
    additions?: number
  }]
  // scrape from yelp if needed
  nearby: {
    restaurants: number,
    daycares: number,
    cafes: number,
    nightlife: number,
    groceries: number,
    shopping: number,
    parks: number,
  }
  // scrape from FBI? https://github.com/OpenDataDE/FBI-Unified-Crime-Data-Scraper
  lifeStyle: {
    quiet: number,
    vibrant: number,
  }
// scrape from somewhere
  transportation:{
    driving: number,
    cycling: number,
    walking: number,
    transit: number
  }

  // potentially scrape from different source, or greatschools/gmaps
  nearbySchools:SchoolType[]

  elementary: SchoolType[]
  middle: SchoolType[]
  high: SchoolType[]
  private: SchoolType[]

  // scrape from first street foundation
  flood:{
    [key:string]:number
  }
  fire:{
    [key:string]:number
  }
  heat:{
    [key:string]:number
  }
  wind:{
    [key:string]:number
  }
  air:{
    [key:string]:number
  }
  homeValue?:{
    [key:string]:number
  }
  marketTrends:{
    listingMedianPrice: number,
    listingPricePerSqft: number,
    soldPriceMedian: number,
    daysOnMarket: number
  }

  nearbyHomeValues:[{
    address: string,
    priceEstimate: number,
    sqft: number,
    beds: number,
    baths: number,
    lotSqft: number,
  }]

}

type SchoolType = {
  schoolName: string,
  schoolDistrict?:string,
  grades: string,
  stars: number,
  url: string
}