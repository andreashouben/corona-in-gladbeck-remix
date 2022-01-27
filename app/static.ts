type CityMetadata = {
  population: number
  nameInSourceLink: string
}

type Cities = {
  [K in CityName]: CityMetadata
}
export const CITIES: Cities = {
  "Castrop-Rauxel": { population: 73_126, nameInSourceLink: "Castrop-Rauxel" },
  Datteln: { population: 34_714, nameInSourceLink: "Datteln" },
  Dorsten: { population: 74_515, nameInSourceLink: "Dorsten" },
  Gladbeck: { population: 75_518, nameInSourceLink: "Gladbeck" },
  "Haltern am See": { population: 37_845, nameInSourceLink: "Haltern_am_See" },
  Herten: { population: 61_860, nameInSourceLink: "Herten" },
  Marl: { population: 84_312, nameInSourceLink: "Marl" },
  "Oer-Erkenschwick": {
    population: 31_352,
    nameInSourceLink: "Oer-Erkenschwick",
  },
  Recklinghausen: { population: 110_705, nameInSourceLink: "Recklinghausen" },
  Waltrop: { population: 29_472, nameInSourceLink: "Waltrop" },
}

export type CityName =
  | "Castrop-Rauxel"
  | "Datteln"
  | "Dorsten"
  | "Gladbeck"
  | "Haltern am See"
  | "Herten"
  | "Marl"
  | "Oer-Erkenschwick"
  | "Recklinghausen"
  | "Waltrop"
export const isCity = (value: any): value is CityName =>
  typeof value === "string" && Object.keys(CITIES).includes(value as CityName)
