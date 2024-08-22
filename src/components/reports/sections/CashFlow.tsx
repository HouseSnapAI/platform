// ** Next Imports
import { useState, useEffect } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';

// ** Types Imports
import { ListingType, Report, RentCashFlow } from '@/utils/types';

// ** Style Imports
import { useTheme } from '@mui/material/styles';

// ** Custom Imports
import { mortgageCalc } from './utils/helper';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import { IconBrandPushbullet, IconChevronDown, IconChevronRight, IconChevronUp, IconInfoCircle, IconLine, IconLineDashed } from '@tabler/icons-react';

type CashFlowProps = {
  data: Report;
  listing: ListingType;
};

const CashFlow = ({ data, listing }: CashFlowProps) => {
  // Initialize theme
  const theme = useTheme();

  // State variables for various inputs and calculations
  const [creditScore, setCreditScore] = useState<number>(760);
  const [downpayment, setDownpayment] = useState<number>(20);
  const [listingPrice, setListingPrice] = useState<number>(listing.list_price);
  const [propertyManagerCost, setPropertyManagerCost] = useState<number>(1.2);
  const [isPercentage, setIsPercentage] = useState<boolean>(false);
  const [isPMPercentage, setPMIsPercentage] = useState<boolean>(false);
  const [cashFlow, setCashFlow] = useState<any>({...JSON.parse(data.rent_cash_flow), estimatedCashFlow: 0});
  const [monthlyPayment, setMonthlyPayment] = useState<number|null>(null);
  const [taxRange, setTaxRange] = useState<number[]>([listing.list_price * 0.01 / 12, listing.list_price * 0.02 / 12]);

  // Function to handle the calculation of mortgage and cash flow
  const handleCalculate = async () => {
    const downpaymentValue = isPercentage ? (downpayment / 100) * listing.list_price : downpayment;
    const { monthlyMortgagePayment, lowerEndTax, upperEndTax } = await mortgageCalc(listing.list_price, creditScore, downpaymentValue);
    setMonthlyPayment(monthlyMortgagePayment);
    setTaxRange([lowerEndTax, upperEndTax]);

    const hoaFee = (listing.hoa_fee && listing.hoa_fee > 0) ? listing.hoa_fee : 0;
    const propertyManagerCostValue = isPMPercentage ? (propertyManagerCost / 100) * cashFlow.estimated_rent : propertyManagerCost;
    const estimatedCashFlow = cashFlow.estimated_rent - monthlyMortgagePayment - (taxRange[0]+taxRange[1])/2 - hoaFee - propertyManagerCostValue - (0.01 * listing.list_price/12);
    setCashFlow({ ...cashFlow, estimatedCashFlow });
  };

  // Effect to calculate values on component mount
  useEffect(() => {
    handleCalculate();
  }, [downpayment, propertyManagerCost, listingPrice, creditScore]);

  // Effect to update downpayment based on percentage toggle
  useEffect(() => {
    const downpaymentValue = !isPercentage ? (downpayment / 100) * listing.list_price : downpayment/listing.list_price * 100;
    setDownpayment(parseFloat(downpaymentValue.toFixed(2))); // Ensure two decimal places
  }, [isPercentage]);

  // Effect to update property manager cost based on percentage toggle
  useEffect(() => {
    const propertyManagerCostValue = !isPMPercentage ? (propertyManagerCost / 100) * cashFlow.estimated_rent : propertyManagerCost/cashFlow.estimated_rent * 100;
    setPropertyManagerCost(parseFloat(propertyManagerCostValue.toFixed(2))); // Ensure two decimal places
  }, [isPMPercentage]);

  // Function to handle input changes
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>, isCurrency: boolean) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = isCurrency ? /^\d*\.?\d{0,2}$/ : /^\d*\.?\d{0,2}$/; // Allow up to two decimal places
    if (regex.test(value)) {
      const numericValue = Number(value);
      setter(numericValue); // No need to use parseFloat or toFixed here
    }
  };

  // Function to handle slider changes
  const handleSliderChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: Event, value: number | number[]) => {
    setter(value as number);
  };

  return (
    <Grid container spacing={2} p={2} className="transition-all ease-in-out duration-500" sx={{ '& .MuiInputBase-input': { paddingRight: "4px", paddingLeft: "4px", paddingTop: "2px", paddingBottom: "2px" } }}>
      {/* Cash Flow Input Section */}
      <Grid item xs={4}>
        <Card>
          <CardContent className="transition-all ease-in-out duration-300 relative">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography fontSize={14} fontWeight={600} sx={{ margin: 0 }}>
                Cash Flow
              </Typography>
              <Tooltip title={`Calculated using up to date Mortgage Prime Rates.`}>
                <IconInfoCircle color="#6f6f6f" className="absolute top-5 right-4" size={14} style={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
            <Typography fontSize={14} color="text.secondary" sx={{ marginBottom: 2 }}>
              Calculated from inputted property details.
            </Typography>

            <Box component="form" noValidate autoComplete="off">
              <Box className="flex justify-between gap-6">
                {/* Credit Score Input */}
                <Box flex={1}>
                  <Typography fontSize={14} color="text.secondary" sx={{ marginBottom: 1 }}>
                    Credit Score: <span className="text-white font-semibold">{creditScore}</span>
                  </Typography>
                  <Slider
                    value={creditScore}
                    onChange={handleSliderChange(setCreditScore)}
                    min={0}
                    max={850}
                    step={1}
                    valueLabelDisplay="off"
                    sx={{ marginBottom: 2 }}
                  />
                </Box>  
                {/* Listing Price Input */}
                <Box flex={1}>
                  <Typography fontSize={14} color="text.secondary" sx={{ marginBottom: 1 }}>
                    Listing Price
                  </Typography>
                  <TextField
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      style:{fontSize: 14}
                    }}
                    size="small"
                    fullWidth
                    value={listingPrice}
                    onChange={handleInputChange(setListingPrice, true)}
                    sx={{ marginBottom: 2 }}
                  />
                </Box>  
              </Box>
              {/* Property Manager Cost Input */}
              <Box className="flex flex-col">
                <Box className="flex gap-2 items-center justify-between">
                  <Typography fontSize={14} color="text.secondary" className="flex items-center gap-2" sx={{ marginBottom: 1 }}>
                    Property Manager Cost 
                    <Tooltip title={`Percentage/Amount of Montly Rent`}>
                      <IconInfoCircle color="#6f6f6f" className="" size={14} style={{ cursor: 'pointer' }} />
                    </Tooltip>
                  </Typography>
                  <Box className="flex rounded-md w-min mb-2 mt-2" sx={{ backgroundColor: 'black'}}>
                    <Box fontSize={12} fontWeight={600} sx={{ margin: 0 }} className={`${isPMPercentage ? 'bg-[#6f6f6f] text-white' : 'bg-transparent text-[#6f6f6f]'} px-2 py-1 rounded-md cursor-pointer transition-all ease-in-out duration-200`} onClick={() => setPMIsPercentage(true)}>  Percentage</Box>
                    <Box fontSize={12} fontWeight={600} sx={{ margin: 0 }} className={`${isPMPercentage ? 'bg-transparent text-[#6f6f6f]' : 'bg-[#6f6f6f] text-white'} px-2 py-1 rounded-md cursor-pointer transition-all ease-in-out duration-200`} onClick={() => setPMIsPercentage(false)}> Amount</Box>
                  </Box>
                </Box>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{isPMPercentage ? '%' : '$'}</InputAdornment>,
                    style:{fontSize: 14}
                  }}
                  value={propertyManagerCost}
                  onChange={handleInputChange(setPropertyManagerCost, !isPMPercentage)}
                  sx={{ marginBottom: 2 }}
                />
              </Box>
              {/* Down Payment Cost Input */}
              <Box>
                <Box className="flex gap-2 items-center justify-between mt-2">
                  <Typography fontSize={14} color="text.secondary" className="flex items-center gap-2" sx={{ marginBottom: 1 }}>
                    Down Payment Cost
                    <Tooltip title={`Percentage/Amount of Listing Price`}>
                      <IconInfoCircle color="#6f6f6f" className="" size={14} style={{ cursor: 'pointer' }} />
                    </Tooltip>
                  </Typography>
                  <Box className="flex rounded-md w-min mb-2" sx={{ backgroundColor: 'black'}}>
                    <Box fontSize={12} fontWeight={600} sx={{ margin: 0 }} className={`${isPercentage ? 'bg-[#6f6f6f] text-white' : 'bg-transparent text-[#6f6f6f]'} px-2 py-1 rounded-md cursor-pointer transition-all ease-in-out duration-200`} onClick={() => setIsPercentage(true)}>  Percentage</Box>
                    <Box fontSize={12} fontWeight={600} sx={{ margin: 0 }} className={`${isPercentage ? 'bg-transparent text-[#6f6f6f]' : 'bg-[#6f6f6f] text-white'} px-2 py-1 rounded-md cursor-pointer transition-all ease-in-out duration-200`} onClick={() => setIsPercentage(false)}> Amount</Box>
                  </Box>
                </Box>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{isPercentage ? '%' : '$'}</InputAdornment>,
                    style:{fontSize: 14}
                  }}
                  value={downpayment}
                  onChange={handleInputChange(setDownpayment, !isPercentage)}
                  sx={{ marginBottom: 2 }}
                />
              </Box>
              {/* Calculate Button */}
              <Button variant="contained" color="primary" size="small" className="mt-4" fullWidth onClick={handleCalculate} sx={{ textTransform: 'none' }}>
                Calculate
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      {/* Cash Flow Output Section */}
      <Grid item xs={4}>
        <Card>
          <CardContent className="relative">
            <Tooltip title={`Data collected by analyzing ${cashFlow.basis_number} similar properties in the area.`}>
              <IconInfoCircle color="#6f6f6f" className="absolute top-5 right-4" size={14} style={{ cursor: 'pointer' }} />
            </Tooltip>
            <Typography fontSize={14} fontWeight={600} sx={{ margin: 0 }}>
              Cash Flow
            </Typography>
            <Typography fontSize={14} color="text.secondary" sx={{ marginBottom: 2 }}>
              Calculated from inputted property details.
            </Typography>

            {cashFlow && (
              <Box mt={2}>
                {/* Estimated Rent */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography fontSize={14} >Estimated Rent</Typography>
                  <Typography fontSize={14} className="flex items-center gap-2">
                    <IconChevronUp size={12} color="green" />
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cashFlow.estimated_rent)}
                  </Typography>
                </Box>
                {/* Rent per Sqft */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:1}}>
                  <Typography fontSize={14} color="text.secondary" className="flex items-center mr-2" > 
                    <IconLineDashed size={10} color="#6f6f6f" /> Rent per Sqft
                  </Typography>
                  <Typography fontSize={14} color="text.secondary">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cashFlow.rent_per_sqft)}
                  </Typography>
                </Box>
                {/* Rent per Lot Sqft */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:1 }}>
                  <Typography fontSize={14} color="text.secondary" className="flex items-center" > 
                    <IconLineDashed size={10} color="#6f6f6f" /> Rent per Lot Sqft
                  </Typography>
                  <Typography fontSize={14} color="text.secondary">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cashFlow.rent_per_lot_sqft)}
                  </Typography>
                </Box>
                {/* Estimated Maintenance */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography fontSize={14} >Estimated Maintainance </Typography>
                  <Typography fontSize={14} className="flex items-center gap-2">
                    <IconChevronDown size={12} color="red" />
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(listing.list_price * 0.01/12)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography fontSize={14} >Estimated Property Manager Cost </Typography>
                  <Typography fontSize={14} className="flex items-center gap-2">
                    <IconChevronDown size={12} color="red" />
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(!isPMPercentage ? propertyManagerCost : propertyManagerCost * cashFlow.estimated_rent/100)}
                  </Typography>
                </Box>
                {/* Monthly HOA Fee */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography fontSize={14} >Monthly HOA Fee</Typography>
                  <Typography fontSize={14} className="flex items-center gap-2">
                    <IconChevronDown size={12} color="red" />
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format((listing.hoa_fee && listing.hoa_fee > 0) ? listing.hoa_fee : 0)}
                  </Typography>
                </Box>
                {/* Estimated Property Tax */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography fontSize={14} >Estimated Property Tax</Typography>
                  <Typography fontSize={14} className="flex items-center gap-2">
                    <IconChevronDown size={12} color="red" />
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format((taxRange[0]+taxRange[1])/2)}
                  </Typography>
                </Box>
                {/* Monthly Mortgage Payment */}
                {monthlyPayment && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography fontSize={14} >Monthly Mortgage Payment</Typography>
                    <Typography fontSize={14} className="flex items-center gap-2">
                      <IconChevronDown size={12} color="red" />
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(monthlyPayment)}
                    </Typography>
                  </Box>
                )}
                <Divider className="mb-2" />
                {/* Estimated Cash Flow */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography fontSize={14} >Estimated Cash Flow</Typography>
                  <Typography 
                    fontSize={14} 
                    className="flex items-center gap-2"
                  >
                    {
                        cashFlow.estimatedCashFlow >= 0 ? 
                        <IconChevronUp size={12} color="green" />
                        :
                        <IconChevronDown size={12} color="red" />
                    }
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cashFlow.estimatedCashFlow)}
                  </Typography>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
      {/* Additional Info Section */}
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Additional Info</Typography>
            {/* Add any additional content here */}
          </CardContent>
        </Card>
      </Grid>
      {/* More Details Section */}
      <Grid item xs={8}>
        <Card>
          <CardContent>
            <Typography variant="h6">More Details</Typography>
            {/* Add any additional content here */}
          </CardContent>
        </Card>
      </Grid>
      {/* Summary Section */}
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Summary</Typography>
            {/* Add any additional content here */}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CashFlow;