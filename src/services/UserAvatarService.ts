import { designflixApi } from '../api/designflix-api';

export class UserAvatarService {
  async getAll() {
    try {
      const response = await designflixApi.get("/user-photos");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar todos os avatares", error);
      throw error;
    }
  }

  async removePhoto(userId: number) {
    try {
      const response = await designflixApi.delete(`/user/${userId}/photo`);
      return response.data;
    } catch (error) {
      console.error("Erro ao remover foto do usuário", error);
      throw error;
    }
  }
}