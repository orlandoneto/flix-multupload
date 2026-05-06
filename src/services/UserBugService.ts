import { designflixApiInterceptors } from '../api';

export class UserBugService {
  async create(data: any) {
    try {
      const response = await designflixApiInterceptors.post('/user/bug', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar user bug:', error);
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await designflixApiInterceptors.get('/user/bug');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar user bugs:', error);
      throw error;
    }
  }

  async getById(id: number) {
    try {
      const response = await designflixApiInterceptors.get(`/user/bug/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter user bug com ID ${id}:`, error);
      throw error;
    }
  }

  async updateById(id: number, data: any) {
    try {
      const response = await designflixApiInterceptors.put(`/user/bug/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar user bug com ID ${id}:`, error);
      throw error;
    }
  }

  async deleteById(id: number) {
    try {
      const response = await designflixApiInterceptors.delete(`/user/bug/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar user bug com ID ${id}:`, error);
      throw error;
    }
  }
}
