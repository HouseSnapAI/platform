export type SidebarType = {
    icon: React.ReactNode,
    title: string,
    onClick: (e:any) => void
  }

export type DrawerContentType = {
  title: string,
  component: string,
  props: any
}

// LISTINGTYPE
export type ListingType = {
  id: string,
  property_url: string,
  mls?: string,
  mls_id?: string,
  status: 'FOR_SALE' | 'PENDING' | 'SOLD' | '',
  text?: string,
  property_type: 'LAND' | 'APARTMENT' | 'MOBILE' | 'OTHER' | 'TOWNHOMES' | 'CONDOS' | 'CONDO_TOWNHOME_ROWHOME_COOP' | 'MULTI_FAMILY' | 'SINGLE_FAMILY' | 'COOP' | 'FARM' | 'DUPLEX_TRIPLEX',
  full_street_line: string,
  street: string,
  city: string,
  state: string,
  unit: string,
  zip_code: string,
  list_price: number,
  beds: number,
  days_on_mls?: number,
  full_baths: number,
  half_baths?: number,
  sqft: number,
  year_built?: number,
  list_date?: string,
  sold_price?: number,
  last_sold_date?: string,
  assessed_value?: number,
  estimated_value?: number,
  lot_sqft?: number,
  price_per_sqft?: number,
  latitude: number,
  longitude: number,
  neighborhoods?: string[],
  county?: string,
  fips_code?: string,
  stories?: string,
  hoa_fee?: number,
  parking_garage?: string,
  agent?: string,
  agent_email?: string,
  agent_phones?: any,
  broker?: string,
  broker_phone?: string,
  broker_website?: string,
  nearby_schools?: string[]
  primary_photo?: string,
  alt_photos?: string[]
  created_at: string,
  updated_at: string,
  num_clicks: number,
  num_views: number,
  num_saved: number,
  // geom: any,
  // embedding: any
}

export type ListingRecordType = {
  engage_date: string,
  id: string,
}

export type User ={
  id: string,
  created_at: string, 
  updated_at: string,
  geoip: any,
  ip: string,
  email: string,
  name: string,
  beds: number | null,
  baths: number | null,
  min_budget: number | null,
  max_budget: number | null,
  house_description: string,
  min_size_of_house: number | null,
  max_size_of_house: number | null,
  location: string[],
  property_types: string[],
  clicked: ListingRecordType[],
  viewed: ListingRecordType[],
  saved: ListingRecordType[],
  reports: string[],
  plan: string,
  reports_remaining: number,
}

export type Message = {
  role: string
  content: string
}

export type Chat = {
  id: string,
  user_id: string,
  created_at: string,
  updated_at: string,
  title: string,
  chat_history: Message[],
}

export type Report = {
  id: string,
  // REST IS TBD >:D
}