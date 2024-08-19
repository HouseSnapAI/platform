import { IconEdit, IconMessageCircle } from "@tabler/icons-react"
import { DrawerContentType, SidebarType, User } from "@/utils/types"
import React from "react";

export const sidebar = (): SidebarType[] => [
    { 
        icon: <IconEdit size={27} stroke={1.5} className='text-[#6f6f6f] hover:text-white transition-colors ease-in-out duration-300 m-2' />, 
        title: 'New Chat', 
        onClick: async (e) => {
            if (window.location.href !== 'chat') {
                window.location.href = '/chat';
            }
        } 
    }, 
];