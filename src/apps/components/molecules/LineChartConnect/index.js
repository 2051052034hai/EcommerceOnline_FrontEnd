import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
 
  ResponsiveContainer,
  Label,
} from "recharts";
import { Empty, Skeleton } from 'antd';

const LineChartConnect = ({ data, loading}) => {

  if(loading)
    return <Skeleton />;

  if(data?.length > 0)
  {
    return (
      <>
        <div style={{ width: "100%", justifyContent: "end" }}>
          <ResponsiveContainer width="80%" height={300}>
            <LineChart
              width={300}
              height={200}
              data={data}
              margin={{
                top: 30,
                right: 30,
                left: 10,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name">
              <Label style={{fontWeight:"500", fill: "blue"}} dy ={20}  position="insideCenter" value="Thời gian:" offset={100} />
              </XAxis>
          
              <YAxis>
                <Label style={{fontWeight:"500", fill: "blue"}} value="Doanh thu: " position="insideTop" offset={-25} />
              </YAxis>
  
              <Tooltip />
              <Line
                connectNulls
                type="monotone"
                dataKey="Total"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </>
    );
  }else {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }
  
};

export default LineChartConnect;
