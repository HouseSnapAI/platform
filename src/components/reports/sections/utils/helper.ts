import { loansAdjustment } from './vars';
import { supabase } from '@/supabase/client';

export async function mortgageCalc(listPrice: number, hoaFees: number, creditScore: number, downpayment: number) {
    const loanAmount = listPrice - downpayment;
    const ltv = (loanAmount / listPrice) * 100;

    const data = loansAdjustment;

    let llpaAdjustment = 0.0;
    let creditData: any;

    if (creditScore >= 780) {
        creditData = data["Purchase_Money_Loans_LLPA_by_Credit_Score_LTV_Ratio"][">= 780"];
    } else if (creditScore >= 760) {
        creditData = data["Purchase_Money_Loans_LLPA_by_Credit_Score_LTV_Ratio"]["760 - 779"];
    } else if (creditScore >= 740) {
        creditData = data["Purchase_Money_Loans_LLPA_by_Credit_Score_LTV_Ratio"]["740 - 759"];
    } else if (creditScore >= 720) {
        creditData = data["Purchase_Money_Loans_LLPA_by_Credit_Score_LTV_Ratio"]["720 - 739"];
    } else if (creditScore >= 700) {
        creditData = data["Purchase_Money_Loans_LLPA_by_Credit_Score_LTV_Ratio"]["700 - 719"];
    } else if (creditScore >= 680) {
        creditData = data["Purchase_Money_Loans_LLPA_by_Credit_Score_LTV_Ratio"]["680 - 699"];
    } else if (creditScore >= 660) {
        creditData = data["Purchase_Money_Loans_LLPA_by_Credit_Score_LTV_Ratio"]["660 - 679"];
    } else if (creditScore >= 640) {
        creditData = data["Purchase_Money_Loans_LLPA_by_Credit_Score_LTV_Ratio"]["640 - 659"];
    } else {
        creditData = data["Purchase_Money_Loans_LLPA_by_Credit_Score_LTV_Ratio"]["< 639"];
    }

    if (ltv <= 30) {
        llpaAdjustment = parseFloat(creditData["<= 30.00%"].replace('%', '')) / 100;
    } else if (ltv <= 60) {
        llpaAdjustment = parseFloat(creditData["30.01% - 60.00%"].replace('%', '')) / 100;
    } else if (ltv <= 70) {
        llpaAdjustment = parseFloat(creditData["60.01% - 70.00%"].replace('%', '')) / 100;
    } else if (ltv <= 75) {
        llpaAdjustment = parseFloat(creditData["70.01% - 75.00%"].replace('%', '')) / 100;
    } else if (ltv <= 80) {
        llpaAdjustment = parseFloat(creditData["75.01% - 80.00%"].replace('%', '')) / 100;
    } else if (ltv <= 85) {
        llpaAdjustment = parseFloat(creditData["80.01% - 85.00%"].replace('%', '')) / 100;
    } else if (ltv <= 90) {
        llpaAdjustment = parseFloat(creditData["85.01% - 90.00%"].replace('%', '')) / 100;
    } else if (ltv <= 95) {
        llpaAdjustment = parseFloat(creditData["90.01% - 95.00%"].replace('%', '')) / 100;
    } else {
        llpaAdjustment = parseFloat(creditData["> 95.00%"].replace('%', '')) / 100;
    }


    const { data: response } = await supabase
        .from('mortgage_30')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .single();

    const adjustedAnnualRate = response.mortgage30us + llpaAdjustment;
    const monthlyRate = adjustedAnnualRate / 100 / 12;
    const n = 30 * 12;

    const monthlyMortgagePayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);

    const lowerEndTax = (0.01 * listPrice) / 12;
    const upperEndTax = (0.02 * listPrice) / 12;

    const estimatedMonthlyPaymentLower = monthlyMortgagePayment + hoaFees + lowerEndTax;
    const estimatedMonthlyPaymentUpper = monthlyMortgagePayment + hoaFees + upperEndTax;

    return {
        monthlyMortgagePayment,
        estimatedMonthlyPaymentLower,
        estimatedMonthlyPaymentUpper
    };
}