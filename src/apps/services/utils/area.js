import areaJson from './area.json'

export const getArea = (provinceCode, districtCode) => {
  const province = areaJson.find((province) => province.code === provinceCode)

  const district = province.districts.find((district) => district.code === districtCode)
  return {
    provinceName: province?.name,
    districtName: district?.name,
  }
}
