type CityMetadata = {
  population: number
  displayName: string
}

type Cities = {
  [K in CityName]: CityMetadata
}
export const CITIES: Cities = {
  "Castrop-Rauxel": { population: 73_126, displayName: "Castrop-Rauxel" },
  Datteln: { population: 34_714, displayName: "Datteln" },
  Dorsten: { population: 74_515, displayName: "Dorsten" },
  Gladbeck: { population: 75_518, displayName: "Gladbeck" },
  Haltern_am_See: { population: 37_845, displayName: "Haltern am See" },
  Herten: { population: 61_860, displayName: "Herten" },
  Marl: { population: 84_312, displayName: "Marl" },
  "Oer-Erkenschwick": {
    population: 31_352,
    displayName: "Oer-Erkenschwick",
  },
  Recklinghausen: { population: 110_705, displayName: "Recklinghausen" },
  Waltrop: { population: 29_472, displayName: "Waltrop" },
}

export type CityName =
  | "Castrop-Rauxel"
  | "Datteln"
  | "Dorsten"
  | "Gladbeck"
  | "Haltern_am_See"
  | "Herten"
  | "Marl"
  | "Oer-Erkenschwick"
  | "Recklinghausen"
  | "Waltrop"
export const isCity = (value: any): value is CityName =>
  typeof value === "string" && Object.keys(CITIES).includes(value as CityName)
