import { useLocation } from 'react-router-dom'

export function useShopBase() {
  const segment = useLocation().pathname.split('/')[1]
  return `${segment === 'c1' || segment === 'c2' ? `/${segment}` : ''}/merch`
}
