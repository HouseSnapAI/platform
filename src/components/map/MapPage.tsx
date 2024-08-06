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

const MapPage = ({listings, hoveredListing}: {listings: ListingType[], hoveredListing: ListingType | null}) => {
  const theme = useTheme()
  const mapRef = useRef<any>(null)
  const mapBoxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

  useEffect(() => {
    if (mapRef.current && hoveredListing) {
      mapRef.current.flyTo({
        center: [hoveredListing.longitude, hoveredListing.latitude],
        zoom: 9,
        duration: 1000
      });
    }
  }, [hoveredListing]);

  return (
    <Box 
      className={`h-full w-full rounded-lg flex flex-col items-center text-center justify-between shadow-lg scale-100`} 
      sx={{ backgroundColor: theme.palette.background.paper }}
    >
      <Map
        ref={mapRef}
        mapboxAccessToken={mapBoxToken}
        initialViewState={{
          longitude: listings[0]?.longitude || 0,
          latitude: listings[0]?.latitude || 0,
          zoom: 9
        }}
        style={{width: '100%', height: '100%', borderRadius: '8px'}}
        mapStyle={"mapbox://styles/mapbox/dark-v11"}
      >
        {listings.length > 0 && listings.map((listing) => (
          <Marker
            key={listing.id}
            longitude={listing.longitude}
            latitude={listing.latitude}
            color={hoveredListing && hoveredListing.id === listing.id ? "blue" : "red"}
          />
        ))}
        <NavigationControl position="top-right" />
      </Map>
     {/* TODO: No borders, transparent vingette around map */}
    </Box>
  )
}

export default MapPage