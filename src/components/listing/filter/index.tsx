// ** Next Imports
import {useState, useEffect} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Popover from '@mui/material/Popover'

// ** Icons Imports
import { IconBath, IconBed, IconChevronDown, IconCurrencyDollar, IconHomeCog, IconMapPin, IconRuler, IconTextSize } from '@tabler/icons-react'

// ** Style Imports
import { useTheme } from '@mui/material/styles'

// ** Types Imports
import { User } from '@/utils/types'
import Typography from '@mui/material/Typography'

// ** Custom Component Imports
import FilterPopup from './FilterPopup'
import React from 'react'

const Filter = ({userInfo, setUserInfo, setIds, setIsLoading, callFunction}:{userInfo: User | null, setUserInfo: (userInfo: User | null) => void, setIds: (ids: string[]) => void, setIsLoading: (isLoading: boolean) => void, callFunction: boolean}) => {
    
    const theme = useTheme()

    type FilterType = 'budget' | 'location' | 'beds' | 'baths' | 'propertyType' | 'houseSize' | 'houseDescription' |  'none'

    const [budget, setBudget] = useState<[number, number]>([userInfo?.min_budget || 0, userInfo?.max_budget || 5000000])
    const [locations, setLocations] = useState<string[]>(userInfo?.location || [])
    const [houseDescription, setHouseDescription] = useState<string>(userInfo?.house_description || '')
    const [beds, setBeds] = useState<number>(userInfo?.beds || 0)
    const [baths, setBaths] = useState<number>(userInfo?.baths || 0)
    const [propertyType, setPropertyType] = useState<string[]>(userInfo?.property_types || [])
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

    
    const updateFilters = async (userPreferences: Partial<User>) => {
        if (userInfo) {
            setIsLoading(true)
            const userPreferences: Partial<User> = {
                min_budget: budget[0],
                max_budget: budget[1],
                location: locations,
                house_description: houseDescription,
                min_size_of_house: houseSize[0],
                max_size_of_house: houseSize[1],
                beds,
                baths,
                property_types: propertyType,
            };

            // Check if any values have changed
            const hasChanges = Object.entries(userPreferences).some(([key, value]) => {
                return JSON.stringify(userInfo[key as keyof User]) !== JSON.stringify(value);
            });

            // console.log(hasChanges)
            // console.log(userPreferences)

            if (hasChanges) {
                try {

                    sessionStorage.setItem('userFilters', JSON.stringify(userPreferences));

                    const updateUser = await fetch('/api/auth/user/update', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({id: userInfo.id, ...userPreferences}),
                    });
                    
                    if (updateUser.status === 200) {
                        setUserInfo({...userInfo, ...userPreferences});
                        localStorage.setItem('userInfo', JSON.stringify({...userInfo, ...userPreferences}));
                        
                        // Listings query
                        const data = await fetch('/api/listing/search-engine/query', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({user: {...userInfo, ...userPreferences}}),
                        });

                        
                        if (data.status !== 200) {
                            // console.log("WORKING")
                            setIds([])
                        } else {
                            const responseData = await data.json()
                            setIds(responseData.listings.map((listing: {listing_id: string, match_score: number}) => listing.listing_id))
                        }
                    } else {
                        console.error('Error updating user preferences');
                    }
                } catch (error) {
                    console.error('Error updating user preferences:', error);
                } 
            }
            setIsLoading(false)
        }
    }
    
    useEffect(() => {
        if (popupActive == 'none') {
            const userPreferences: Partial<User> = {
                min_budget: budget[0],
                max_budget: budget[1],
                location: locations,
                house_description: houseDescription,
                min_size_of_house: houseSize[0],
                max_size_of_house: houseSize[1],
                beds,
                baths,
                property_types: propertyType,
            };
            updateFilters(userPreferences)
        }
    }, [popupActive])

    useEffect(() => {
        if (popupActive == 'none') {
            const getUserFilters = sessionStorage.getItem('userFilters');
            if (getUserFilters) {
                const userPreferences: Partial<User> = JSON.parse(getUserFilters);
                // console.log(userPreferences)
                setBeds(userPreferences.beds || 0)
                setBaths(userPreferences.baths || 0)
                setBudget([userPreferences.min_budget || 0, userPreferences.max_budget || 5000000])
                setLocations(userPreferences.location || [])
                setHouseDescription(userPreferences.house_description || '')
                setHouseSize([userPreferences.min_size_of_house || 0, userPreferences.max_size_of_house || 5000])
                setPropertyType(userPreferences.property_types || [])
                updateFilters(userPreferences)
            }
        }
    }, [callFunction])

    return (
        <Box className="h-[40px] rounded-lg px-4 flex items-center justify-center gap-2 mb-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <Button
                    onClick={(e) => handleClick(e, 'propertyType')}
                    className="flex flex-row items-center justify-center hover:text-white whitespace-nowrap"
                    sx={{textTransform: 'none', fontSize: '10px', color: theme.palette.text.secondary, minWidth: 'auto', padding: '4px 8px', borderColor: theme.palette.text.secondary, borderWidth: '0.5px'}}
                    variant="outlined"
                    endIcon={<IconChevronDown size={14} color={theme.palette.text.primary} />}
                    size="medium"
                >
                    <IconHomeCog size={22} stroke={1} className="hover:text-white" />
                </Button>
                <Button
                    onClick={(e) => handleClick(e, 'budget')}
                    className="flex flex-row items-center justify-center hover:text-white whitespace-nowrap"
                    sx={{textTransform: 'none', fontSize: '10px', color: theme.palette.text.secondary, minWidth: 'auto', padding: '4px 8px', borderColor: theme.palette.text.secondary, borderWidth: '0.5px'}}
                    variant="outlined"
                    endIcon={<IconChevronDown size={14} color={theme.palette.text.primary} />}
                    size="medium"
                >
                    <IconCurrencyDollar size={22} stroke={1} className="hover:text-white" />
                </Button>
                <Button
                    onClick={(e) => handleClick(e, 'beds')}
                    className="flex flex-row items-center justify-center hover:text-white whitespace-nowrap"
                    sx={{textTransform: 'none', fontSize: '10px', color: theme.palette.text.secondary, minWidth: 'auto', padding: '4px 8px', borderColor: theme.palette.text.secondary, borderWidth: '0.5px'}}
                    variant="outlined"
                    endIcon={<IconChevronDown size={14} color={theme.palette.text.primary} />}
                    size="medium"
                >
                    <IconBed size={22} stroke={1} className="hover:text-white" />
                </Button>
                <Button
                    onClick={(e) => handleClick(e, 'baths')}
                    className={"flex flex-row items-center justify-center hover:text-white whitespace-nowrap "}
                    sx={{textTransform: 'none', fontSize: '10px', color: theme.palette.text.secondary, minWidth: 'auto', padding: '4px 8px', borderColor: theme.palette.text.secondary, borderWidth: '0.5px'}}
                    variant="outlined"
                    endIcon={<IconChevronDown size={14} color={theme.palette.text.primary} />}
                    size="medium"
                >
                    <IconBath size={22} stroke={1} className="hover:text-white" />
                </Button>
                <Button
                    onClick={(e) => handleClick(e, 'location')}
                    className="flex flex-row items-center justify-center hover:text-white whitespace-nowrap"
                    sx={{textTransform: 'none', fontSize: '10px', color: theme.palette.text.secondary, minWidth: 'auto', padding: '4px 8px', borderColor: theme.palette.text.secondary, borderWidth: '0.5px'}}
                    variant="outlined"
                    endIcon={<IconChevronDown size={14} color={theme.palette.text.primary} />}
                    size="medium"
                >
                    <IconMapPin size={22} stroke={1} className="hover:text-white" />
                </Button>
                <Button
                    onClick={(e) => handleClick(e, 'houseSize')}
                    className="flex flex-row items-center justify-center hover:text-white whitespace-nowrap"
                    sx={{textTransform: 'none', fontSize: '10px', color: theme.palette.text.secondary, minWidth: 'auto', padding: '4px 8px', borderColor: theme.palette.text.secondary, borderWidth: '0.5px'}}
                    variant="outlined"
                    endIcon={<IconChevronDown size={14} color={theme.palette.text.primary} />}
                    size="medium"
                >
                    <IconRuler size={22} stroke={1} className="hover:text-white" />
                </Button>
                <Button
                    onClick={(e) => handleClick(e, 'houseDescription')}
                    className="flex flex-row items-center justify-center hover:text-white whitespace-nowrap"
                    sx={{textTransform: 'none', fontSize: '10px', color: theme.palette.text.secondary, minWidth: 'auto', padding: '4px 8px', borderColor: theme.palette.text.secondary, borderWidth: '0.5px'}}
                    variant="outlined"
                    endIcon={<IconChevronDown size={14} color={theme.palette.text.primary} />}
                    size="medium"
                >
                    <IconTextSize size={22} stroke={1} className="hover:text-white" />
                </Button>

            <FilterPopup
                type={popupActive}
                // @ts-ignore
                anchorEl={anchorEl || undefined}
                open={popupActive !== 'none'}
                onClose={handleClose}
                value={
                    popupActive === 'budget' ? budget :
                    popupActive === 'location' ? locations :
                    popupActive === 'beds' ? beds :
                    popupActive === 'baths' ? baths :
                    popupActive === 'propertyType' ? propertyType :
                    popupActive === 'houseSize' ? houseSize :
                    popupActive === 'houseDescription' ? houseDescription :
                    null
                }
                setValue={
                    popupActive === 'budget' ? setBudget :
                    popupActive === 'location' ? setLocations :
                    popupActive === 'beds' ? setBeds :
                    popupActive === 'baths' ? setBaths :
                    popupActive === 'propertyType' ? setPropertyType :
                    popupActive === 'houseSize' ? setHouseSize :
                    popupActive === 'houseDescription' ? setHouseDescription :
                    () => {}
                }
            />
        </Box>
    )
}

export default Filter