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