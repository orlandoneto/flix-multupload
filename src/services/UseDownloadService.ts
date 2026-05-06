import { designflixApiInterceptors } from '../api';

export class UseDownloadService {
  async incrementDownloads(
    user_id: number,
    contributor_image_user_id: number,
    user_main_grid_id: number
  ) {
    try {
      const response = await designflixApiInterceptors.post(`/user/downloads/increment`, {
        user_id,
        contributor_image_user_id,
        user_main_grid_id,
      });
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao incrementar total de downloads para user ID ${user_id} e contributor ID ${contributor_image_user_id}:`,
        error
      );
      throw error;
    }
  }

  async getTotalDownloadsByContributor(contributor_image_user_id: number) {
    try {
      const response = await designflixApiInterceptors.get(
        `/user/downloads/contributor/${contributor_image_user_id}/total`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao obter total de downloads para contributor ID ${contributor_image_user_id}:`,
        error
      );
      throw error;
    }
  }
}
