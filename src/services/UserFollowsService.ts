import { designflixApiInterceptors } from '../api';

export class UserFollowsService {
  async create(
    user_id: number,
    contributor_image_user_id: number,
    contributor_image_admin_id?: number
  ) {
    try {
      const response = await designflixApiInterceptors.post('/user/follows', {
        user_id,
        contributor_image_user_id,
        contributor_image_admin_id,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar UserFollows:', error);
      throw error;
    }
  }

  async geIsFollowers(
    user_id: number,
    contributor_image_user_id: number,
    contributor_image_admin_id: number
  ) {
    try {
      const response = await designflixApiInterceptors.get(
        `/api/follow/status/${user_id}/${contributor_image_user_id}/${contributor_image_admin_id}`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao obter total de seguidores:', error);
      throw error;
    }
  }

  async getTotalFollowers(contributor_image_user_id: number) {
    try {
      const response = await designflixApiInterceptors.get(
        `/user/follows/${contributor_image_user_id}/total`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao obter total de seguidores:', error);
      throw error;
    }
  }
}
