import carSedan from "@/assets/car-sedan.jpg";
import carSuv from "@/assets/car-suv.jpg";
import carMpv from "@/assets/car-mpv.jpg";
import carSport from "@/assets/car-sport.jpg";
import carCoupe from "@/assets/car-coupe.jpg";
import carLimo from "@/assets/car-limo.jpg";

export type FleetStatus = "Available" | "Reserved" | "On Request";

export type Vehicle = {
  slug: string;
  ref: string;
  name: string;
  subtitle: string;
  category: "Sedans" | "SUVs" | "Chauffeur" | "Sport";
  pricePerDay: number;
  status: FleetStatus;
  tags: string[];
  image: string;
  description: string;
  specs: { label: string; value: string }[];
};

export const fleet: Vehicle[] = [
  {
    slug: "s-class-executive",
    ref: "KP-LXR-72",
    name: "S-Class Executive",
    subtitle: "2024 Model • V6 Bi-Turbo",
    category: "Sedans",
    pricePerDay: 6500,
    status: "Available",
    tags: ["Available", "Airport Concierge"],
    image: carSedan,
    description:
      "The default choice for executive travel in Johannesburg. Rear-cabin comfort, factory privacy glass and a chauffeur option for airport and boardroom runs.",
    specs: [
      { label: "Seats", value: "4 Individual" },
      { label: "Transmission", value: "9G-Tronic Auto" },
      { label: "Drivetrain", value: "Rear Wheel" },
      { label: "Chauffeur", value: "Optional" },
    ],
  },
  {
    slug: "range-vogue-v8",
    ref: "KP-LXR-98",
    name: "Range Vogue V8",
    subtitle: "Long Wheelbase • Black Pack",
    category: "SUVs",
    pricePerDay: 8200,
    status: "Reserved",
    tags: ["Reserved", "B6 Armoured"],
    image: carSuv,
    description:
      "Commanding presence with long-wheelbase rear space. Available in a B6-armoured configuration for diplomatic and executive protection work.",
    specs: [
      { label: "Seats", value: "5 Full Leather" },
      { label: "Transmission", value: "8-Speed Auto" },
      { label: "Drivetrain", value: "All Wheel" },
      { label: "Armour", value: "CEN B6 option" },
    ],
  },
  {
    slug: "v-class-premium",
    ref: "KP-LXR-12",
    name: "V-Class Premium",
    subtitle: "7-Seater • Luxury Lounge",
    category: "Chauffeur",
    pricePerDay: 5400,
    status: "Available",
    tags: ["Available", "Corporate"],
    image: carMpv,
    description:
      "Group transfers without compromise. Conference seating, onboard power and space for luggage on multi-day corporate and delegation itineraries.",
    specs: [
      { label: "Seats", value: "7 Captain" },
      { label: "Transmission", value: "9-Speed Auto" },
      { label: "Luggage", value: "6 Large Cases" },
      { label: "Chauffeur", value: "Included" },
    ],
  },
  {
    slug: "veloce-spyder",
    ref: "KP-LXR-31",
    name: "Veloce Spyder",
    subtitle: "Convertible • Event Specification",
    category: "Sport",
    pricePerDay: 11500,
    status: "On Request",
    tags: ["On Request", "Weddings"],
    image: carSport,
    description:
      "Our most requested wedding and matric-dance vehicle. Delivered detailed, fuelled and dressed with ribbons on request.",
    specs: [
      { label: "Seats", value: "2" },
      { label: "Roof", value: "Electric Soft Top" },
      { label: "Delivery", value: "Included in Gauteng" },
      { label: "Décor", value: "Optional" },
    ],
  },
  {
    slug: "noir-coupe",
    ref: "KP-LXR-45",
    name: "Noir Coupé",
    subtitle: "Grand Tourer • Night Package",
    category: "Sedans",
    pricePerDay: 7400,
    status: "Available",
    tags: ["Available", "Photoshoot"],
    image: carCoupe,
    description:
      "A grand tourer built for content. A regular on photoshoots, music videos and weekend luxury experiences across Gauteng.",
    specs: [
      { label: "Seats", value: "4" },
      { label: "Transmission", value: "8-Speed Auto" },
      { label: "Drivetrain", value: "Rear Wheel" },
      { label: "Mileage", value: "250km / day incl." },
    ],
  },
  {
    slug: "protocol-limousine",
    ref: "KP-LXR-07",
    name: "Protocol Limousine",
    subtitle: "Stretched • Embassy Specification",
    category: "Chauffeur",
    pricePerDay: 14000,
    status: "On Request",
    tags: ["On Request", "Embassy"],
    image: carLimo,
    description:
      "Reserved for state functions, embassy protocol and high-profile arrivals. Always supplied with a vetted chauffeur.",
    specs: [
      { label: "Seats", value: "6 Rear Lounge" },
      { label: "Privacy", value: "Full Partition" },
      { label: "Chauffeur", value: "Vetted, Included" },
      { label: "Notice", value: "72 Hours" },
    ],
  },
];

export const fleetCategories = ["All", "Sedans", "SUVs", "Chauffeur", "Sport"] as const;

export const getVehicle = (slug: string) => fleet.find((v) => v.slug === slug);

export const WHATSAPP_NUMBER = "27118840000";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const formatRand = (value: number) =>
  `R${value.toLocaleString("en-ZA")}`;
