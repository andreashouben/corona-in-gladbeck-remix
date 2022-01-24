import { Form } from "remix"
import { useRef } from "react"
import { City } from "~/data"
import { CITIES } from "~/static"

type CitySelectorProps = {
  currentCity: City
}

const CitySelector = ({ currentCity }: CitySelectorProps) => {
  const selectorRef = useRef<HTMLFormElement>(null)

  const options = Array.from(CITIES).map((city) => (
    <option key={city}>{city}</option>
  ))

  return (
    <Form ref={selectorRef} method="get" action="/">
      <label>
        Stadt auswählen&nbsp;
        <select
          name="city"
          value={currentCity}
          onChange={() => selectorRef.current?.submit()}
        >
          {options}
        </select>
      </label>
    </Form>
  )
}
export default CitySelector
