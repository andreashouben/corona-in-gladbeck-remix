import { City, PopulationPerCity } from "~/data"

export const POPULATION: PopulationPerCity = {
  "Castrop-Rauxel": 73_126,
  Datteln: 34_714,
  Dorsten: 74_515,
  Gladbeck: 75_518,
  "Haltern am See": 37_845,
  Herten: 61_860,
  Marl: 84_312,
  "Oer-Erkenschwick": 31_532,
  Recklinghausen: 110_705,
  Waltrop: 29_472,
}
export const CITIES = new Set<City>([
  "Castrop-Rauxel",
  "Datteln",
  "Dorsten",
  "Gladbeck",
  "Haltern am See",
  "Herten",
  "Marl",
  "Oer-Erkenschwick",
  "Recklinghausen",
  "Waltrop",
])
