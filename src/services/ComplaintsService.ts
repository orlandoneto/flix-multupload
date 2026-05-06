import { designflixApiInterceptors } from '../api';

export class ComplaintsService {
  async create(data: any) {
    try {
      const response = await designflixApiInterceptors.post('/complaints', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar complaints:', error);
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await designflixApiInterceptors.get('/complaints');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar complaints:', error);
      throw error;
    }
  }

  async getById(id: number) {
    try {
      const response = await designflixApiInterceptors.get(`/complaints/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter co com ID ${id}:`, error);
      throw error;
    }
  }

  async updateById(id: number, data: any) {
    try {
      const response = await designflixApiInterceptors.put(`/complaints/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar co com ID ${id}:`, error);
      throw error;
    }
  }

  async deleteById(id: number) {
    try {
      const response = await designflixApiInterceptors.delete(`/complaints/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar co com ID ${id}:`, error);
      throw error;
    }
  }
}
