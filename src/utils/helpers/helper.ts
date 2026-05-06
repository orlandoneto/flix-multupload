import { AxiosError } from 'axios';
import { TypeOptions } from 'react-toastify';

export function escapeHtml(text: string): string {
  return text.replace(/[<&>"']/g, (match) => {
    switch (match) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#039;';
      default:
        return match;
    }
  });
}

interface CustomErrorResponse {
  message: string;
}

interface CustomSuccessResponse {
  error: unknown;
  axios: any;
  message?: string;
  showMessage: (message: string, type: TypeOptions) => void;
}

export function handleAxiosError({
  error,
  axios,
  message,
  showMessage,
}: CustomSuccessResponse): void {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<CustomErrorResponse>;
    if (axiosError.response && axiosError.response.data) {
      if (message) {
        showMessage(`${message}. 😔`, 'error');
      } else {
        showMessage(`${axiosError.response.data.message}. 😔`, 'error');
      }
    } else {
      showMessage('Houve um problema ao se logar. 😔', 'error');
    }
  } else {
    showMessage('Houve um problema ao se logar. 😔', 'error');
  }
}

export const clearDigits = (text: string) => {
  return text.replace(/\D/g, '');
};

export const currentBaseurl = (path: string) => {
  return `${window.location.origin}/${path}`;
};

export const extractKeyFromUrl = (url: string) => {
  const parts = url.split('amazonaws.com/')[1];
  if (!parts) {
    throw new Error('URL inválida; não foi possível extrair a chave.');
  }

  const key = parts.replace('images/undefined/', 'images/').trim();
  return key;
};

export function parseCurrencyToNumber(currencyString: string) {
  return parseFloat(currencyString.replace('R$', '').replace(',', '.').trim());
}

export const downloadFile = (url: string, nameImage?: string) => {
  const onlyUrl = url.split('?')[0];
  const extension = onlyUrl.substring(url.lastIndexOf('/') + 1).split('.')[1];
  fetch(url, { method: 'GET' })
    .then((response) => response.blob())
    .then((blob) => {
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = nameImage + '.' + extension;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    })
    .catch((error) => console.error('Erro ao baixar o arquivo:', error));
};

export const isImageUrl = (url: string): boolean => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
  return imageExtensions.some((extension) => url.endsWith(extension));
};

export const cleanByFullSearchText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

export const truncateWithEllipsis = (text: string, maxLength = 22): { short: string; full: string } => {
  if (!text) return { short: '', full: '' };
  if (text.length <= maxLength) return { short: text, full: text };
  return { short: text.slice(0, Math.max(0, maxLength - 3)) + '...', full: text };
};