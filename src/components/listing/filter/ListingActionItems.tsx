// ** Next Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Icon Imports
import { IconLock, IconSparkles, IconUser } from '@tabler/icons-react'

// ** Types
import { ListingType, User } from '@/utils/types'
import PricingPaymentComponent from '@/components/reports/pricing/PricingPageComponent'
import { Modal, Typography } from '@mui/material'

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
    <>
        <Box className='bg-gradient-to-r from-purple-400 via-pink-500 fade-in-on-scroll to-red-500 px-[10px] py-[5px] shadow-md rounded-sm cursor-pointer hover:scale-[1.05] hover:shadow-xl transition-all ease-in-out duration-200 flex items-center justify-center gap-[3px]' onClick={handleReportClick}>
        <Typography fontSize={14} className='text-[#ffffff]' >SnapShot</Typography>
        <IconLock className='w-[18px]' />
        
        </Box>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <PricingPaymentComponent userId={userInfo?.id as string} />
        </Modal>
    </>

  )
}

export default ListingActionItems