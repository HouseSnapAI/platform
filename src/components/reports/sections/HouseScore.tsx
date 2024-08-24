// ** Next Imports
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconInfoCircle from '@tabler/icons-react'
import Chip from '@mui/material/Chip'

// ** Types
import { HomeDetails, ListingType, Report } from '@/utils/types'

// ** Utils
import { exampleHomeDetails } from '@/utils/vars'

// ** Components
import ListingDetails from './ReportListingDetails'
import Divider from '@mui/material/Divider'

type HouseScoreProps = {
    data: Report
    listing: ListingType
}

const HouseScore = ({data, listing}: HouseScoreProps) => {
  const homeDetails: HomeDetails = data.home_details ? JSON.parse(data.home_details) : exampleHomeDetails

  return (
    <Box className="flex flex-col overflow-y-auto">
      <Grid container spacing={2} p={1}>
        <Grid container spacing={2} p={1}>
          <Grid item xs={12} md={6} className='max-h-[70vh]'>
            <Card className='h-full'>
                <CardContent className='h-full overflow-auto'>
                    <ListingDetails listing={listing} />
                </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} className='max-h-[70vh]'>
            <Box className='h-full overflow-auto'>
              <Card>
                <CardContent>
                  <Typography fontSize={14} sx={{ marginBottom: 2 }} fontWeight={600}>
                    Home Details
                  </Typography>
                  <Grid container spacing={2}>
                    {homeDetails.home_details.map((detail, index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <Box mb={2}>
                          <Typography fontSize={14}>
                            {detail.label}
                          </Typography>
                          <ul>
                            {detail.details.map((item, idx) => (
                              <li key={idx}>
                                <Typography fontSize={14} color="text.secondary">{item}</Typography>
                              </li>
                            ))}
                          </ul>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>

        {homeDetails.neighborhood_kpis && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography fontSize={14} sx={{ marginBottom: 2 }} fontWeight={600}>
                  Neighborhood KPIs
                </Typography>
                <Box className='flex flex-wrap gap-2' >
                  {homeDetails.neighborhood_kpis.map((kpi, index) => (
                    <Box key={index} className='w-min py-2 px-4 flex flex-col gap-1 justify-center items-center' sx={{border: '0.5px solid #6f6f6f'}}>
                      <Typography fontSize={14} noWrap>
                        {kpi.title}
                      </Typography>
                      <Divider />
                      <Typography fontSize={14} noWrap color="text.secondary">{kpi.text}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {homeDetails.tax_history && (
          <Grid item xs={12} sm={6}>
            <Card className='max-h-[300px] h-full overflow-y-auto'>
              <CardContent>
                <Typography fontSize={14} sx={{ marginBottom: 0 }} fontWeight={600}>
                  Tax History
                </Typography>
                <Box mt={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography fontSize={14} sx={{ flex: 1 }}>
                      Year
                    </Typography>
                    <Typography fontSize={14} sx={{ flex: 2 }}>
                      Tax Paid
                    </Typography>
                    <Typography fontSize={14} sx={{ flex: 3 }}>
                      Assessment
                    </Typography>
                    <Typography fontSize={14} sx={{ flex: 2 }}>
                      Land
                    </Typography>
                    <Typography fontSize={14} sx={{ flex: 2 }}>
                      Improvement
                    </Typography>
                  </Box>
                  {homeDetails.tax_history.map((tax, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography fontSize={14} color="text.secondary" sx={{ flex: 1 }}>
                        {tax.year}
                      </Typography>
                      <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                        {tax.tax_paid}
                      </Typography>
                      <Typography fontSize={14} color="text.secondary" sx={{ flex: 3 }}>
                        {tax.tax_assessment}
                      </Typography>
                      <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                        {tax.land}
                      </Typography>
                      <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                        {tax.improvement}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {homeDetails.price_history && (
          <Grid item xs={12} sm={6}>
            <Card className='max-h-[300px] h-full overflow-y-auto'>
              <CardContent>
                <Typography fontSize={14} sx={{ marginBottom: 0 }} fontWeight={600}>
                  Price History
                </Typography>
                <Box mt={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography fontSize={14} sx={{ flex: 3 }}>
                      Date
                    </Typography>
                    <Typography fontSize={14} sx={{ flex: 2 }}>
                      Status
                    </Typography>
                    <Typography fontSize={14} sx={{ flex: 2 }}>
                      Price
                    </Typography>
                    <Typography fontSize={14} sx={{ flex: 2 }}>
                      Change
                    </Typography>
                    <Typography fontSize={14} sx={{ flex: 2 }}>
                      Sq Ft Price
                    </Typography>
                  </Box>
                  {homeDetails.price_history.map((price, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography fontSize={14} color="text.secondary" sx={{ flex: 3 }}>
                        {price.date}
                      </Typography>
                      <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                        {price.event}
                      </Typography>
                      <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                        {price.price}
                      </Typography>
                      <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                        {price.change}
                      </Typography>
                      <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                        {price.sq_ft_price}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {homeDetails.deed_history && (
          <Grid item xs={12} sm={6}>
            <Card className='max-h-[300px] h-full overflow-y-auto'>
              <CardContent>
                <Typography fontSize={14} sx={{ marginBottom: 0 }} fontWeight={600}>
                  Deed History
                </Typography>
                <Box mt={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography fontSize={14} sx={{ flex: 2 }}>
                      Date
                    </Typography>
                    <Typography fontSize={14} sx={{ flex: 2 }}>
                      Type
                    </Typography>
                    <Typography fontSize={14} sx={{ flex: 2 }}>
                      Price
                    </Typography>
                    <Typography fontSize={14} sx={{ flex: 2 }}>
                      Title Company
                    </Typography>
                  </Box>
                  {homeDetails.deed_history.map((deed, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                        {deed.date}
                      </Typography>
                      <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                        {deed.type}
                      </Typography>
                      <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                        {deed.sale_price}
                      </Typography>
                      <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                        {deed.title_company}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {homeDetails.mortgage_history && (
          <Grid item xs={12} sm={6} className='h-[400px]'>
            <Card className='max-h-[300px] h-full overflow-y-auto'>
              <CardContent>
                <Typography fontSize={14} sx={{ marginBottom: 0 }} fontWeight={600}>
                  Mortgage History
                </Typography>
                <Box mt={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography fontSize={14} sx={{ flex: 2 }}>
                      Date
                    </Typography>
                    <Typography fontSize={14} sx={{ flex: 2 }}>
                      Status
                    </Typography>
                    <Typography fontSize={14} sx={{ flex: 2 }}>
                      Loan Amount
                    </Typography>
                    <Typography fontSize={14} sx={{ flex: 2 }}>
                      Loan Type
                    </Typography>
                  </Box>
                  {homeDetails.mortgage_history.map((mortgage, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                        {mortgage.date}
                      </Typography>
                      <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                        {mortgage.status}
                      </Typography>
                      <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                        {mortgage.loan_amount}
                      </Typography>
                      <Typography fontSize={14} color="text.secondary" sx={{ flex: 2 }}>
                        {mortgage.loan_type}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default HouseScore