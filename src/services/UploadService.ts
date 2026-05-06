import { designflixApi } from '../api/designflix-api';

export class UploadService {
  // MÉTODO MANTIDO - ainda faz sentido para avatar de perfil
  async uploadImageAvatar(file: File) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await designflixApi.post('/upload/avatar/site', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao salvar imagem de perfil:', error);
      throw error;
    }
  }

  // MÉTODO MANTIDO - ainda faz sentido para thumbnails
  async uploadImageThumb(file: File) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await designflixApi.post('/upload/thumb', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao salvar imagem de capa:', error);
      throw error;
    }
  }

  // MÉTODO MANTIDO - ainda faz sentido para previews
  async uploadImagePreview(file: File) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await designflixApi.post('/upload/preview', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao salvar imagem de capa:', error);
      throw error;
    }
  }

  // MÉTODO NÃO FAZ MAIS SENTIDO - substituído por uploadMultipleFiles
  // async uploadImageJpeg(file: File) {
  //   try {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     const response = await designflixApi.post('/upload/jpeg', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     return response.data;
  //   } catch (error) {
  //     console.error('Erro ao salvar imagem:', error);
  //     throw error;
  //   }
  // }

  // MÉTODO MANTIDO - usado para upload individual de ZIP
  async uploadZip(file: File) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await designflixApi.post('/upload/zip', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao salvar arquivo ZIP:', error);
      throw error;
    }
  }

  // NOVO MÉTODO - Upload múltiplo usando endpoint unificado
  async uploadMultipleFiles(files: File[], categoryId: string, categoryName: string, userId: string) {
    try {
      const formData = new FormData();

      // Adicionar dados do usuário e categoria
      formData.append('user_id', userId);
      formData.append('categoryName', categoryName);
      formData.append('categoryId', categoryId);

      // Adicionar todos os arquivos
      files.forEach((file) => {
        formData.append('files', file);
      });

      const response = await designflixApi.post('/unified-upload/multiple', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return {
        success: true,
        data: response.data,
        results: response.data.results || []
      };
    } catch (error) {
      console.error('Erro ao fazer upload múltiplo unificado:', error);
      throw error;
    }
  }
}
