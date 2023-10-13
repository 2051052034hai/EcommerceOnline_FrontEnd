import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Select, Space } from 'antd'

const { Option } = Select

function LocationForm({ data, direction }) {
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
    axios
      .get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
        headers: {
          token: 'eae718cc-68d4-11ee-b394-8ac29577e80e',
        },
      })
      .then((response) => {
        setProvinces(response?.data?.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    if (provinceCode !== '') {
      axios
        .post(
          'https://online-gateway.ghn.vn/shiip/public-api/master-data/district',
          {
            province_id: provinceCode,
          },
          {
            headers: {
              token: 'eae718cc-68d4-11ee-b394-8ac29577e80e',
            },
          },
        )
        .then((response) => {
          setDistricts(response.data.data)
        })
    } else {
      setDistricts([])
    }
  }, [provinceCode])

  useEffect(() => {
    // Load danh sách xã khi quận được chọn
    if (districtCode !== '') {
      axios
        .get(
          `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtCode}`,
          {
            headers: {
              token: 'eae718cc-68d4-11ee-b394-8ac29577e80e',
            },
          },
        )
        .then((response) => {
          setWards(response?.data?.data)
        })
    } else {
      // Nếu không có quận nào được chọn, đặt danh sách xã thành rỗng
      setWards([])
    }
  }, [districtCode])

  return (
    <div className="w-full mb-5 flex">
      <Space direction={direction ? direction : ''} size={16} className="w-full">
        <div className="w-full flex items-center">
          <div className="pr-2">
            <label htmlFor="province">Tỉnh / Thành phố:</label>
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
            <Option value="">Chọn tỉnh / thành phố</Option>
            {provinces?.map((province) => (
              <Option key={province?.ProvinceID} value={province?.ProvinceID}>
                {province?.ProvinceName}
              </Option>
            ))}
          </Select>
        </div>

        <div className="flex w-full">
          <div className="pr-2">
            <label htmlFor="district">Quận / Huyện:</label>
          </div>
          <Select
            id="district"
            value={districtCode}
            onChange={(value) => setDistrictCode(value)}
            style={{ width: 200 }}
          >
            <Option value="">Chọn quận / huyện</Option>
            {districts?.map((district) => (
              <Option key={district?.DistrictID} value={district?.DistrictID}>
                {district?.DistrictName}
              </Option>
            ))}
          </Select>
        </div>
        <div className="flex w-full">
          <div className="pr-2">
            <label htmlFor="ward">Xã / Phường:</label>
          </div>
          <Select
            id="ward"
            value={wardCode}
            onChange={(value) => setWardCode(value)} // Sửa ở đây
            style={{ width: 200 }}
          >
            <Option value="">Chọn xã / phường</Option>
            {wards?.map((ward) => (
              <Option key={ward?.WardCode} value={ward?.WardCode}>
                {ward?.WardName}
              </Option>
            ))}
          </Select>
        </div>
      </Space>
    </div>
  )
}

export default LocationForm
