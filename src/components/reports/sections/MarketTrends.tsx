import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

// ** Types
import { ListingType, Report, MarketTrendsType, ComparableHome, RecentSoldProperty } from '@/utils/types'
import { exampleMarketTrends } from '@/utils/vars'

type MarketTrendsProps = {
  data: Report
  listing: ListingType
}

const MarketTrends = ({ data, listing }: MarketTrendsProps) => {
  const marketTrends: MarketTrendsType = data.market_trends ? JSON.parse(data.market_trends) : JSON.parse(exampleMarketTrends)

  useEffect(() => {
    console.log('marketTrends', marketTrends)
  }, [marketTrends])

  const renderTableCell = (value: any, compareValue: any) => {
    if (typeof value === 'number' && typeof compareValue === 'number') {
      const diff = compareValue - value
      const diffPercentage = ((diff / value) * 100).toFixed(1)
      return (
        <TableCell>
          {compareValue} {diff !== 0 && <span style={{ color: diff > 0 ? 'green' : 'red' }}>{diff > 0 ? `↑${diffPercentage}%` : `↓${diffPercentage}%`}</span>}
        </TableCell>
      )
    }
    return <TableCell>{compareValue}</TableCell>
  }

  return (
    <Box className="flex flex-col overflow-y-auto">
      <Typography fontSize={14} sx={{ marginBottom: 2 }} fontWeight={600}>
        Market Trends
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography fontSize={14} fontWeight={600}>
                Comparable Homes
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Attribute</TableCell>
                    <TableCell>Listing</TableCell>
                    {marketTrends.recent_sold_properties.map((home: RecentSoldProperty, index: number) => (
                      <TableCell key={index}>Comparable {index + 1}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { label: 'Distance', value: '-' },
                    { label: 'List Price', value: listing.list_price },
                    { label: 'Original Price', value: '-' },
                    { label: 'Price Changes', value: '-' },
                    { label: 'Sold Price', value: listing.sold_price },
                    { label: 'Sold Date', value: listing.last_sold_date },
                    { label: 'Days on Market', value: listing.days_on_mls },
                    { label: 'Sq Ft', value: listing.sqft },
                    { label: 'Price per Sq Ft', value: listing.price_per_sqft },
                    { label: 'Beds', value: listing.beds },
                    { label: 'Baths', value: listing.full_baths + (listing.half_baths || 0) },
                    { label: 'Lot Size (Sq Ft)', value: listing.lot_sqft },
                    { label: 'Parking', value: listing.parking_garage },
                  ].map((row: any, rowIndex: number) => (
                    <TableRow key={rowIndex}>
                      <TableCell>{row.label}</TableCell>
                      <TableCell>{row.value}</TableCell>
                      {marketTrends.recent_sold_properties.map((home: RecentSoldProperty, colIndex: number) => (
                        renderTableCell(row.value, home[row.label.toLowerCase().replace(/ /g, '_') as keyof RecentSoldProperty])
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography fontSize={14} fontWeight={600}>
                Market Trends Over Time
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={[
                  { year: '2020', average_price: marketTrends.average_price_2020, median_price: marketTrends.median_price_2020 },
                  { year: '2021', average_price: marketTrends.average_price_2021, median_price: marketTrends.median_price_2021 },
                  { year: '2022', average_price: marketTrends.average_price_2022, median_price: marketTrends.median_price_2022 },
                  { year: '2023', average_price: marketTrends.average_price_2023, median_price: marketTrends.median_price_2023 },
                  { year: '2024', average_price: marketTrends.average_price_2024, median_price: marketTrends.median_price_2024 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="average_price" stroke="#8884d8" />
                  <Line type="monotone" dataKey="median_price" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MarketTrends