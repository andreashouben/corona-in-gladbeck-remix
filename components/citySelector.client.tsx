import { NavLink } from "remix"
import { CITIES, CityName } from "~/static"

const CitySelector = () => {
  const links = Object.keys(CITIES)
    .sort()
    .map((city, idx) => (
      <li key={city}>
        <NavLink to={`/${city}`}>{city}</NavLink>
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
