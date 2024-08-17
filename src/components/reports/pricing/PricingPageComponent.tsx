// ** Next Imports
import React, { useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import { IconMessage, IconFile, IconSparkles, IconArrowGuide, IconSearch, IconUser } from '@tabler/icons-react'; // Example icons, replace with actual icons
import { IconCash, Icon360View, IconChartArcs, IconChartArcs3, IconShoppingBag, IconCashBanknote, IconChartArrows, IconBuildingCommunity, IconTree, IconCar, IconSchool, IconMoodAngryFilled, IconLeaf } from '@tabler/icons-react'; // Example icons, replace with actual icons

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
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          overflowY: 'auto',
        }}
      >
        <Typography variant="h4" gutterBottom>
          What is a HouseSnap?
        </Typography>
        <Typography variant="body1" gutterBottom>
          HouseSnap is a comprehensive real estate snapshot that provides detailed insights and analysis about a property. <a href="https://example.com">See an example HouseSnap</a>.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Key Features:
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconMessage size={24} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Real-Time Chat with Your SnapShot
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconFile size={24} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Organized, Actionable Data (Easy to Digest)
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconSparkles size={24} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            AI-Enhanced, Highly Interactive SnapShots
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconArrowGuide size={24} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Guided SnapShot Walkthrough
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconSearch size={24} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Access to HomeSnap Qualified Local Experts
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconUser size={24} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Expert Human Augmentation on Reports
          </Typography>
        </Box>

        <StripePricingTable userId={userId} />

        <Typography variant="h5" gutterBottom>
          Every House SnapShot Report Includes:
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconCash size={24} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Comprehensive Cash Reserve Analysis
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Icon360View size={24} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Detailed Cash Flow Insights
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconChartArcs size={24} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Depreciation Tracking Report
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconChartArcs3 size={24} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Appreciation Growth Report
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconShoppingBag size={24} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            In-Depth Market Trend Analysis
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconCashBanknote size={24} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Economic Overview (Neighborhood & National Financials)
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconChartArrows size={24} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Home Valuation Report with Area Comparisons
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconBuildingCommunity size={24} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Demographic Insights Report
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconTree size={24} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Local Amenities Overview
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconCar size={24} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Transportation Accessibility Report
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconSchool size={24} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            School Performance Report
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconMoodAngryFilled size={24} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Crime Statistics Report
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconLeaf size={24} />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Environmental Impact Report
          </Typography>
        </Box>
      </Box>
  )
}

export default PricingPaymentComponent