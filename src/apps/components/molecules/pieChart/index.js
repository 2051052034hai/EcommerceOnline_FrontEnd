import { Empty, Skeleton } from "antd";
import React from "react";
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from "recharts";

const PieChartWith = ({ data, loading }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  if (loading) return <Skeleton />;
  if (data?.length > 0) {
    return (
      <>
        <div>
          <ResponsiveContainer width={500} height={400}>
            <PieChart width={400} height={400}>
              <Pie
                dataKey="Total"
                isAnimationActive={false}
                data={data}
                fill="#0088FE"
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </>
    );
  } else {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }
};

export default PieChartWith;
