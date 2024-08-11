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
  const [fetchTimeout, setFetchTimeout] = useState<NodeJS.Timeout | null>(null)
  const [countdown, setCountdown] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false);
  const [previousBounds, setPreviousBounds] = useState<{ minLat: number, maxLat: number, minLng: number, maxLng: number } | null>(null);

  const boundsChangedSignificantly = (newBounds: any, oldBounds: any) => {
    const threshold = 0.001; // Define a threshold for significant change
    if(oldBounds === null) return true;
    return (
      Math.abs(newBounds.getSouth() - oldBounds.minLat) > threshold ||
      Math.abs(newBounds.getNorth() - oldBounds.maxLat) > threshold ||
      Math.abs(newBounds.getWest() - oldBounds.minLng) > threshold ||
      Math.abs(newBounds.getEast() - oldBounds.maxLng) > threshold
    );
  };

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
    if (mapRef.current && !loading) {
      const bounds = mapRef.current.getBounds();
      const newBounds = {
        minLat: bounds.getSouth(),
        maxLat: bounds.getNorth(),
        minLng: bounds.getWest(),
        maxLng: bounds.getEast(),
      };

      if (previousBounds && !boundsChangedSignificantly(bounds, previousBounds)) {
        console.log('Bounds change is minimal, not updating listings.');
        return;
      }

      setLoading(true);
      console.log('Map bounds:', newBounds);

      const listingIds = await fetchListingIdsWithinBounds(newBounds.minLat, newBounds.maxLat, newBounds.minLng, newBounds.maxLng);
      const listings = await fetchListingsByIds(listingIds);
      if (listings.length > 0) {
        setMapFetchedListings(listings);
      }
      setLoading(false);
      setPreviousBounds(newBounds);
    }
  };

  const handleMapMoveEnd = () => {
    if (loading || !boundsChangedSignificantly(mapRef.current.getBounds(), previousBounds)) return;
    if (fetchTimeout) {
      clearTimeout(fetchTimeout);
    }
    setCountdown(2);
    const timeout = setTimeout(() => {
      updateListingsWithinBounds();
      setCountdown(0);
    }, 2000);
    setFetchTimeout(timeout);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log('Component mounted or map moved');
    updateListingsWithinBounds();
  }, []);

  useEffect(() => {
    console.log('Hovered listing changed:', hoveredListing);
    if (mapRef.current && hoveredListing) {
      mapRef.current.flyTo({
        center: [hoveredListing.longitude || -77.0364, hoveredListing.latitude || 38.8951],
        zoom: 14,
        duration: 1000
      });
    }
    updateListingsWithinBounds(); // Fetch listings regardless of loading state
  }, [hoveredListing]);

  useEffect(() => {
    console.log('Selected listing changed:', selectedListing);
    if (mapRef.current && selectedListing) {
      mapRef.current.flyTo({
        center: [selectedListing.longitude || -77.0364, selectedListing.latitude || 38.8951],
        zoom: 14,
        duration: 1000
      });
    }
    updateListingsWithinBounds(); // Fetch listings regardless of loading state
  }, [selectedListing]);

  useEffect(() => {
    console.log('Listings changed:', listings);
    if (mapRef.current && listings.length > 0) {
      mapRef.current.flyTo({
        center: [listings[0].longitude || -77.0364, listings[0].latitude || 38.8951],
        zoom: 14,
        duration: 1000
      });
    }
    updateListingsWithinBounds(); // Fetch listings regardless of loading state
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
          zoom: 14
        }}
        style={{width: '100%', height: '100%', borderRadius: '8px'}}
        mapStyle={"mapbox://styles/mapbox/dark-v11"}
        onMoveEnd={handleMapMoveEnd}
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
        {countdown > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '5px',
            }}
          >
            Fetching new listings in {countdown}...
          </Box>
        )}
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
            }}
          >
            Loading listings...
          </Box>
        )}
      </Map>
     {/* TODO: No borders, transparent vignette around map */}
    </Box>
  )
}

export default MapPage