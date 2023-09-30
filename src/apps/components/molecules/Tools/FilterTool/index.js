//Libaries
import dayjs from 'dayjs'
import { DatePicker, Select, Space, Row, Col, InputNumber } from 'antd'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useState } from 'react'

const FilterTool = () => {
  const dateFormat = 'YYYY/MM/DD'
  const { RangePicker } = DatePicker
  const { Option } = Select
  dayjs.extend(customParseFormat)

  const [type, setType] = useState('time')
  const [typePrice, setTypePrice] = useState('price')

  const handleDateChange = (_, type) => {
    console.log('type: ', type)
  }
 
  const handlePriceChange = (_, type) => {
    console.log('type: ', type)
  }


  const PickerWithType = ({ type, onChange }) => {
    if (type === 'time') return <DatePicker placeholder="Chọn ngày" onChange={onChange} />
    if (type === 'date')
      return (
        <RangePicker
          defaultValue={[
            dayjs('2015/01/01', dateFormat),
            dayjs('2015/01/01', dateFormat),
          ]}
          placeholder={['Từ ngày', 'Đến ngày']}
          onChange={onChange}
          format={dateFormat}
        />
      )
    if (type === 'month')
      return <DatePicker placeholder="Chọn tháng" onChange={onChange} picker="month" />
    if (type === 'quarter')
      return <DatePicker placeholder="Chọn quý" onChange={onChange} picker="quarter" />
    if (type === 'year')
      return <DatePicker placeholder="Chọn năm" onChange={onChange} picker="year" />
    return <DatePicker picker={type} onChange={onChange} />
  }

  const PriceWithType = ({ type, onChange }) => {
    console.log("type:", type)
    if (type === 'price') return <InputNumber placeholder = 'Nhập giá' style={{ width: '100%' }} />;
    if (type === 'aboutPrice') return <InputNumber style={{ width: '100%' }} />;
   
  };

  return (
    <>
      <Row className="w-full">
        <Col lg= {14}>
          <h3 className="font-medium mb-2">Thời Gian :</h3>
          <Space className="w-full">
            <Select value={type} onChange={setType}>
              <Option value="time">Theo ngày</Option>
              <Option value="date">Theo khoảng thời gian</Option>
              <Option value="month">Theo tháng</Option>
              <Option value="quarter">Theo quý</Option>
              <Option value="year">Theo năm</Option>
            </Select>
            <PickerWithType type={type} onChange={handleDateChange} />
          </Space>
        </Col>

        <Col lg= {10}>
          <h3 className="font-medium mb-2">Giá Bán :</h3>
          <Space className="w-full">
            <Select value={typePrice} onChange={setTypePrice}>
              <Option value="price">Theo giá</Option>
              <Option value="aboutPrice">Theo khoảng giá</Option>
            </Select>
            <PriceWithType type={typePrice} onChange={handlePriceChange} />
          </Space>
        </Col>

      </Row>
    </>
  )
}

export default FilterTool
