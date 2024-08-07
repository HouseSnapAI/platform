// ** React Imports
import { useRef, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Theme Imports
import { useTheme } from '@mui/material/styles'

// ** Map Imports
import Map, { NavigationControl, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// ** Types
import { ListingType } from '@/utils/types'

const MapPage = ({listings, hoveredListing, onMarkerHover, selectedListing}: {listings: ListingType[], hoveredListing: ListingType | null, onMarkerHover: (listing: ListingType | null) => void, selectedListing: ListingType | null}) => {
  const theme = useTheme()
  const mapRef = useRef<any>(null)
  const mapBoxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

  useEffect(() => {
    console.log("hoveredListing", hoveredListing)
    if (mapRef.current && hoveredListing) {
      mapRef.current.flyTo({
        center: [hoveredListing.longitude || -77.0364, hoveredListing.latitude || 38.8951],
        zoom: 9,
        duration: 1000
      });
    }
  }, [hoveredListing]);

  useEffect(() => {
    if (mapRef.current && selectedListing) {
      mapRef.current.flyTo({
        center: [selectedListing.longitude || -77.0364, selectedListing.latitude || 38.8951],
        zoom: 9,
        duration: 1000
      });
    }
  }, [selectedListing]);

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
      >
        {listings.length > 0 && listings.map((listing) => (
          <Box
            key={(hoveredListing?.id || "") + (selectedListing?.id || "") + listing.id}
            onMouseEnter={() => onMarkerHover(listing)}
            // onMouseLeave={() => onMarkerHover(null)}
          >
            <Marker
              longitude={listing.longitude}
              latitude={listing.latitude}
              color={selectedListing && selectedListing.id === listing.id ? "blue" : hoveredListing && hoveredListing.id === listing.id ? "red" : "green"}
            />
          </Box>
        ))}
        <NavigationControl position="top-right" />
      </Map>
     {/* TODO: No borders, transparent vingette around map */}
    </Box>
  )
}

export default MapPage