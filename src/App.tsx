import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Concept 1 — "KPMLXR" (light / olive / black — Figma direction)
import LayoutC1 from '@/concept1/components/Layout'
import HomeC1 from '@/concept1/pages/Home'
import FleetC1 from '@/concept1/pages/Fleet'
import VehicleDetailC1 from '@/concept1/pages/VehicleDetail'
import AboutC1 from '@/concept1/pages/About'
import MerchC1 from '@/concept1/pages/Merch'
import ContactC1 from '@/concept1/pages/Contact'

// Concept 2 — "Dark Luxury" (near-black / champagne gold)
import LayoutC2 from '@/concept2/components/Layout'
import HomeC2 from '@/concept2/pages/Home'
import FleetC2 from '@/concept2/pages/Fleet'
import VehicleDetailC2 from '@/concept2/pages/VehicleDetail'
import AboutC2 from '@/concept2/pages/About'
import ContactC2 from '@/concept2/pages/Contact'
import MerchC2 from '@/concept2/pages/Merch'

// Concept 3 — "Premium Lifestyle" (ivory / taupe / glass)
import LayoutC3 from '@/components/Layout'
import HomeC3 from '@/pages/Home'
import FleetC3 from '@/pages/Fleet'
import VehicleDetailC3 from '@/pages/VehicleDetail'
import AboutC3 from '@/pages/About'
import ContactC3 from '@/pages/Contact'
import MerchC3 from '@/pages/Merch'
import ServicePage from '@/pages/ServicePage'

import ConciergeChat from '@/components/ConciergeChat'
import ShopBag from '@/store/Bag'
import ShopAccount from '@/store/Account'
import ShopCheckout from '@/store/Checkout'
import Admin from '@/pages/Admin'

/**
 * Unified concept showcase: one site, three complete design concepts.
 * Concept 3 (Premium Lifestyle) is the default at `/`; the fixed ConceptSwitcher pill lets
 * the client flip between `/c1/*`, `/c2/*` and `/` — all concepts share
 * an identical route structure, so switching preserves the page being viewed.
 */
export default function App() {
  const location = useLocation()
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/admin" element={<Admin />} />

          <Route path="/c1" element={<LayoutC1 />}>
            <Route index element={<HomeC1 />} />
            <Route path="fleet" element={<FleetC1 />} />
            <Route path="fleet/:slug" element={<VehicleDetailC1 />} />
            <Route path="about" element={<AboutC1 />} />
            <Route path="merch" element={<MerchC1 />} />
            <Route path="merch/cart" element={<ShopBag />} />
            <Route path="merch/account" element={<ShopAccount />} />
            <Route path="merch/checkout" element={<ShopCheckout />} />
            <Route path="contact" element={<ContactC1 />} />
            <Route path="services/:slug" element={<ServicePage />} />
          </Route>

          <Route path="/c2" element={<LayoutC2 />}>
            <Route index element={<HomeC2 />} />
            <Route path="fleet" element={<FleetC2 />} />
            <Route path="fleet/:slug" element={<VehicleDetailC2 />} />
            <Route path="about" element={<AboutC2 />} />
            <Route path="merch" element={<MerchC2 />} />
            <Route path="merch/cart" element={<ShopBag />} />
            <Route path="merch/account" element={<ShopAccount />} />
            <Route path="merch/checkout" element={<ShopCheckout />} />
            <Route path="contact" element={<ContactC2 />} />
            <Route path="services/:slug" element={<ServicePage />} />
          </Route>

          <Route path="/" element={<LayoutC3 />}>
            <Route index element={<HomeC3 />} />
            <Route path="fleet" element={<FleetC3 />} />
            <Route path="fleet/:slug" element={<VehicleDetailC3 />} />
            <Route path="about" element={<AboutC3 />} />
            <Route path="merch" element={<MerchC3 />} />
            <Route path="merch/cart" element={<ShopBag />} />
            <Route path="merch/account" element={<ShopAccount />} />
            <Route path="merch/checkout" element={<ShopCheckout />} />
            <Route path="contact" element={<ContactC3 />} />
            <Route path="services/:slug" element={<ServicePage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>

      {/* client-facing concept toggle + AI concierge (landing pages) */}
      <ConciergeChat />
    </>
  )
}
