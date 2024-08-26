import { HomeDetails, Message } from "./types"

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


export const exampleHomeDetails: HomeDetails = {
        "price": "$799,000",
        "views": "597",
        "highlights": [
            "RV Access or Parking",
            "Primary Bedroom Suite",
            "Great Room",
            "Oak Chan Elementary School Rated A",
            "Cathedral Ceiling",
            "Combination Kitchen and Living"
        ],
        "home_details": [
            {
                "label": "Home Type",
                "details": [
                    "Single Family"
                ]
            },
            {
                "label": "Est. Annual Taxes",
                "details": [
                    "$6,398"
                ]
            },
            {
                "label": "Year Built",
                "details": [
                    "Built in 1989 | Remodeled"
                ]
            },
            {
                "label": "Parking",
                "details": [
                    "3 Car Garage",
                    "Front Facing Garage",
                    "Driveway",
                    "RV Access or Parking"
                ]
            },
            {
                "label": "Home Design",
                "details": [
                    "Slab Foundation",
                    "Frame Construction",
                    "Tile Roof",
                    "Stucco"
                ]
            },
            {
                "label": "Interior Spaces",
                "details": [
                    "2,451 Sq Ft Home",
                    "2-Story Property",
                    "Cathedral Ceiling",
                    "Ceiling Fan",
                    "Gas Fireplace",
                    "Family Room with Fireplace",
                    "Great Room",
                    "Combination Kitchen and Living",
                    "Formal Dining Room",
                    "Vinyl Flooring"
                ]
            },
            {
                "label": "Kitchen",
                "details": [
                    "Kitchen Island",
                    "Quartz Countertops"
                ]
            },
            {
                "label": "Bedrooms and Bathrooms",
                "details": [
                    "4 Bedrooms",
                    "Primary Bedroom Suite",
                    "Walk-In Closet",
                    "3 Full Bathrooms",
                    "Secondary Bathroom Double Sinks",
                    "Bathtub With Separate Shower Stall"
                ]
            },
            {
                "label": "Laundry",
                "details": [
                    "Laundry in unit",
                    "220 Volts In Laundry"
                ]
            },
            {
                "label": "Home Security",
                "details": [
                    "Carbon Monoxide Detectors",
                    "Fire and Smoke Detector"
                ]
            },
            {
                "label": "Lot Details",
                "details": [
                    "8,250 Sq Ft Lot",
                    "Back Yard Fenced"
                ]
            },
            {
                "label": "Utilities",
                "details": [
                    "Forced Air Zoned Heating and Cooling System"
                ]
            },
            {
                "label": "Overview",
                "details": [
                    "No Home Owners Association",
                    "Willow Creek Estates South Subdivision"
                ]
            },
            {
                "label": "Building Details",
                "details": [
                    "Net Lease"
                ]
            }
        ],
        "neighborhood_kpis": [
            {
                "title": "List Price Range",
                "text": "$683K - $1.7M"
            },
            {
                "title": "Homes For Sale",
                "text": "7"
            },
            {
                "title": "Average Home Value",
                "text": "$854,038"
            },
            {
                "title": "Median Lot Size",
                "text": "8,712 Sq Ft"
            },
            {
                "title": "% Renters",
                "text": "57%"
            },
            {
                "title": "Household Income",
                "text": "$147,945"
            },
            {
                "title": "% of College Grads",
                "text": "60.5%"
            },
            {
                "title": "Median Age",
                "text": "39"
            },
            {
                "title": "Average House Size",
                "text": "2,408 Sq Ft"
            },
            {
                "title": "% Commercial Property",
                "text": "60.9%"
            }
        ],
        "tax_history": [
            {
                "year": "2024",
                "tax_paid": "$6,398",
                "tax_assessment": "$594,616",
                "land": "$198,356",
                "improvement": "$396,260"
            },
            {
                "year": "2023",
                "tax_paid": "$6,398",
                "tax_assessment": "$582,958",
                "land": "$194,467",
                "improvement": "$388,491"
            },
            {
                "year": "2022",
                "tax_paid": "$6,304",
                "tax_assessment": "$571,528",
                "land": "$190,654",
                "improvement": "$380,874"
            },
            {
                "year": "2021",
                "tax_paid": "$6,221",
                "tax_assessment": "$560,322",
                "land": "$186,916",
                "improvement": "$373,406"
            },
            {
                "year": "2020",
                "tax_paid": "$3,861",
                "tax_assessment": "$347,402",
                "land": "$101,009",
                "improvement": "$246,393"
            },
            {
                "year": "2019",
                "tax_paid": "$3,797",
                "tax_assessment": "$340,591",
                "land": "$99,029",
                "improvement": "$241,562"
            },
            {
                "year": "2018",
                "tax_paid": "$3,704",
                "tax_assessment": "$333,914",
                "land": "$97,088",
                "improvement": "$236,826"
            },
            {
                "year": "2017",
                "tax_paid": "$3,461",
                "tax_assessment": "$327,368",
                "land": "$95,185",
                "improvement": "$232,183"
            },
            {
                "year": "2016",
                "tax_paid": "$3,609",
                "tax_assessment": "$320,950",
                "land": "$93,319",
                "improvement": "$227,631"
            },
            {
                "year": "2015",
                "tax_paid": "$3,491",
                "tax_assessment": "$316,130",
                "land": "$91,918",
                "improvement": "$224,212"
            },
            {
                "year": "2014",
                "tax_paid": "$3,318",
                "tax_assessment": "$309,938",
                "land": "$90,118",
                "improvement": "$219,820"
            }
        ],
        "price_history": [
            {
                "date": "08/22/2024",
                "event": "For Sale",
                "price": "$799,000",
                "change": "+44.1%",
                "sq_ft_price": "$326 / Sq Ft"
            },
            {
                "date": "03/06/2020",
                "event": "Sold",
                "price": "$554,578",
                "change": "-8.8%",
                "sq_ft_price": "$246 / Sq Ft"
            },
            {
                "date": "02/07/2020",
                "event": "Pending",
                "price": "--",
                "change": "--",
                "sq_ft_price": "--"
            },
            {
                "date": "01/31/2020",
                "event": "For Sale",
                "price": "$608,000",
                "change": "--",
                "sq_ft_price": "$270 / Sq Ft"
            }
        ],
        "deed_history": [
            {
                "date": "04/26/24",
                "type": "Affidavit",
                "sale_price": "--",
                "title_company": "--"
            },
            {
                "date": "03/04/20",
                "type": "Grant Deed",
                "sale_price": "$555,000",
                "title_company": "First American Title Company"
            },
            {
                "date": "03/07/00",
                "type": "Interfamily Deed Transfer",
                "sale_price": "--",
                "title_company": "--"
            }
        ],
        "mortgage_history": [
            {
                "date": "03/29/21",
                "status": "Previous Owner",
                "loan_amount": "$439,730",
                "loan_type": "New Conventional"
            },
            {
                "date": "03/04/20",
                "status": "Previous Owner",
                "loan_amount": "$443,663",
                "loan_type": "New Conventional"
            }
        ],
        "transportation": [
            {
                "type": "Subway",
                "name": "Glenn",
                "distance": "10 min drive"
            },
            {
                "type": "Subway",
                "name": "Historic Folsom",
                "distance": "10 min drive"
            },
            {
                "type": "Bus",
                "name": "Prewett Dr & Silberhorn Dr (Eb)",
                "distance": "2 min walk"
            },
            {
                "type": "Bus",
                "name": "Silberhorn Dr & Prewett Dr (Nb)",
                "distance": "2 min walk"
            }
        ],
        "bike_score": {
            "tagline": "Bikeable",
            "score": "51"
        },
        "walk_score": {
            "tagline": "Car-Dependent",
            "score": "8"
        }
}

export const exampleMarketTrends = `"{\"average_year_built\": 1988.1927710843374, \"median_year_built\": 1987.0, \"range_year_built\": 87, \"average_lot_size\": 12210.471337579618, \"median_lot_size\": 6643.0, \"range_lot_size\": 211196, \"average_price_per_sqft\": 227.59036144578315, \"median_price_per_sqft\": 207.5, \"range_price_per_sqft\": 3602, \"average_estimated_price\": 286983.23255813954, \"median_estimated_price\": 275000.0, \"range_estimated_price\": 1236000, \"average_house_size\": 1358.789156626506, \"median_house_size\": 1307.5, \"range_house_size\": 3724, \"average_days_on_market\": 61.666666666666664, \"median_days_on_market\": 52.0, \"range_days_on_market\": 180, \"comparable_homes\": {\"property_url\": {\"0\": \"https://www.realtor.com/realestateandhomes-detail/9123078936\", \"1\": \"https://www.realtor.com/realestateandhomes-detail/2186321696\", \"2\": \"https://www.realtor.com/realestateandhomes-detail/2685207868\", \"3\": \"https://www.realtor.com/realestateandhomes-detail/9170512514\", \"4\": \"https://www.realtor.com/realestateandhomes-detail/9019740485\", \"5\": \"https://www.realtor.com/realestateandhomes-detail/2032077960\", \"6\": \"https://www.realtor.com/realestateandhomes-detail/1155359152\", \"7\": \"https://www.realtor.com/realestateandhomes-detail/2186321696\", \"8\": \"https://www.realtor.com/realestateandhomes-detail/2075082858\"}, \"mls\": {\"0\": \"FRCA\", \"1\": \"FRCA\", \"2\": \"MRCA\", \"3\": \"MRCA\", \"4\": \"FRCA\", \"5\": \"FRCA\", \"6\": \"FRCA\", \"7\": \"MRCA\", \"8\": \"FRCA\"}, \"mls_id\": {\"0\": \"615963\", \"1\": \"613455\", \"2\": \"MD24117401\", \"3\": \"MD24165626\", \"4\": \"615525\", \"5\": \"617342\", \"6\": \"615404\", \"7\": \"MD24112674\", \"8\": \"615742\"}, \"status\": {\"0\": \"PENDING\", \"1\": \"PENDING\", \"2\": \"PENDING\", \"3\": \"PENDING\", \"4\": \"PENDING\", \"5\": \"PENDING\", \"6\": \"PENDING\", \"7\": \"PENDING\", \"8\": \"PENDING\"}, \"text\": {\"0\": \"Take a look at this beautiful Manufacture Home, located in The Meadows Mobile Home Park. Move in ready with many upgrades. This mobile home park also offers a spacious club house and a sparkling pool.\", \"1\": \"Calling all investors, this is a 4-bedroom, 1.5 bath home ready for your touch. Just a couple of blocks from downtown, this home has tons of upside for the right buyer. Call your Realtor today for a preview.\", \"2\": \"Excellent lot located on Road 26, south of Avenue 17 across from El Amigo. Ideal location for your future business. Call for more information.\", \"3\": \"Great potential with this 3-bedroom, 2-bathroom home in a 55+ community. Call today for more information.\", \"4\": \"New Crown Home Coming Soon To Madera! Lot 28. You will OWN the solar. This home will have a beautiful tile roof. The front yard will be landscaped with automatic sprinklers and a drip line. Inside, you will find a spacious kitchen with stainless steel gas appliances including a stove, microwave, and dishwasher. The house will also have a large pantry, granite countertops, big kitchen island, and nice LVP flooring. The dining room will open to a big covered patio. You will find a large owner's suite with a walk-in closet. This 3 bedroom, 2 bath, 2 car garage home will be super energy efficient. The home will also come equipped with dual pane windows and solar panels. It's located in a very quiet neighborhood down the street from a future neighborhood park. Pictures are not of the house for sale. Builder is paying up to $5k towards closing costs with preferred lender.\", \"5\": \"Sold Prior to Publication\", \"6\": \"This bungalow home is an ideal addition to your investment portfolio. The home offers a spacious great room at the heart of the house. Perfect for family gatherings and entertaining, the versatile space that seamlessly connects to the rest of the home. There are two bedrooms situated off the great room, providing comfortable living spaces for rest and relaxation. Towards the back of the house, you'll find the kitchen and bathroom, both designed with convenience in mind. The large yard, offers ample space for outdoor activities and potential for additional entertaining areas.\", \"7\": \"Calling all investors, this is a 4 bedroom 1.5 bath home ready for your touch. Just a couple of blocks from downtown, this home has tons of upside for the right buyer. Call your Realtor today for a preview.\", \"8\": \"We are pleased to present a remarkable opportunity in the vibrant community of Madera, CA. Located at 1709 Merced St, this property boasts four bedrooms and two bathrooms spread across 1420 +/- sqft. Featuring tile flooring, a generously sized living room, and a spacious backyard complete with a patio and beautiful landscaping, this home is ideally suited for family living. With its inviting layout and desirable amenities, 1709 Merced Street offers a perfect blend of comfort.\"}, \"style\": {\"0\": \"MOBILE\", \"1\": \"SINGLE_FAMILY\", \"2\": \"LAND\", \"3\": \"MOBILE\", \"4\": \"SINGLE_FAMILY\", \"5\": \"SINGLE_FAMILY\", \"6\": \"SINGLE_FAMILY\", \"7\": \"SINGLE_FAMILY\", \"8\": \"SINGLE_FAMILY\"}, \"full_street_line\": {\"0\": \"1218 E Cleveland Ave Spc 179\", \"1\": \"709 Washington Ave\", \"2\": \"6 Lot Road26 Lot ROAD26\", \"3\": \"1218 E Cleveland Ave Spc 126\", \"4\": \"1173 Dandelion Ln\", \"5\": \"920 Sierra St\", \"6\": \"1028 Clinton St\", \"7\": \"709 Washington Ave\", \"8\": \"1709 Merced St\"}, \"street\": {\"0\": \"1218 E Cleveland Ave\", \"1\": \"709 Washington Ave\", \"2\": null, \"3\": \"1218 E Cleveland Ave\", \"4\": \"1173 Dandelion Ln\", \"5\": \"920 Sierra St\", \"6\": \"1028 Clinton St\", \"7\": \"709 Washington Ave\", \"8\": \"1709 Merced St\"}, \"unit\": {\"0\": \"Spc 179\", \"1\": null, \"2\": \"Lot ROAD26\", \"3\": \"Spc 126\", \"4\": null, \"5\": null, \"6\": null, \"7\": null, \"8\": null}, \"city\": {\"0\": \"Madera\", \"1\": \"Madera\", \"2\": \"Madera\", \"3\": \"Madera\", \"4\": \"Madera\", \"5\": \"Madera\", \"6\": \"Madera\", \"7\": \"Madera\", \"8\": \"Madera\"}, \"state\": {\"0\": \"CA\", \"1\": \"CA\", \"2\": \"CA\", \"3\": \"CA\", \"4\": \"CA\", \"5\": \"CA\", \"6\": \"CA\", \"7\": \"CA\", \"8\": \"CA\"}, \"zip_code\": {\"0\": \"93638\", \"1\": \"93638\", \"2\": \"93638\", \"3\": \"93638\", \"4\": \"93638\", \"5\": \"93638\", \"6\": \"93638\", \"7\": \"93638\", \"8\": \"93638\"}, \"beds\": {\"0\": 2, \"1\": 4, \"2\": null, \"3\": 3, \"4\": 3, \"5\": 3, \"6\": 2, \"7\": 4, \"8\": 4}, \"full_baths\": {\"0\": 2, \"1\": 1, \"2\": null, \"3\": 2, \"4\": 2, \"5\": 1, \"6\": 1, \"7\": 1, \"8\": 2}, \"half_baths\": {\"0\": null, \"1\": null, \"2\": null, \"3\": null, \"4\": null, \"5\": 1, \"6\": null, \"7\": 1, \"8\": null}, \"sqft\": {\"0\": 1056, \"1\": 1062, \"2\": null, \"3\": 1200, \"4\": 1496, \"5\": 1198, \"6\": 604, \"7\": 1062, \"8\": 1420}, \"year_built\": {\"0\": 1995, \"1\": 1976, \"2\": null, \"3\": 1980, \"4\": null, \"5\": 1965, \"6\": 1976, \"7\": 1976, \"8\": 1986}, \"days_on_mls\": {\"0\": 31, \"1\": 82, \"2\": 75, \"3\": 12, \"4\": 39, \"5\": 3, \"6\": 44, \"7\": 82, \"8\": 36}, \"list_price\": {\"0\": 130000, \"1\": 235000, \"2\": 150000, \"3\": 50000, \"4\": 392050, \"5\": 300000, \"6\": 210000, \"7\": 250000, \"8\": 350000}, \"list_price_min\": {\"0\": null, \"1\": null, \"2\": null, \"3\": null, \"4\": null, \"5\": null, \"6\": null, \"7\": null, \"8\": null}, \"list_price_max\": {\"0\": null, \"1\": null, \"2\": null, \"3\": null, \"4\": null, \"5\": null, \"6\": null, \"7\": null, \"8\": null}, \"list_date\": {\"0\": \"2024-07-25\", \"1\": \"2024-06-04\", \"2\": \"2024-06-11\", \"3\": \"2024-08-13\", \"4\": \"2024-07-17\", \"5\": \"2024-08-22\", \"6\": \"2024-07-12\", \"7\": \"2024-06-04\", \"8\": \"2024-07-20\"}, \"sold_price\": {\"0\": null, \"1\": 36000, \"2\": null, \"3\": null, \"4\": null, \"5\": 65000, \"6\": null, \"7\": 36000, \"8\": 74000}, \"last_sold_date\": {\"0\": null, \"1\": \"2009-02-03\", \"2\": null, \"3\": null, \"4\": null, \"5\": \"1995-07-24\", \"6\": null, \"7\": \"2009-02-03\", \"8\": \"1995-02-01\"}, \"assessed_value\": {\"0\": null, \"1\": 43674, \"2\": 3786, \"3\": null, \"4\": null, \"5\": 111259, \"6\": 53608, \"7\": 43674, \"8\": 117102}, \"estimated_value\": {\"0\": null, \"1\": 248000, \"2\": null, \"3\": null, \"4\": null, \"5\": 283000, \"6\": 207655, \"7\": 248000, \"8\": 347311}, \"lot_sqft\": {\"0\": 1056, \"1\": 3484, \"2\": 14736, \"3\": null, \"4\": 5000, \"5\": 6098, \"6\": 5416, \"7\": 3485, \"8\": 6906}, \"price_per_sqft\": {\"0\": 123, \"1\": 221, \"2\": null, \"3\": 42, \"4\": 262, \"5\": 250, \"6\": 348, \"7\": 235, \"8\": 246}, \"latitude\": {\"0\": 36.973232, \"1\": 36.964777, \"2\": 36.994376, \"3\": 36.973232, \"4\": 36.964171, \"5\": 36.972523, \"6\": 36.966924, \"7\": 36.964777, \"8\": 36.98241}, \"longitude\": {\"0\": -120.048309, \"1\": -120.050361, \"2\": -120.074668, \"3\": -120.048309, \"4\": -120.040293, \"5\": -120.064716, \"6\": -120.04402, \"7\": -120.050361, \"8\": -120.052197}, \"neighborhoods\": {\"0\": \"Central Madera\", \"1\": \"Downtown Madera\", \"2\": null, \"3\": \"Central Madera\", \"4\": null, \"5\": \"Central Madera\", \"6\": \"Downtown Madera\", \"7\": \"Downtown Madera\", \"8\": \"Central Madera\"}, \"county\": {\"0\": \"Madera\", \"1\": \"Madera\", \"2\": \"Madera\", \"3\": \"Madera\", \"4\": \"Madera\", \"5\": \"Madera\", \"6\": \"Madera\", \"7\": \"Madera\", \"8\": \"Madera\"}, \"fips_code\": {\"0\": \"06039\", \"1\": \"06039\", \"2\": \"06039\", \"3\": \"06039\", \"4\": \"06039\", \"5\": \"06039\", \"6\": \"06039\", \"7\": \"06039\", \"8\": \"06039\"}, \"stories\": {\"0\": null, \"1\": null, \"2\": null, \"3\": 1, \"4\": null, \"5\": null, \"6\": null, \"7\": 1, \"8\": null}, \"hoa_fee\": {\"0\": 0, \"1\": 0, \"2\": 0, \"3\": 0, \"4\": 0, \"5\": 0, \"6\": 0, \"7\": 0, \"8\": 0}, \"parking_garage\": {\"0\": null, \"1\": null, \"2\": null, \"3\": null, \"4\": null, \"5\": null, \"6\": null, \"7\": null, \"8\": null}, \"agent\": {\"0\": \"Ernestina P. Gonzalez Velasco\", \"1\": \"Rosanne Bonilla\", \"2\": \"Alex Salazar\", \"3\": \"Alex Salazar\", \"4\": \"Buenaventura Flores\", \"5\": \"Alice Chavira\", \"6\": \"Nicole Parent\", \"7\": \"Rosanne Bonilla\", \"8\": \"Yanette Diaz- Franco\"}, \"agent_email\": {\"0\": \"erne...`