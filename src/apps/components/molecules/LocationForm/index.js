import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Select, Space } from 'antd'

const { Option } = Select

function LocationForm({ data }) {
  const {
    provinceCode,
    districtCode,
    wardCode,
    setProvinceCode,
    setWardCode,
    setDistrictCode,
  } = data
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  useEffect(() => {
    // Load danh sách tỉnh khi component được mount
    axios.get('https://provinces.open-api.vn/api/?depth=3').then((response) => {
      setProvinces(response?.data)
    })
  }, [])

  useEffect(() => {
    if (provinceCode !== '') {
      axios
        .get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
        .then((response) => {
          setDistricts(response.data.districts)
        })
    } else {
      setDistricts([])
    }
  }, [provinceCode])

  useEffect(() => {
    // Load danh sách xã khi quận được chọn
    if (districtCode !== '') {
      axios
        .get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
        .then((response) => {
          setWards(response.data.wards)
        })
    } else {
      // Nếu không có quận nào được chọn, đặt danh sách xã thành rỗng
      setWards([])
    }
  }, [districtCode])

  return (
    <div className="w-full mb-5">
      <Space direction="vertical" size={16} className="w-full">
        <div className="w-full flex">
          <div className="w-24">
            <label htmlFor="province">Tỉnh:</label>
          </div>
          <Select
            id="province"
            value={provinceCode}
            onChange={(value) => {
              if (value) {
                setProvinceCode(value)
              }
            }}
            style={{ width: 200 }}
          >
            <Option value="">Chọn tỉnh</Option>
            {provinces.map((province) => (
              <Option key={province.code} value={province.code}>
                {province.name}
              </Option>
            ))}
          </Select>
        </div>

        <div className="flex w-full">
          <div className="w-24">
            <label htmlFor="district">Quận:</label>
          </div>
          <Select
            id="district"
            value={districtCode}
            onChange={(value) => setDistrictCode(value)}
            style={{ width: 200 }}
          >
            <Option value="">Chọn quận</Option>
            {districts.map((district) => (
              <Option key={district.code} value={district.code}>
                {district.name}
              </Option>
            ))}
          </Select>
        </div>
        <div className="flex w-full">
          <div className="w-24">
            <label htmlFor="ward">Xã:</label>
          </div>
          <Select
            id="ward"
            value={wardCode}
            onChange={(value) => setWardCode(value)} // Sửa ở đây
            style={{ width: 200 }}
          >
            <Option value="">Chọn xã</Option>
            {wards.map((ward) => (
              <Option key={ward.code} value={ward.code}>
                {ward.name}
              </Option>
            ))}
          </Select>
        </div>
      </Space>
    </div>
  )
}

export default LocationForm
