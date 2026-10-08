export const SERVICE_PAGES = [
  {
    slug: 'short-term-car-hire',
    label: 'Short-Term Car Hire',
    title: 'Short-Term Luxury Car Hire in Johannesburg',
    eyebrow: 'Short-Term Hire',
    description:
      'Hire a luxury car in Johannesburg for a day, a weekend, or a special trip. Choose from a curated fleet and arrange convenient delivery with the KPM concierge team.',
    image: '/car-amg-gt.jpg',
    imageAlt: 'Mercedes-AMG GT available for luxury car hire in Johannesburg',
    benefits: ['Daily and weekend hire', 'A curated prestige fleet', 'Delivery arranged around your plans'],
    rentalType: 'short-term',
  },
  {
    slug: 'long-term-car-leasing',
    label: 'Long-Term & Corporate',
    title: 'Long-Term Luxury Car Leasing in Johannesburg',
    eyebrow: 'Long-Term & Corporate',
    description:
      'Flexible long-term vehicle rentals for businesses, executives, diplomatic teams, and extended stays in Johannesburg. KPM can coordinate vehicles, delivery, and ongoing support around your requirements.',
    image: '/car-range-rover.jpg',
    imageAlt: 'Range Rover Sport from the KPM long-term rental fleet',
    benefits: ['Flexible multi-month terms', 'Options for executive and corporate mobility', 'Dedicated rental coordination'],
    rentalType: 'corporate',
  },
  {
    slug: 'wedding-and-event-car-hire',
    label: 'Weddings & Events',
    title: 'Wedding & Event Car Hire in Johannesburg',
    eyebrow: 'Weddings & Events',
    description:
      'Make a considered arrival on your wedding day or at a special event. Select a luxury vehicle and coordinate timings, chauffeur options, and collection details with the KPM team.',
    image: '/car-rolls-ghost.jpg',
    imageAlt: 'Rolls-Royce Ghost for wedding and event transportation',
    benefits: ['Luxury vehicles for memorable arrivals', 'Chauffeur options available', 'Timing coordinated for your event'],
    rentalType: 'wedding',
  },
  {
    slug: 'matric-dance-car-hire',
    label: 'Matric Dance',
    title: 'Matric Dance Car Hire in Johannesburg',
    eyebrow: 'Matric Dance',
    description:
      'Arrive in style for matric dance in Johannesburg. Explore luxury car and chauffeur options, then speak with KPM to plan the vehicle, timing, and pickup details for the evening.',
    image: '/car-rolls-ghost.jpg',
    imageAlt: 'Luxury car hire for a matric dance arrival in Johannesburg',
    benefits: ['Prestige cars for the big night', 'Chauffeur options on request', 'Pickup and arrival details planned in advance'],
    rentalType: 'matric',
  },
  {
    slug: 'airport-transfers',
    label: 'Airport Transfers',
    title: 'Luxury Airport Transfers in Johannesburg',
    eyebrow: 'Airport Transfers',
    description:
      'Arrange a private luxury airport transfer to or from OR Tambo International Airport or Lanseria. KPM coordinates your vehicle, pickup timing, and onward journey with a personal concierge.',
    image: '/car-bmw-7.jpg',
    imageAlt: 'Luxury BMW sedan for a Johannesburg airport transfer',
    benefits: ['OR Tambo and Lanseria transfers', 'Private chauffeur service', 'Pickup timing coordinated around your flight'],
    rentalType: 'airport',
  },
] as const

export type ServicePage = (typeof SERVICE_PAGES)[number]