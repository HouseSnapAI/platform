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

const MapPage = ({listings}: {listings: ListingType[]}) => {
  const theme = useTheme()
  const mapRef = useRef<any>(null)
  const mapBoxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

  useEffect(() => {
    console.log("in")
    if (mapRef.current && listings.length > 0) {
      mapRef.current.flyTo({
        center: [listings[0].longitude, listings[0].latitude],
        zoom: 12,
        duration: 2000
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
          longitude: listings[0].longitude,
          latitude: listings[0].latitude,
          zoom: 9
        }}
        style={{width: '100%', height: '100%', borderRadius: '8px'}}
        mapStyle={"mapbox://styles/mapbox/dark-v11"}
      >
        {listings.map((listing, index) => (
          <Marker
            key={index}
            longitude={listing.longitude}
            latitude={listing.latitude}
            color="red"
          />
        ))}
        <NavigationControl position="top-right" />
      </Map>
     {/* TODO: No borders, transparent vingette around map */}
    </Box>
  )
}

export default MapPage