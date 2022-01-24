import axios from "axios"
import { parse } from "node-html-parser"
import requireFromString from "require-from-string"

export type CovidRecord = {
  date: Date
  confirmedCases: number
  recovered: number
  deaths: number
  currentlyInfected: number
}

export type City =
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

export type PopulationPerCity = {
  [K in City]: number
}

export default async (city: City = "Gladbeck") => {
  const response = await axios.get(
    `https://www.kreis-re.de/dok/geoatlas/FME/CoStat/Diaggeskra-${city}.html`,
  )

  const page: string = response.data
  const root = parse(page)
  let script = root.querySelectorAll("script")[1].innerHTML
  script =
    `
    const document = {
        getElementById: () => ({
          getContext: () => { }
        })
      };
      
      class Chart {
      
      }
    ` +
    script +
    "module.exports = data;"

  const data = requireFromString(script)

  let year = 2020

  return data.labels
    .map((label: string, index: number) => {
      const [day, month] = label.split(".").map((x) => Number(x))

      const date = new Date(year, month - 1, day)
      if (month === 12 && day === 31) {
        year++
      }
      const confirmedCases = data.datasets[0].data[index]
      const recovered = data.datasets[1].data[index]
      const deaths = data.datasets[2].data[index]
      const currentlyInfected = data.datasets[3].data[index]
      return {
        date,
        confirmedCases,
        recovered,
        deaths,
        currentlyInfected,
      } as CovidRecord
    })
    .sort(
      (a: CovidRecord, b: CovidRecord) => a.date.getTime() - b.date.getTime(),
    )
    .reverse()
}
