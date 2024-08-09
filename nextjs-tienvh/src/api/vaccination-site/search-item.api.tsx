import { useQuery } from '@tanstack/react-query';
import api from '../api';


interface VaccinationSite {
  id: number;
  name: string;
  manager: string;
  table_number: number;
  address: string;
  ward: {
    id: number;
    name: string;
    district: {
      id: number;
      name: string;
      province: {
        id: number;
        name: string;
      };
    };
  };
}

interface PaginationDto {
  page?: number;
  pageSize?: number;
}

interface VaccinationResponse {
  data: VaccinationSite[];
  page: number | null;
  pageSize: number | null;
  count: number;
}

export const useVaccination = ({ page, pageSize, ward_id }: { page: number; pageSize: number; ward_id?: number | null }) => {
  return useQuery<VaccinationResponse, Error>({
    queryKey: ['vaccinationSites', page, pageSize, ward_id],
    queryFn: () => fetchVaccinationSites({ page, pageSize, ward_id }),
    staleTime: 5 * 60 * 1000,
    enabled: true, 
  });
};

const fetchVaccinationSites = async ({ page, pageSize, ward_id }: { page: number; pageSize: number; ward_id?: number | null }): Promise<VaccinationResponse> => {
  if (ward_id) {
    const { data } = await api.get('/vaccination-sites/by-ward', { params: { page, pageSize, ward_id } });
    return data;
  } else {
    const { data } = await api.get('/vaccination-sites', { params: { page, pageSize } });
    return data;
  }
};
