import { useLocation } from 'react-router-dom'

export function useShopBase() {
  return `/${useLocation().pathname.split('/')[1] || 'c1'}/merch`
}
