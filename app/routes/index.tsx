import {
  HeadersFunction,
  LinksFunction,
  MetaFunction,
  useLoaderData,
} from "remix"
import favicon from "../../assets/favicon.svg"
import data, { CovidRecord } from "../data"
import styles from "../styles/global.css"
import Trend from "../../components/trend"
import { CITIES, CityName, isCity } from "~/static"
import CitySelector from "../../components/citySelector"

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "max-age=0, s-maxage=300, stale-while-revalidate=300",
  }
}

export let handle = { hydrate: true }

export let meta: MetaFunction = () => {
  return {
    title: "Covid Fälle in Gladbeck",
  }
}

export let links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
    { rel: "icon", href: favicon, type: "image/svg" },
  ]
}

type PageData = {
  city: CityName
  data: CovidRecord[]
}

export let loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url)
  const cityParam = url.searchParams.get("city") || "Gladbeck"
  const city = isCity(cityParam) ? cityParam : "Gladbeck"
  const d = await data(city)
  return { city, data: d }
}

export default () => {
  const { data, city } = useLoaderData<PageData>()
  const { population, nameInSourceLink } = CITIES[city]

  const diff = (
    field: keyof Omit<CovidRecord, "date">,
    curRow: CovidRecord,
    nextRow: CovidRecord,
  ) => {
    if (!nextRow) {
      return 0
    }

    const diff = curRow[field] - nextRow[field]
    return diff > 0 ? `+${diff}` : diff
  }

  const incidence = (id: number, data: CovidRecord[]) => {
    const last7Days = data
      .map((row) => row.confirmedCases)
      .splice(id, 8)
      .map((value, idx, array) => value - array[idx + 1])
      .filter((val) => !isNaN(val))
      .reduce((a, b) => a + b, 0)

    return ((last7Days / population) * 100000).toFixed(1)
  }

  const rows = data
    .map((row) => ({ ...row, date: new Date(row.date) }))
    .map((row, index) => {
      return (
        <tr
          style={{
            backgroundColor: row.date.getDay() === 1 ? "aliceblue" : "none",
          }}
          key={row.date.getTime()}
        >
          <td style={{ textAlign: "right" }}>
            {row.date.toLocaleDateString("de-DE", {
              weekday: "short",
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
            })}
          </td>
          <td>
            {incidence(index, data)}{" "}
            <Trend
              current={incidence(index, data)}
              previous={incidence(index + 1, data)}
            />
          </td>
          <td>
            {row.confirmedCases} ({diff("confirmedCases", row, data[index + 1])}
            )
          </td>

          <td>
            {row.recovered} ({diff("recovered", row, data[index + 1])})
          </td>
          <td>
            {row.deaths} ({diff("deaths", row, data[index + 1])})
          </td>
          <td>
            {row.currentlyInfected} (
            {diff("currentlyInfected", row, data[index + 1])})
          </td>
        </tr>
      )
    })

  return (
    <main>
      <h1>
        Covid Fälle in
        <br /> {city}
      </h1>
      <CitySelector currentCity={city} />
      <h4>Einwohner: {CITIES[city].population.toLocaleString("de-DE")}</h4>
      <h5>
        Quelle:{" "}
        <a
          href={`https://www.kreis-re.de/dok/geoatlas/FME/CoStat/Diaggeskra-${nameInSourceLink}.html`}
        >
          Kreis Recklinghausen
        </a>
      </h5>
      <div>
        <table>
          <thead>
            <tr>
              <th>Datum</th>
              <th>Inzidenz</th>
              <th>Gemeldet</th>
              <th>Genesen</th>
              <th>Verstorben</th>
              <th>Aktuell infiziert</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </main>
  )
}
