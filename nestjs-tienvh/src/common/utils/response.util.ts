export interface ApiResponse<T> {
  data: T | null;
  message: string;
  statusCode: number;
}

export function createResponse<T>(data: T | null, message: string, statusCode: number): ApiResponse<T> {
  return {
    data, message, statusCode
  };
}
