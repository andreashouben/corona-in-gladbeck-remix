import { HiStop, HiTrendingDown, HiTrendingUp } from "react-icons/hi"

type TrendProps = { current: string; previous: string }

const Trend = ({ current, previous }: TrendProps) => {
  const cur = Number(current)
  const prev = Number(previous)
  return !cur || !prev ? null : cur - prev === 0 ? (
    <HiStop color={"gray"} title="bleibt gleich" />
  ) : cur - prev > 0 ? (
    <HiTrendingUp color={"red"} title="steigt" />
  ) : (
    <HiTrendingDown color={"green"} title="sinkt" />
  )
}
export default Trend
