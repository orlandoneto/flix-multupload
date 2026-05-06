import { designflixApiInterceptors } from '../api';

export class UserFavoritesService {
  async create(data: any) {
    try {
      const response = await designflixApiInterceptors.post('/user/favorites', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar user favorite:', error);
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await designflixApiInterceptors.get('/user/favorites');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar user favorites:', error);
      throw error;
    }
  }

  async getById(user_id: number, user_main_grid_id: number) {
    try {
      const response = await designflixApiInterceptors.get(
        `/user/favorites/${user_id}/main_grid/${user_main_grid_id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter user favorite com ID ${user_id}:`, error);
      throw error;
    }
  }

  async updateById(id: number, data: any) {
    try {
      const response = await designflixApiInterceptors.put(`/user/favorites/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar user favorite com ID ${id}:`, error);
      throw error;
    }
  }

  async deleteById(user_id: number, user_main_grid_id: number) {
    try {
      const response = await designflixApiInterceptors.delete(
        `/user/favorites/${user_id}/main_grid/${user_main_grid_id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar user favorite com ID ${user_id}:`, error);
      throw error;
    }
  }
}
