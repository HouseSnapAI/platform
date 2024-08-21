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
  created_at: string,
  updated_at: string,
  listing_id: string,
  crime_data_ids: number[],
  crime_score: number,
  school_score: number,
  market_trends: string, // JSON string
  census_data: string, // JSON string
  top_schools: {
    high: School[],
    middle: School[],
    elementary: School[]
  },
  rent_cash_flow: string, // JSON string
  status: string,
}

type School = {
  KG?: string,
  Zip: string,
  City: string,
  Name: string,
  Type: string,
  Asian: string,
  Black: string,
  Phone: string,
  Score: number,
  Total: string,
  White: string,
  County: string,
  Grades: string,
  Address: string,
  Distance: string,
  District: string,
}

export type MarketTrends = {
  average_year_built: number,
  median_year_built: number,
  range_year_built: number,
  average_lot_size: number,
  median_lot_size: number,
  range_lot_size: number,
  average_price_per_sqft: number,
  median_price_per_sqft: number,
  range_price_per_sqft: number,
  average_estimated_price: number,
  median_estimated_price: number,
  range_estimated_price: number,
  average_house_size: number,
  median_house_size: number,
  range_house_size: number,
  average_days_on_market: number,
  median_days_on_market: number,
  range_days_on_market: number,
  total_properties: number,
  sold_past_5_years: number,
  sold_past_year: number,
  sold_past_month: number,
  average_price_2024: number,
  median_price_2024: number,
  average_price_2023: number,
  median_price_2023: number,
  average_price_2022: number,
  median_price_2022: number,
  average_price_2021: number,
  median_price_2021: number,
  average_price_2020: number,
  median_price_2020: number,
  recent_sold_properties: RecentSoldProperty[]
}

type RecentSoldProperty = {
  property_url: string,
  mls: string,
  mls_id: string,
  status: string,
  text: string,
  style: string,
  full_street_line: string,
  street: string,
  unit: string | null,
  city: string,
  state: string,
  zip_code: string,
  beds: number,
  full_baths: number,
  half_baths: number | null,
  sqft: number,
  year_built: number,
  days_on_mls: number,
  list_price: number,
  list_price_min: number | null,
  list_price_max: number | null,
  list_date: string,
  sold_price: number,
  last_sold_date: string,
  assessed_value: number,
  estimated_value: number,
  lot_sqft: number,
  price_per_sqft: number,
  latitude: number,
  longitude: number,
  neighborhoods: string,
  county: string,
  fips_code: string,
  stories: number,
  hoa_fee: number | null,
  parking_garage: number | null,
  agent: string,
  agent_email: string,
  agent_phones: AgentPhone[],
  broker: string | null,
  broker_phone: string | null,
  broker_website: string | null,
  nearby_schools: string,
  primary_photo: string,
  alt_photos: string
}

type AgentPhone = {
  number: string,
  type: string,
  ext: string,
  primary: boolean
}

export type CensusData = {
  B01001: {
    TableTitle: string,
    TableDescription: string,
    Columns: CensusColumn[]
  },
  B02001: {
    TableTitle: string,
    TableDescription: string,
    Columns: CensusColumn[]
  },
  B03002: {
    TableTitle: string,
    TableDescription: string,
    Columns: CensusColumn[]
  },
  B19001: {
    TableTitle: string,
    TableDescription: string,
    Columns: CensusColumn[]
  },
  B19013: {
    TableTitle: string,
    TableDescription: string,
    Columns: CensusColumn[]
  },
  B23025: {
    TableTitle: string,
    TableDescription: string,
    Columns: CensusColumn[]
  },
  B25001: {
    TableTitle: string,
    TableDescription: string,
    Columns: CensusColumn[]
  },
  B25002: {
    TableTitle: string,
    TableDescription: string,
    Columns: CensusColumn[]
  },
  B25003: {
    TableTitle: string,
    TableDescription: string,
    Columns: CensusColumn[]
  }
}

type CensusColumn = {
  ColumnID: string,
  Description: string,
  Estimate: number,
  Error: number,
  Geoid: string,
  Name: string
}

export type RentCashFlow = {
  estimated_rent: number,
  fifty_pct_rule: number,
  rent_per_sqft: number,
  rent_per_lot_sqft: number,
  basis_number: number
}