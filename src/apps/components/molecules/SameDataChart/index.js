import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Empty, Skeleton } from 'antd';

const SameDataChart = ({data, loading}) => {
  
  const CustomTooltip = ({ active, payload }) => {
    if (active) {
      const formattedLabel = `Doanh thu: ${payload[0].value.toLocaleString()} đ`;

      return (
        <div className="custom-tooltip">
          <p>{payload[0]?.payload.name}</p>
          <p>{`${formattedLabel}`}</p>
        </div>
      );
    }
  }

  if(loading)
  return <Skeleton />;

  if(data?.length > 0)
  {
    return (
      <div>
        <ResponsiveContainer width="80%" height={300}>
          <ComposedChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="Total" barSize={20} fill="#413ea0" name = "Doanh thu"/>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }else {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }
 
};

export default SameDataChart;
