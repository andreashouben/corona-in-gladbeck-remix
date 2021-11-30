import { useState } from "react";
import { useLoaderData, LinksFunction, MetaFunction } from "remix";
import data, { CovidRecord } from "../data";
import { HiTrendingDown, HiTrendingUp, HiStop } from "react-icons/hi";
import styles from "../styles/global.css";
import favicon from "../../assets/favicon.svg";

export let meta: MetaFunction = () => {
  return {
    title: "Covid Fälle in Gladbeck",
    viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
    description: `Anzeige der Coronazahlen von Gladbeck, bereitgestellt vom Kreis Recklinghausen. Die Seite zeigt stellt die Zahlen textuell dar und gibt einen Überblick über die täglichen Veränderungen.`,
  };
};

export let links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
    { rel: "icon", href: favicon, type: "image/svg" },
  ];
};

export let loader = async () => {
  return await data();
};
const DAYS_TO_SHOW_VALUES = 42;

export default () => {
  const data: CovidRecord[] = useLoaderData();
  const [limit, setLimit] = useState(DAYS_TO_SHOW_VALUES);

  const diff = (
    field: keyof Omit<CovidRecord, "date">,
    curRow: CovidRecord,
    nextRow: CovidRecord
  ) => {
    if (!nextRow) {
      return 0;
    }

    const diff = curRow[field] - nextRow[field];
    return diff > 0 ? `+${diff}` : diff;
  };

  const incidence = (id: number, data: CovidRecord[]) => {
    const last7Days = data
      .map((row) => row.confirmedCases)
      .splice(id, 8)
      .map((value, idx, array) => value - array[idx + 1])
      .filter((val) => !isNaN(val))
      .reduce((a, b) => a + b, 0);

    return Number(((last7Days / 75600) * 100000).toFixed(1));
  };

  const trend = (cur: number, prev: number) =>
    !cur || !prev ? (
      ""
    ) : cur - prev === 0 ? (
      <HiStop color={"gray"} title="bleibt gleich" />
    ) : cur - prev > 0 ? (
      <HiTrendingUp color={"red"} title="steigt" />
    ) : (
      <HiTrendingDown color={"green"} title="sinkt" />
    );

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
            {trend(incidence(index, data), incidence(index + 1, data))}
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
      );
    });
  return (
    <main>
      <h1>Covid Fälle in Gladbeck</h1>
      <h2>
        Quelle:{" "}
        <a
          href={
            "https://www.kreis-re.de/dok/geoatlas/FME/CoStat/Diaggeskra-Gladbeck.html"
          }
        >
          Kreis Recklinghausen
        </a>
      </h2>

      {data.length > 0 ? (
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
      ) : (
        "Lade Daten..."
      )}
    </main>
  );
};
