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
  
  const [tooltipOpen, setTooltipOpen] = useState(false);

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

  useEffect(() => {
    if (mapRef.current && selectedListing) {
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
      >
        {listings.length > 0 && listings.map((listing) => (
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
     {/* TODO: No borders, transparent vingette around map */}
    </Box>
  )
}

export default MapPage