import { ApprovalStatus } from "./enum";

export interface RegistrationRow {
  'id': number,
  'name': string,
  'dob': string,
  'gender':string,
  'cmt': string,
  'status': ApprovalStatus
}

export interface UserInfo {
  cmt: string;
  email: string;
  password: string;
  name: string;
  dob: string;
  gender: number;
  province: number;
  district: number;
  ward: number;
}

export type Ward = {
  id: number;
  name: string;
};
export type District = {
  id: number;
  name: string;
  provinceId: number;
  wards: Ward[];
};
export type Province = {
  id: number;
  name: string;
  districts: District[];
};

type LocationData = Province[];
const locationData: LocationData = [
  {
    id: 1,
    name: "Hà Nội",
    districts: [
      {
        id: 1,
        name: "Ba Đình",
        provinceId: 1,
        wards: [
          { id: 1, name: "Phúc Xá" },
          { id: 2, name: "Trúc Bạch" },
          { id: 3, name: "Vĩnh Phúc" },
        ],
      },
      {
        id: 2,
        name: "Cầu Giấy",
        provinceId: 1,
        wards: [
          { id: 1, name: "Nghĩa Đô" },
          { id: 2, name: "Nghĩa Tân" },
          { id: 3, name: "Mai Dịch" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Hồ Chí Minh",
    districts: [
      {
        id: 1,
        name: "Quận 1",
        provinceId: 2,
        wards: [
          { id: 1, name: "Bến Nghé" },
          { id: 2, name: "Bến Thành" },
          { id: 3, name: "Cầu Kho" },
        ],
      },
      {
        id: 2,
        name: "Quận 2",
        provinceId: 2,
        wards: [
          { id: 1, name: "An Phú" },
          { id: 2, name: "Thảo Điền" },
          { id: 3, name: "Bình An" },
        ],
      },
    ],
  },
];
export default locationData
