import { useQueries, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface Province {
  name: string;
  id: number;
}

export interface District {
  name: string;
  id: number;
  province_id: number;
}

export interface Ward {
  name: string;
  id: number;
  district_id: number;
}

const apiPrefix = process.env.NEXT_PUBLIC_BASE_URL || '';

interface UseLocationResult {
  provinces: UseQueryResult<Province[], ErrorResponse>;
  districts: UseQueryResult<District[], ErrorResponse>;
  wards: UseQueryResult<Ward[], ErrorResponse>;
  setProvinceId: (id: number | undefined) => void;
  setDistrictId: (id: number | undefined) => void;
}

export const useLocation = (): UseLocationResult => {
  const [provinceId, setProvinceId] = useState<number | undefined>(undefined);
  const [districtId, setDistrictId] = useState<number | undefined>(undefined);

  const results = useQueries({
    queries: [
      {
        queryKey: ['provinces'],
        queryFn: async (): Promise<Province[]> => {
          const response = await axios.get(`${apiPrefix}/provinces`);
          return response.data.data;
        },
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ['districts', provinceId],
        queryFn: async (): Promise<District[]> => {
          if (provinceId === undefined) return [];
          const response = await axios.get(`${apiPrefix}/districts`, {
            params: { province_id: provinceId },
          });
          return response.data.data;
        },
        staleTime: 5 * 60 * 1000,
        enabled: !!provinceId,
      },
      {
        queryKey: ['wards', districtId],
        queryFn: async (): Promise<Ward[]> => {
          if (districtId === undefined) return [];
          const response = await axios.get(`${apiPrefix}/wards`, {
            params: { district_id: districtId },
          });
          return response.data.data;
        },
        staleTime: 5 * 60 * 1000,
        enabled: !!districtId,
      },
    ],
  });

  return {
    provinces: results[0] as UseQueryResult<Province[], ErrorResponse>,
    districts: results[1] as UseQueryResult<District[], ErrorResponse>,
    wards: results[2] as UseQueryResult<Ward[], ErrorResponse>,
    setProvinceId,
    setDistrictId,
  };
};
