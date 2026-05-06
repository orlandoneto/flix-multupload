import { designflixApi } from '../api/designflix-api';

export class CategoryService {
  async create(data: any) {
    try {
      const response = await designflixApi.post('/categories', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      throw error;
    }
  }

  async getAllGrouped() {
    try {
      const response = await designflixApi.get('/categories/grouped');
      if (Array.isArray(response.data.data)) {
        return response.data.data;
      } else {
        console.error('A resposta não é um array!');
        return [];
      }
    } catch (error) {
      console.error('Erro ao listar categorias:', error);
      throw error;
    }
  }

  async getAllGroupedFilter(categoryName = '') {
    try {
      const response = await designflixApi.get('/categories/grouped/filter', {
        params: {
          categoryName: categoryName,
        },
      });

      if (Array.isArray(response.data.data)) {
        return response.data.data;
      } else {
        console.error('A resposta não é um array!');
        return [];
      }
    } catch (error) {
      console.error('Erro ao listar categorias:', error);
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await designflixApi.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar categorias:', error);
      throw error;
    }
  }

  async getById(id: number) {
    try {
      const response = await designflixApi.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter categoria com ID ${id}:`, error);
      throw error;
    }
  }

  async updateById(id: number, data: any) {
    try {
      const response = await designflixApi.put(`/categories/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar categoria com ID ${id}:`, error);
      throw error;
    }
  }

  async deleteById(id: number) {
    try {
      const response = await designflixApi.delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar categoria com ID ${id}:`, error);
      throw error;
    }
  }
}
