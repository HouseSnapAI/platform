// ** Next Imports
import {useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Popover from '@mui/material/Popover'

// ** Icons Imports
import { IconChevronDown } from '@tabler/icons-react'

// ** Style Imports
import { useTheme } from '@mui/material/styles'

// ** Types Imports
import { User } from '@/utils/types'
import Typography from '@mui/material/Typography'

// ** Custom Component Imports
import FilterPopup from './FilterPopup'

const Filter = ({userInfo, setUserInfo}:{userInfo: User, setUserInfo: (userInfo: User) => void}) => {
    
    const theme = useTheme()

    type FilterType = 'budget' | 'location' | 'beds' | 'baths' | 'propertyType' | 'houseSize' | 'none'

    const [budget, setBudget] = useState<[number, number]>([userInfo?.min_budget || 0, userInfo?.max_budget || 5000000])
    const [location, setLocation] = useState<string>(userInfo?.location?.[0] || '')
    const [beds, setBeds] = useState<number>(userInfo?.beds || 0)
    const [baths, setBaths] = useState<number>(userInfo?.baths || 0)
    const [propertyType, setPropertyType] = useState<string>(userInfo?.property_types?.[0] || '')
    const [houseSize, setHouseSize] = useState<[number, number]>([userInfo?.min_size_of_house || 0, userInfo?.max_size_of_house || 5000])

    const [popupActive, setPopupActive] = useState<FilterType>('none')
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, type: FilterType) => {
        setAnchorEl(event.currentTarget);
        setPopupActive(popupActive === type ? 'none' : type);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setPopupActive('none');
    };

    return (
        <Box className="h-[40px] rounded-lg px-4 flex items-center justify-center overflow-x-auto scrollbar-hide">
            <Box className="flex items-center justify-center gap-4 min-w-max">
                <Button
                    onClick={(e) => handleClick(e, 'propertyType')}
                    className="flex flex-row items-center justify-center hover:text-white whitespace-nowrap"
                    sx={{textTransform: 'none', fontSize: '10px', color: theme.palette.text.secondary, minWidth: 'auto', padding: '4px 8px'}}
                    variant="outlined"
                    endIcon={<IconChevronDown size={12} />}
                    size="small"
                >
                    <Typography fontSize={10} noWrap>Property Type</Typography>
                </Button>
                <Button
                    onClick={(e) => handleClick(e, 'budget')}
                    className="flex flex-row items-center justify-center hover:text-white whitespace-nowrap"
                    sx={{textTransform: 'none', fontSize: '10px', color: theme.palette.text.secondary, minWidth: 'auto', padding: '4px 8px'}}
                    variant="outlined"
                    endIcon={<IconChevronDown size={12} />}
                    size="small"
                >
                    <Typography fontSize={10} noWrap>Price</Typography>
                </Button>
                <Button
                    onClick={(e) => handleClick(e, 'beds')}
                    className="flex flex-row items-center justify-center hover:text-white whitespace-nowrap"
                    sx={{textTransform: 'none', fontSize: '10px', color: theme.palette.text.secondary, minWidth: 'auto', padding: '4px 8px'}}
                    variant="outlined"
                    endIcon={<IconChevronDown size={12} />}
                    size="small"
                >
                    <Typography fontSize={10} noWrap>Beds</Typography>
                </Button>
                <Button
                    onClick={(e) => handleClick(e, 'baths')}
                    className={"flex flex-row items-center justify-center hover:text-white whitespace-nowrap " + (popupActive === 'baths' ? 'bg-white text-black' : '')}
                    sx={{textTransform: 'none', fontSize: '10px', color: theme.palette.text.secondary, minWidth: 'auto', padding: '4px 8px'}}
                    variant="outlined"
                    endIcon={<IconChevronDown size={12} />}
                    size="small"
                >
                    <Typography fontSize={10} noWrap>Baths</Typography>
                </Button>
                <Button
                    onClick={(e) => handleClick(e, 'location')}
                    className="flex flex-row items-center justify-center hover:text-white whitespace-nowrap"
                    sx={{textTransform: 'none', fontSize: '10px', color: theme.palette.text.secondary, minWidth: 'auto', padding: '4px 8px'}}
                    variant="outlined"
                    endIcon={<IconChevronDown size={12} />}
                    size="small"
                >
                    <Typography fontSize={10} noWrap>Location</Typography>
                </Button>
                <Button
                    onClick={(e) => handleClick(e, 'houseSize')}
                    className="flex flex-row items-center justify-center hover:text-white whitespace-nowrap"
                    sx={{textTransform: 'none', fontSize: '10px', color: theme.palette.text.secondary, minWidth: 'auto', padding: '4px 8px'}}
                    variant="outlined"
                    endIcon={<IconChevronDown size={12} />}
                    size="small"
                >
                    <Typography fontSize={10} noWrap>House Size</Typography>
                </Button>
            </Box>

            <FilterPopup
                type={popupActive}
                // @ts-ignore
                anchorEl={anchorEl || undefined}
                open={popupActive !== 'none'}
                onClose={handleClose}
                value={
                    popupActive === 'budget' ? budget :
                    popupActive === 'location' ? location :
                    popupActive === 'beds' ? beds :
                    popupActive === 'baths' ? baths :
                    popupActive === 'propertyType' ? propertyType :
                    popupActive === 'houseSize' ? houseSize :
                    null
                }
                setValue={
                    popupActive === 'budget' ? setBudget :
                    popupActive === 'location' ? setLocation :
                    popupActive === 'beds' ? setBeds :
                    popupActive === 'baths' ? setBaths :
                    popupActive === 'propertyType' ? setPropertyType :
                    popupActive === 'houseSize' ? setHouseSize :
                    () => {}
                }
            />
        </Box>
    )
}

export default Filter