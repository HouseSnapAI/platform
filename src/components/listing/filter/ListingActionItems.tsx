// ** Next Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import { IconLock, IconSparkles} from '@tabler/icons-react'

// ** Types
import { ListingType, User } from '@/utils/types'

// ** Custom Components
import PricingPaymentComponent from '@/components/reports/pricing/PricingPageComponent'
import ReportPage from '@/components/reports/ReportPage'
import { checkReportByListing } from '@/utils/db'
import Button from '@mui/material/Button'

// ** Style Imports
import { useTheme } from '@mui/material/styles'

type ListingActionItemProps = {
    userInfo: User | null
    listing: ListingType | 'loading' | null
}

const ListingActionItems = ({userInfo, listing}: ListingActionItemProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const [reportOpen, setReportOpen] = useState<boolean>(false)
    const [reportExists, setReportExists] = useState<{valid: boolean|null, data: any}>({valid: null, data: null})

    const theme = useTheme()

    const handleReportClick = () => {
        if(reportExists.valid){
            window.open(`/report/${reportExists.data.listing_id}`, '_blank')
            setOpen(false)
            setReportOpen(false)
        } else if(userInfo && userInfo?.reports_remaining > 0 && reportExists.valid == false){
            // console.log('report clicked')
            setReportOpen(true)
        } else {
            // console.log('no reports remaining')
            setOpen(true)
        }
    }

    useEffect(() => {
        const checkReportExists = async () => {
            if(listing != 'loading' && listing != null && userInfo != null){
                const res = await checkReportByListing(listing?.id as string, userInfo?.id as string)
                setReportExists(res)
                // console.log("RES",res)
            }
        }

        checkReportExists()
    }, [listing])

  return (
<>
        <Button disabled={reportExists.valid == null} className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-[10px] py-[5px] shadow-md rounded-sm cursor-pointer hover:scale-[1.05] hover:shadow-xl transition-all ease-in-out duration-500 flex items-center justify-center gap-[3px]' onClick={handleReportClick} sx={{textTransform: 'none'}}>
        <Typography fontSize={14} className='text-[#ffffff]' >SnapShot</Typography>
        <IconSparkles className='w-[18px]' color={theme.palette.text.primary} />
        
        </Button>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <PricingPaymentComponent userId={userInfo?.id as string} />
        </Modal>
        {listing != 'loading' && listing != null && userInfo != null ? <ReportPage listing={listing} open={reportOpen} setOpen={setReportOpen} userInfo={userInfo as User} /> : null}

    </>

  )
}

export default ListingActionItems