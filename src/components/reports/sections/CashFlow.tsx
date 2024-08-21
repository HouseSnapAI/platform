// ** Next Imports
import React from 'react'

// ** Types
import { ListingType, Report } from '@/utils/types';

type CashFlowProps = {
  data: Report;
  listing: ListingType;
}

const CashFlow = ({data, listing}: CashFlowProps) => {
  return (
    <div>CashFlow</div>
  )
}

export default CashFlow