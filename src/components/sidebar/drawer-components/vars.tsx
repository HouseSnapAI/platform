import ChatHistory from "@/components/sidebar/drawer-components/ChatHistory";
import ProfilePopup from "@/components/sidebar/drawer-components/ProfilePopup";

export const drawerComponents: { [key: string]: any } = {
  'ChatHistory': <ChatHistory/>,
  'ProfilePopup': <ProfilePopup />,
}