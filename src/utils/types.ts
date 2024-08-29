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

export type CrimeDataType = {
  offense_linked_to_another_offense: any[],
  crime_location: any[],
  offender_age: any[],
  offender_ethnicity: any[],
  offender_race: any[],
  offender_sex: any[],
  all_violent_crime_trend: any[],
  type_of_weapon: any[],
  victim_age: any[],
  victim_ethnicity: any[],
  victim_race: any[],
  victim_sex: any[],
  victim_relationship_to_offender: any[],
  agencies: string[],
}

export type EnvDataType = {
  county: string,
  overall_score: any,
  risk_value: any,
  risk_score: any,
  risk_rating: any,
  wind_avalanche_risk_value: any,
  wind_avalanche_risk_score: any,
  wind_avalanche_risk_rate: any,
  flood_coastal_flooding_risk_value: any,
  flood_coastal_flooding_risk_score: any,
  flood_coastal_flooding_risk_rate: any,
  heat_cold_wave_risk_value: any,
  heat_cold_wave_risk_score: any,
  heat_cold_wave_risk_rate: any,
  heat_drought_risk_value: any,
  heat_drought_risk_score: any,
  heat_drought_risk_rate: any,
  land_earthquake_risk_value: any,
  land_earthquake_risk_score: any,
  land_earthquake_risk_rate: any,
  air_hail_risk_value: any,
  air_hail_risk_score: any,
  air_hail_risk_rate: any,
  heat_heat_wave_risk_value: any,
  heat_heat_wave_risk_score: any,
  heat_heat_wave_risk_rate: any,
  wind_hurricane_risk_value: any,
  wind_hurricane_risk_score: any,
  wind_hurricane_risk_rate: any,
  air_istorm_risk_value: any,
  air_istorm_risk_score: any,
  air_istorm_risk_rate: any,
  land_landslide_risk_value: any,
  land_landslide_risk_score: any,
  land_landslide_risk_rate: any,
  land_lightning_risk_value: any,
  land_lightning_risk_score: any,
  land_lightning_risk_rate: any,
  flood_river_flooding_risk_value: any,
  flood_river_flooding_risk_score: any,
  flood_river_flooding_risk_rate: any,
  wind_strong_winds_risk_value: any,
  wind_strong_winds_risk_score: any,
  wind_strong_winds_risk_rate: any,
  wind_trend_risk_value: any,
  wind_trend_risk_score: any,
  wind_trend_risk_rate: any,
  flood_tsunami_risk_value: any,
  flood_tsunami_risk_score: any,
  flood_tsunami_risk_rate: any,
  fire_volcanic_risk_value: any,
  fire_volcanic_risk_score: any,
  fire_volcanic_risk_rate: any,
  fire_wildfire_risk_value: any,
  fire_wildfire_risk_score: any,
  fire_wildfire_risk_rate: any,
  air_winter_weather_risk_value: any,
  air_winter_weather_risk_score: any,
  air_winter_weather_risk_rate: any
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
  created_at: string,
  updated_at: string,
  listing_id: string,
  crime_data_ids: number[],
  crime_score: number,
  school_score: number,
  market_trends: string, // JSON string
  census_data: string, // JSON string
  top_schools: string, // JSON string
  rent_cash_flow: string, // JSON string
  home_details: string, // JSON string
  status: string,
  flags: string[]
}

export type TopSchools = {
  high: School[],
  middle: School[],
  elementary: School[]
}


export type School = {
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
  Enrollment: number;
  "Student/\nTeacher Ratio": number,
  Hispanic: string,
  "3rd\nGrade"?: string,
  "4th\nGrade"?: string,
  "5th\nGrade"?: string,
  "6th\nGrade"?: string,
  "7th\nGrade"?: string,
  "8th\nGrade"?: string,
  "11th\nGrade"?: string,
  "End\nof\nCourse"?: string,
  "Is Magnet"?: string,
  "Is Charter"?: string,
  "Is Title I"?: string,
  "Is Virtual"?: string,
  "American\nIndian"?: string,
  "Pacific\nIslander"?: string,
  "Two or\nMore Races"?: string,
  "Full-time Teachers"?: string,
  "Statewide Rank (2022)"?: string,
  "Statewide Rank (2023)"?: string,
  "State Percentile (2022)"?: string,
  "State Percentile (2023)"?: string,
  "SchoolDigger Rating (2023)"?: string,
  "Average Standard Score (2022)"?: string,
  "Average Standard Score (2023)"?: string,
  "Rank Change from Previous Year"?: string,
  "Free/Discounted\nLunch Recipients"?: string
}

export type MarketTrendsType = {
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
  recent_sold_properties: RecentSoldProperty[],
  comparable_homes: ComparableHome
}

export type ComparableHome = {
  property_url?: string,
  mls?: string,
  mls_id?: string,
  status?: 'FOR_SALE' | 'PENDING' | 'SOLD' | '',
  text?: string,
  style?: 'LAND' | 'APARTMENT' | 'MOBILE' | 'OTHER' | 'TOWNHOMES' | 'CONDOS' | 'CONDO_TOWNHOME_ROWHOME_COOP' | 'MULTI_FAMILY' | 'SINGLE_FAMILY' | 'COOP' | 'FARM' | 'DUPLEX_TRIPLEX',
  full_street_line?: string,
  street?: string,
  city?: string,
  state?: string,
  unit?: string,
  zip_code?: string,
  list_price?: number,
  beds?: number,
  days_on_mls?: number,
  full_baths?: number,
  half_baths?: number,
  sqft?: number,
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
  neighborhoods?: string, // comma separated string of neighborhood names
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
  nearby_schools?: string // comma separated string of school names
  primary_photo?: string,
  alt_photos?: string // comma separated string of urls
}

export type RecentSoldProperty = {
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
    'Table Title': string,
    'Table Description': string,
    Columns: CensusColumn[]
  },
  B02001: {
    'Table Title': string,
    'Table Description': string,
    Columns: CensusColumn[]
  },
  B03002: {
    'Table Title': string,
    'Table Description': string,
    Columns: CensusColumn[]
  },
  B19001: {
    'Table Title': string,
    'Table Description': string,
    Columns: CensusColumn[]
  },
  B19013: {
    'Table Title': string,
    'Table Description': string,
    Columns: CensusColumn[]
  },
  B23025: {
    'Table Title': string,
    'Table Description': string,
    Columns: CensusColumn[]
  },
  B25001: {
    'Table Title': string,
    'Table Description': string,
    Columns: CensusColumn[]
  },
  B25002: {
    'Table Title': string,
    'Table Description': string,
    Columns: CensusColumn[]
  },
  B25003: {
    'Table Title': string,
    'Table Description': string,
    Columns: CensusColumn[]
  }
}

export type CensusColumn = {
  'Column ID': string,
  Description: string,
  Estimate: number,
  Error: number,
  Geoid: string,
  Name: string
}

export type RentCashFlow = {
  tax_history: any, 
  rent_per_sqft: number,
  CMA_approach: {
    estimated_rent: number,
    comparable_properties: any[] 
  },
  value_percentage_approach: {
    rent_low: number,
    rent_high: number
  },
  grm_approach: {
    estimated_grm: number,
    estimated_monthly_rent: number
  }
}

// TBD
export type HomeDetails = {
  price: string,
  views: string,
  highlights: string[],
  home_details: {
    label: string,
    details: string[]
  }[],
  neighborhood_kpis: {
    title: string,
    text: string
  }[],
  tax_history: {
    year: string,
    tax_paid: string,
    tax_assessment: string,
    land: string,
    improvement: string
  }[],
  price_history: {
    date: string,
    event: string,
    price: string,
    change: string,
    sq_ft_price: string
  }[],
  deed_history: {
    date: string,
    type: string,
    sale_price: string,
    title_company: string
  }[],
  mortgage_history: {
    date: string,
    status: string,
    loan_amount: string,
    loan_type: string
  }[],
  transportation: {
    type: string,
    name: string,
    distance: string
  }[],
  bike_score: {
    tagline: string,
    score: string
  },
  walk_score: {
    tagline: string,
    score: string
  }
}