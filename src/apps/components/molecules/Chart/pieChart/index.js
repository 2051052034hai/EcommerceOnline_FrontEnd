import { Empty, Skeleton } from 'antd'
import React from 'react'
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell, Legend } from 'recharts'

const PieChartWith = ({ data, loading }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  const CustomTooltip = ({ active, payload }) => {
    if (active) {
      const formattedLabel = `Doanh thu: ${payload[0].value.toLocaleString()} đ`

      return (
        <div className="custom-tooltip">
          <p>{payload[0]?.payload.name}</p>
          <p>{`${formattedLabel}`}</p>
        </div>
      )
    }
  }

  if (loading) return <Skeleton />
  if (data?.length > 0) {
    return (
      <>
        <div className="m:auto lg:w-11/12 w-full md:ml-32">
          <ResponsiveContainer className="m-auto ml-0 " width={300} height={300}>
            <PieChart width={400} height={400}>
              <Pie dataKey="Total" isAnimationActive={true} data={data} fill="#0088FE">
                {data.map((entry, index) => {
                  return (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  )
                })}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </>
    )
  } else {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  }
}

export default PieChartWith
