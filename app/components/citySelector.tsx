import { NavLink } from "remix"
import { CITIES } from "~/static"

const CitySelector = () => {
  const links = Object.entries(CITIES)
    .sort()
    .map(([citylink, meta], idx) => (
      <li key={citylink}>
        <NavLink to={`/${citylink}`}>{meta.displayName}</NavLink>
      </li>
    ))

  return (
    <label>
      Städte im Kreis:
      <nav>
        <ul>{links}</ul>
      </nav>
    </label>
  )
}
export default CitySelector
