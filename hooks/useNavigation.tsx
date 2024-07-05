import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { MessageSquare, Users } from 'lucide-react'

interface NavigationItem {
  name: string
  href: string
  icon: React.ReactNode
  active: boolean
}

export const useNavigation = (): NavigationItem[] => {
  const pathname = usePathname()

  const paths = useMemo(() => [
    {
      name: "Conversations",
      href: "/conversations",
      icon: <MessageSquare />,
      active: pathname.startsWith("/conversations"),
    },
    {
      name: "Friends",
      href: "/friends",
      icon: <Users />,
      active: pathname === "/friends",
    },
  ], [pathname])

  return paths
}
