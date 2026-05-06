import { designflixApiInterceptors } from '../api';

export class S3DownloaService {
  async getSignedUrl(key: string) {
    try {
      const response = await designflixApiInterceptors.get(`/signed/url?key=${key}`);
      return response.data.data.url;
    } catch (error) {
      console.error('Erro ao obter URL pré-assinada:', error);
      throw error;
    }
  }
}
