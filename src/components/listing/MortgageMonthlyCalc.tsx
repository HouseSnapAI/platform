// ** Next Imports
import { useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// ** Chart Imports
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// ** Type Imports
import { ListingType } from '@/utils/types';

ChartJS.register(ArcElement, Tooltip, Legend);

const MortgageMonthlyCalc = ({ listing }: { listing: ListingType }) => {
  const [principal, setPrincipal] = useState(listing.list_price);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const calculateMortgage = () => {
    const loanAmount = principal - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    setMonthlyPayment(monthlyPayment);
  };

  const data = {
    labels: ['Principal & Interest', 'Taxes & Insurance'],
    datasets: [
      {
        data: [monthlyPayment, monthlyPayment * 0.25],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: '#1e1e1e', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ color: 'white', marginBottom: 2 }}>
        Mortgage Calculator
      </Typography>
      <TextField
        label="Principal"
        type="number"
        fullWidth
        value={principal}
        onChange={(e) => setPrincipal(Number(e.target.value))}
        sx={{ marginBottom: 2 }}
        InputLabelProps={{ style: { color: 'white' } }}
        InputProps={{ style: { color: 'white' } }}
      />
      <TextField
        label="Down Payment"
        type="number"
        fullWidth
        value={downPayment}
        onChange={(e) => setDownPayment(Number(e.target.value))}
        sx={{ marginBottom: 2 }}
        InputLabelProps={{ style: { color: 'white' } }}
        InputProps={{ style: { color: 'white' } }}
      />
      <TextField
        label="Interest Rate (%)"
        type="number"
        fullWidth
        value={interestRate}
        onChange={(e) => setInterestRate(Number(e.target.value))}
        sx={{ marginBottom: 2 }}
        InputLabelProps={{ style: { color: 'white' } }}
        InputProps={{ style: { color: 'white' } }}
      />
      <TextField
        label="Loan Term (years)"
        type="number"
        fullWidth
        value={loanTerm}
        onChange={(e) => setLoanTerm(Number(e.target.value))}
        sx={{ marginBottom: 2 }}
        InputLabelProps={{ style: { color: 'white' } }}
        InputProps={{ style: { color: 'white' } }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={calculateMortgage}
        sx={{ marginBottom: 2 }}
      >
        Calculate
      </Button>
      {monthlyPayment > 0 && (
        <>
          <Typography variant="h6" sx={{ color: 'white', marginBottom: 2 }}>
            Monthly Payment: ${monthlyPayment.toFixed(2)}
          </Typography>
          <Pie data={data} />
        </>
      )}
    </Box>
  );
};

export default MortgageMonthlyCalc;