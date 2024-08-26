// ** Next Imports
import React, { useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import { IconMessage, IconFile, IconSparkles, IconArrowGuide, IconSearch, IconUser } from '@tabler/icons-react';
import { IconCash, Icon360View, IconChartArcs, IconChartArcs3, IconShoppingBag, IconCashBanknote, IconChartArrows, IconBuildingCommunity, IconTree, IconCar, IconSchool, IconMoodAngryFilled, IconLeaf } from '@tabler/icons-react';

const StripePricingTable = ({userId}: {userId: string}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return React.createElement("stripe-pricing-table", {
    "pricing-table-id": process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID,
    "publishable-key": process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    "client-reference-id": userId, 
  });
};

const PricingPaymentComponent = ({ userId }: { userId: string }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        maxHeight: '90vh',
        bgcolor: '#121212',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflowY: 'auto',
        color: '#fff',
      }}
    >
      <Typography fontSize={16} fontWeight={600} mb={2} sx={{ color: 'text.primary' }}>
        What is a HouseSnap?
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ color: 'text.secondary' }}>
        HouseSnap is a comprehensive real estate snapshot that provides detailed insights and analysis about a property. <a href="https://example.com" style={{ color: '#BB86FC' }}>See an example HouseSnap</a>.
      </Typography>

      <Typography fontSize={14} fontWeight={600} mb={2} sx={{ color: 'text.primary' }}>
        Key Features:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconMessage size={14} stroke={1.5} />
            <Typography variant="body1" sx={{ ml: 1, fontSize: 14, color: 'text.primary' }}>
              Real-Time Chat with Your SnapShot
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconFile size={14} stroke={1.5} />
            <Typography variant="body1" sx={{ ml: 1, fontSize: 14, color: 'text.primary' }}>
              Organized, Actionable Data (Easy to Digest)
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconSparkles size={14} stroke={1.5} />
            <Typography variant="body1" sx={{ ml: 1, fontSize: 14, color: 'text.primary' }}>
              AI-Enhanced, Highly Interactive SnapShots
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconArrowGuide size={14} stroke={1.5} />
            <Typography variant="body1" sx={{ ml: 1, fontSize: 14, color: 'text.primary' }}>
              Guided SnapShot Walkthrough
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconSearch size={14} stroke={1.5} />
            <Typography variant="body1" sx={{ ml: 1, fontSize: 14, color: 'text.primary' }}>
              Access to HomeSnap Qualified Local Experts
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconUser size={14} stroke={1.5} />
            <Typography variant="body1" sx={{ ml: 1, fontSize: 14, color: 'text.primary' }}>
              Expert Human Augmentation on Reports
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <StripePricingTable userId={userId} />

      <Typography fontSize={14} fontWeight={600} mb={2} sx={{ color: 'text.primary' }}>
        Every House SnapShot Report Includes:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconCash size={14} stroke={1.5} />
            <Typography variant="body1" sx={{ ml: 1, fontSize: 14, color: 'text.primary' }}>
              Comprehensive Cash Reserve Analysis
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Icon360View size={14} stroke={1.5} />
            <Typography variant="body1" sx={{ ml: 1, fontSize: 14, color: 'text.primary' }}>
              Detailed Cash Flow Insights
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconChartArcs size={14} stroke={1.5} />
            <Typography variant="body1" sx={{ ml: 1, fontSize: 14, color: 'text.primary' }}>
              Depreciation Tracking Report
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconChartArcs3 size={14} stroke={1.5} />
            <Typography variant="body1" sx={{ ml: 1, fontSize: 14, color: 'text.primary' }}>
              Appreciation Growth Report
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconShoppingBag size={14} stroke={1.5} />
            <Typography variant="body1" sx={{ ml: 1, fontSize: 14, color: 'text.primary' }}>
              In-Depth Market Trend Analysis
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconCashBanknote size={14} stroke={1.5} />
            <Typography variant="body1" sx={{ ml: 1, fontSize: 14, color: 'text.primary' }}>
              Economic Overview (Neighborhood & National Financials)
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconChartArrows size={14} stroke={1.5} />
            <Typography variant="body1" sx={{ ml: 1, fontSize: 14, color: 'text.primary' }}>
              Home Valuation Report with Area Comparisons
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconBuildingCommunity size={14} stroke={1.5} />
            <Typography variant="body1" sx={{ ml: 1, fontSize: 14, color: 'text.primary' }}>
              Demographic Insights Report
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconTree size={14} stroke={1.5} />
            <Typography variant="body1" sx={{ ml: 1, fontSize: 14, color: 'text.primary' }}>
              Local Amenities Overview
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconCar size={14} stroke={1.5} />
            <Typography variant="body1" sx={{ ml: 1, fontSize: 14, color: 'text.primary' }}>
              Transportation Accessibility Report
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconSchool size={14} stroke={1.5} />
            <Typography variant="body1" sx={{ ml: 1, fontSize: 14, color: 'text.primary' }}>
              School Performance Report
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconMoodAngryFilled size={14} stroke={1.5} />
            <Typography variant="body1" sx={{ ml: 1, fontSize: 14, color: 'text.primary' }}>
              Crime Statistics Report
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconLeaf size={14} stroke={1.5} />
            <Typography variant="body1" sx={{ ml: 1, fontSize: 14, color: 'text.primary' }}>
              Environmental Impact Report
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PricingPaymentComponent