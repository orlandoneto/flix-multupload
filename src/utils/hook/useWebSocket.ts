import { useEffect } from 'react';

interface WebSocketMessageEvent extends MessageEvent {
  data: string;
}

interface UseWebSocketProps {
  (data: any): void;
}

export const useWebSocket = (onMessage: UseWebSocketProps): void => {
  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);

    ws.onopen = () => {
      console.log('Conectado ao WebSocket');
    };

    ws.onmessage = (event: WebSocketMessageEvent) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    ws.onclose = () => {
      console.log('WebSocket desconectado');
    };

    ws.onerror = (error: Event) => {
      console.error('Erro no WebSocket:', error);
    };

    return () => {
      ws.close();
    };
  }, [onMessage]);
};
