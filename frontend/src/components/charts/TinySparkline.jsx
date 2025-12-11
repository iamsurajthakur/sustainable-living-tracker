import { LineChart, Line } from 'recharts'

export default function TinySparkline({ data }) {
  if (!data || data.length < 2) return null

  const first = data[0].value
  const last = data[data.length - 1].value

  const color = last < first ? '#4ade80' : last > first ? '#f87171' : '#cbd5e1'

  return (
    <LineChart width={60} height={24} data={data}>
      <Line
        type="monotone"
        dataKey="value"
        stroke={color}
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  )
}
