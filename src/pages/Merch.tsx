import Storefront from '@/store/Storefront'
import { usePageMetadata } from '@/hooks/usePageMetadata'

export default function Merch() {
	usePageMetadata(
		'KPMLXR Lifestyle Collection | KPM Luxury Rentals',
		'Explore the KPMLXR lifestyle collection of signature apparel and accessories inspired by luxury motoring. Preview pieces and join the collection ahead of launch.',
	)

	return <Storefront />
}
