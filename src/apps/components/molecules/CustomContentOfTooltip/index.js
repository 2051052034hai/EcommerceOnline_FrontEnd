import { Empty, Skeleton } from "antd";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomContentOfTooltip = ({ data, loading }) => {

  if (loading) return <Skeleton />;

  const CustomTooltip = ({ active, payload }) => {
    if (active) {
      const formattedLabel = `Đã mua: ${payload[0].value.toLocaleString()} đ`;

      return (
        <div className="custom-tooltip">
          <p>{payload[0]?.payload.name}</p>
          <p>{`${formattedLabel}`}</p>
        </div>
      );
    }
  }


  if (data?.length > 0) {
    return (
      <>
        <div className="m:auto lg:w-11/12 "> 
          <ResponsiveContainer className="m-auto ml-5" width="85%"  height={300}>
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend/>
              <Bar dataKey="uv" barSize={20} fill="#8884d8" name = "Đã mua" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </>
    );
  } else {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }
};

export default CustomContentOfTooltip;
