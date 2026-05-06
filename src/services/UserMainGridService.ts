import { designflixApi, designflixApiInterceptors } from '../api';

export class UserMainGridService {
  async create(data: any) {
    try {
      const response = await designflixApi.post('/user-main-grid', {
        ...data,
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao criar user main grid:', error);
      throw error;
    }
  }

  async update(id: number, data: any) {
    try {
      const response = await designflixApi.put(`/user-main-grid/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar user main grid:', error);
      throw error;
    }
  }

  async getByTermAndFormat(params?: {
    searchTerm?: string;
    format?: string;
    page?: number;
    limit?: number;
  }) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.searchTerm) queryParams.append('searchTerm', params.searchTerm);
      if (params?.format) queryParams.append('format', params.format);
      if (params?.page) queryParams.append('page', String(params.page));
      if (params?.limit) queryParams.append('limit', String(params.limit));
      
      const queryString = queryParams.toString();
      const url = queryString ? `/user-main-grid/flter?${queryString}` : '/user-main-grid/flter';
      
      const response = await designflixApi.get(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar user main grid:', error);
      throw error;
    }
  }

  async getAllImagesByUserId(userId: number) {
    try {
      const response = await designflixApiInterceptors.get(`/user-main-grid/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar user main grid:', error);
      throw error;
    }
  }

  async getByCategoryId(categoryId?: number) {
    try {
      const response = await designflixApi.get(
        `/user-main-grid/categories/filter?categoryId=${categoryId}`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar user main grid por categoria:', error);
      throw error;
    }
  }

  async getTotalFilesByUserId(user_id?: number) {
    try {
      const response = await designflixApiInterceptors.get(
        `/user-main-grid/${user_id}/count`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar user main grid por categoria:', error);
      throw error;
    }
  }
}
