import { Form } from "remix"
import { useRef } from "react"
import { CITIES, CityName } from "~/static"

type CitySelectorProps = {
  currentCity: CityName
}

const CitySelector = ({ currentCity }: CitySelectorProps) => {
  const selectorRef = useRef<HTMLFormElement>(null)

  const options = Object.keys(CITIES).map((city) => (
    <option key={city}>{city}</option>
  ))

  return (
    <Form ref={selectorRef} method="get" action="/">
      <label>
        Stadt auswählen:&nbsp;
        <select name="city" defaultValue={currentCity}>
          {options}
        </select>
      </label>
      <input type="submit" />
    </Form>
  )
}
export default CitySelector
