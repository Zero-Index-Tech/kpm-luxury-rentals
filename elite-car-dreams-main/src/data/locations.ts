export const locations = [
  "Sandton City",
  "Johannesburg CBD",
  "Rosebank",
  "Midrand",
  "Fourways",
  "Soweto",
  "O.R. Tambo Int. Airport",
  "Lanseria Int. Airport",
  "Pretoria (Hatfield)",
  "Centurion",
  "Randburg",
  "Bedfordview",
  "Kempton Park",
  "Vereeniging",
  "Client address (Gauteng)",
] as const;

export type LocationName = (typeof locations)[number];
