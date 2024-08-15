// ** Next Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Icon Imports
import { IconSparkles, IconUser } from '@tabler/icons-react'

// ** Types
import { ListingType, User } from '@/utils/types'
import PricingPaymentComponent from '@/components/reports/pricing/PricingPageComponent'

type ListingActionItemProps = {
    userInfo: User | null
    listing: ListingType | 'loading' | null
}

const ListingActionItems = ({userInfo, listing}: ListingActionItemProps) => {
    const [open, setOpen] = useState<boolean>(false)

    const handleReportClick = () => {
        if(userInfo && userInfo?.reports_remaining > 0){
            console.log('report clicked')
        } else {
            console.log('no reports remaining')
            setOpen(true)
        }
            

    }

  return (
    <Box className="h-[40px] w-full rounded-lg px-2 flex items-center justify-between gap-2 mb-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <Button 
            variant="contained" 
            onClick={handleReportClick}
            className="bg-green-500 hover:bg-green-700 text-white text-transform-none"
            sx={{textTransform: 'none'}}
            startIcon={<IconSparkles color='white' stroke={1.5} />}
            >
            Get a SnapShot
        </Button>
        <Button 
            variant="contained" 
            onClick={()=>null}
            className="bg-blue-500 hover:bg-blue-700 text-white text-transform-none"
            sx={{textTransform: 'none'}}
            startIcon={<IconUser color='white' stroke={1.5} />}
            >
            Get Connected to a local Expert
        </Button>
        <PricingPaymentComponent open={open} setOpen={setOpen} userId={userInfo?.id as string} />
    </Box> 

  )
}

export default ListingActionItems