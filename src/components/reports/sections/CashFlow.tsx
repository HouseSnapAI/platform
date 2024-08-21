import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { mortgageCalc } from './utils/helper';
import { ListingType, Report, RentCashFlow } from '@/utils/types';

type CashFlowProps = {
  data: Report;
  listing: ListingType;
};

const CashFlow = ({ data, listing }: CashFlowProps) => {
  const [creditScore, setCreditScore] = useState<number>(0);
  const [downpayment, setDownpayment] = useState<number>(0);
  const [cashFlow, setCashFlow] = useState<any>(null);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const handleCalculate = async () => {
    const { monthlyMortgagePayment } = await mortgageCalc(listing.list_price, listing.hoa_fee || 0, creditScore, downpayment);
    setMonthlyPayment(monthlyMortgagePayment);

    const rentCashFlow: RentCashFlow = JSON.parse(data.rent_cash_flow);
    const estimatedCashFlow = rentCashFlow.estimated_rent * 0.5 - monthlyMortgagePayment;
    setCashFlow({ ...rentCashFlow, estimatedCashFlow });
  };

  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">Cash Flow</Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                label="Credit Score"
                type="number"
                fullWidth
                value={creditScore}
                onChange={(e) => setCreditScore(Number(e.target.value))}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Downpayment"
                type="number"
                fullWidth
                value={downpayment}
                onChange={(e) => setDownpayment(Number(e.target.value))}
                sx={{ marginBottom: 2 }}
              />
              <Button variant="contained" color="primary" fullWidth onClick={handleCalculate}>
                Calculate
              </Button>
            </Box>
            {cashFlow && (
              <Box mt={2}>
                <Typography variant="body1">Estimated Rent: ${cashFlow.estimated_rent}</Typography>
                <Typography variant="body1">50% Rule: ${cashFlow.fifty_pct_rule}</Typography>
                <Typography variant="body1">Rent per Sqft: ${cashFlow.rent_per_sqft}</Typography>
                <Typography variant="body1">Rent per Lot Sqft: ${cashFlow.rent_per_lot_sqft}</Typography>
                <Typography variant="body1">Basis Number: ${cashFlow.basis_number}</Typography>
                <Typography variant="body1">Estimated Cash Flow: ${cashFlow.estimatedCashFlow}</Typography>
                {monthlyPayment && <Typography variant="body1">Monthly Mortgage Payment: ${monthlyPayment.toFixed(2)}</Typography>}
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CashFlow;