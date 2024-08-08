// ** React Imports
import { useRef, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'

// ** Theme Imports
import { useTheme } from '@mui/material/styles'

// ** Map Imports
import Map, { NavigationControl, Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// ** Types
import { ListingType } from '@/utils/types'
import { fetchListing } from '@/utils/db'

type MapPageProps = {
  listings: ListingType[];
  hoveredListing: ListingType | null;
  setSelectedListing: (listing: ListingType | null) => void;
  selectedListing: ListingType | null;
}

const MapPage = ({ listings, hoveredListing, setSelectedListing, selectedListing }: MapPageProps) => {
  const theme = useTheme()
  const mapRef = useRef<any>(null)
  const mapBoxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!
  
  const [mapFetchedListings, setMapFetchedListings] = useState<ListingType[]>([])

  const fetchListingIdsWithinBounds = async (minLat: number, maxLat: number, minLng: number, maxLng: number) => {
    console.log('Fetching listing IDs within bounds:', { minLat, maxLat, minLng, maxLng });
    const response = await fetch('/api/listing/map', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        min_latitude: minLat,
        max_latitude: maxLat,
        min_longitude: minLng,
        max_longitude: maxLng,
      }),
    });

    if (response.ok) {
      const listingIds = await response.json();
      console.log('Fetched listing IDs:', listingIds);
      return listingIds;
    } else {
      console.error('Error fetching listing IDs:', response.statusText);
      return [];
    }
  };

  const fetchListingsByIds = async (ids: string[]) => {
    console.log('Fetching listings by IDs:', ids);
    const response = await fetchListing({ids})

    if (response.status === 200) {
      const listings = await response.data;
      console.log('Fetched listings:', listings);
      return listings;
    } else {
      console.error('Error fetching listings:', response.message);
      return [];
    }
  };

  const updateListingsWithinBounds = async () => {
    if (mapRef.current) {
      const bounds = mapRef.current.getBounds();
      const minLat = bounds.getSouth();
      const maxLat = bounds.getNorth();
      const minLng = bounds.getWest();
      const maxLng = bounds.getEast();

      console.log('Map bounds:', { minLat, maxLat, minLng, maxLng });

      const listingIds = await fetchListingIdsWithinBounds(minLat, maxLat, minLng, maxLng);
      const listings = await fetchListingsByIds(listingIds);
      if (listings.length > 0) {
        setMapFetchedListings(listings);
      }
    }
  };

  useEffect(() => {
    console.log('Component mounted or map moved');
    updateListingsWithinBounds();
  }, []);

  useEffect(() => {
    console.log('Hovered listing changed:', hoveredListing);
    if (mapRef.current && hoveredListing) {
      mapRef.current.flyTo({
        center: [hoveredListing.longitude || -77.0364, hoveredListing.latitude || 38.8951],
        zoom: 9,
        duration: 1000
      });
    }
  }, [hoveredListing]);

  useEffect(() => {
    console.log('Selected listing changed:', selectedListing);
    if (mapRef.current && selectedListing) {
      mapRef.current.flyTo({
        center: [selectedListing.longitude || -77.0364, selectedListing.latitude || 38.8951],
        zoom: 9,
        duration: 1000
      });
    }
  }, [selectedListing]);

  useEffect(() => {
    console.log('Listings changed:', listings);
    if (mapRef.current && listings.length > 0) {
      mapRef.current.flyTo({
        center: [listings[0].longitude || -77.0364, listings[0].latitude || 38.8951],
        zoom: 9,
        duration: 1000
      });
    }
  }, [listings]);

  return (
    <Box 
      className={`h-full w-full rounded-lg flex flex-col items-center text-center justify-between shadow-lg scale-100`} 
      sx={{ backgroundColor: theme.palette.background.paper }}
    >
      <Map
        ref={mapRef}
        mapboxAccessToken={mapBoxToken}
        initialViewState={{
          longitude: listings[0]?.longitude || -77.0364,
          latitude: listings[0]?.latitude || 38.8951,
          zoom: 9
        }}
        style={{width: '100%', height: '100%', borderRadius: '8px'}}
        mapStyle={"mapbox://styles/mapbox/dark-v11"}
        onMoveEnd={updateListingsWithinBounds}
      >
        {(listings.length > 0 || mapFetchedListings.length > 0) && [...listings, ...mapFetchedListings].map((listing) => (
          <Marker longitude={listing.longitude} latitude={listing.latitude}>
            <Tooltip
              title={listing.full_street_line}
            >
            <Box
              className="hover:bg-red-500"
              sx={{
                width: '25px',
                height: '25px',
                borderRadius: '50%',
                backgroundColor: selectedListing && selectedListing.id === listing.id ? "blue" : hoveredListing && hoveredListing.id === listing.id ? "red" : "green",
                cursor: 'pointer',
              }}
              onClick={() => setSelectedListing(listing)} // Set selected listing on click
            />
          </Tooltip>
        </Marker>
        ))}
        <NavigationControl position="top-right" />
      </Map>
     {/* TODO: No borders, transparent vignette around map */}
    </Box>
  )
}

export default MapPage