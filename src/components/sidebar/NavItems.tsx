import { IconEdit, IconMessageCircle } from "@tabler/icons-react"
import { DrawerContentType, SidebarType, UserType } from "@/utils/types"

export const sidebar = (setDrawerContent: (content: DrawerContentType) => void, setDrawerOpen: (open: boolean) => void, userInfo:UserType|undefined): SidebarType[] => [
    { 
        icon: <IconEdit size={27} stroke={1.5} className='text-[#6f6f6f] hover:text-white transition-colors ease-in-out duration-300 m-2' />, 
        title: 'New Chat', 
        onClick: async (e) => {
            window.location.href = '/chat';
        } 
    }, 
    { 
        icon: <IconMessageCircle size={27} stroke={1.5} className='text-[#6f6f6f] hover:text-white transition-colors ease-in-out duration-300 m-2' />, 
        title: 'Chat History', 
        onClick: (e) => {
            setDrawerContent({title: 'Chat History', component: 'ChatHistory', props: userInfo||{}});
            setDrawerOpen(true);
        }
    }, 
];