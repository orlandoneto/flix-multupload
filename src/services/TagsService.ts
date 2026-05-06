import { designflixApi } from '../api/designflix-api';

export class TagsService {
  async getAllTags() {
    try {
      const response = await designflixApi.get('/tags');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar tagss:', error);
      throw error;
    }
  }

  async deleteTag(id: number) {
    try {
      const response = await designflixApi.delete(`/tags/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar tags com ID ${id}:`, error);
      throw error;
    }
  }
}
