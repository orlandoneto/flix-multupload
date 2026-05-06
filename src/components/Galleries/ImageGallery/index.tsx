import { Masonry } from 'masonic';
import React, { useCallback, useEffect, useState } from 'react';
import { Tag } from '~/components/Fragments/Tags';
import { MasonryWrapper } from './styles';



// Estilos adicionais para resolver o problema do espaço vazio
const additionalStyles = `
  .masonic-grid {
    width: 100% !important;
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: flex-start !important;
    align-items: flex-start !important;
  }
  
  .masonic-grid > div {
    width: 100% !important;
    flex: 1 1 auto !important;
    min-width: 0 !important;
  }
  
  .masonic-grid > div > div {
    margin: 6px !important;
    width: calc(100% - 12px) !important;
  }
  
  @media (max-width: 1200px) {
    .masonic-grid > div > div {
      margin: 4px !important;
      width: calc(100% - 8px) !important;
    }
  }
  
  @media (max-width: 768px) {
    .masonic-grid > div > div {
      margin: 3px !important;
      width: calc(100% - 6px) !important;
    }
  }
`;

interface Category {
  id: number;
  name: string;
  active: number;
}

interface Tag {
  id: number;
  name: string;
}

interface Item {
  id: number;
  name: string;
  url_thumb: string;
  url: string;
  url_cover: string;
  categories: Category[];
  tags: Tag[];
  user: User;
  contributor_id: number;
  contributor_admin_id: number;
  format?: string;
  type: string;
}

// Página de Download substitui o modal; tipos auxiliares removidos

interface ImageGalleryProps {
  items?: Item[] | null;
  downloadMode?: 'free' | 'premium';
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ items, downloadMode = 'premium' }) => {

  // Mantido para compat com futuras necessidades, mas não utilizado após migração do modal para página

  // Estados do antigo modal removidos após migração para página
  const [loading, setLoading] = useState(false);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);

  const openPageDownload = (item: Item) => {
    try {
      localStorage.setItem('download_item', JSON.stringify(item));
    } catch { }
    const isGratis = (item.format || '').toUpperCase() === 'GRATIS';
    const basePath = isGratis ? '/download-free' : (downloadMode === 'free' ? '/download-free' : '/download');
    window.open(`${basePath}/${item.id}`, '_blank', 'noopener');
  };

  // sem estado de modal aqui

  // Função para pegar dimensões reais da imagem
  const getImageDimensions = (url: string) =>
    new Promise<{ width: number; height: number }>((resolve) => {
      const img = new window.Image();
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = () => resolve({ width: 800, height: 600 });
      img.src = url;
    });

  useEffect(() => {
    let isMounted = true;
    if (!items || items.length === 0) {
      setGalleryItems([]);
      return;
    }
    setLoading(true);
    Promise.all(
      items.map(async (item, idx) => {
        try {
          const { width, height } = await getImageDimensions(item.url_thumb);
          return {
            ...item,
            width,
            height,
            _itemIndex: idx,
          };
        } catch (error) {
          // Fallback para dimensões padrão se falhar
          return {
            ...item,
            width: 800,
            height: 600,
            _itemIndex: idx,
          };
        }
      })
    ).then((imgs) => {
      if (isMounted) setGalleryItems(imgs);
      setLoading(false);
    }).catch(() => {
      if (isMounted) {
        // Fallback se falhar completamente
        setGalleryItems(items.map((item, idx) => ({
          ...item,
          width: 800,
          height: 600,
          _itemIndex: idx,
        })));
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [items]);

  const renderCard = useCallback(
    ({ data }: { data: Item & { width: number; height: number; _itemIndex: number } }) => (
      <div
        style={{
          margin: 6,
          borderRadius: 8,
          overflow: 'hidden',
          background: '#18181b',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          position: 'relative'
        }}
        onClick={() => openPageDownload(data)}
      >
        {data.format && (
          <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}>
            <Tag format={data.format} size="sm" />
          </div>
        )}
        <img
          src={data.url_thumb}
          alt={data.name}
          style={{
            width: '100%',
            display: 'block',
            borderRadius: 8,
            background: '#18181b',
          }}
        />
      </div>
    ),
    []
  );

  // Calcular o número de colunas baseado no número de itens
  const getColumnCount = () => {
    if (!galleryItems || galleryItems.length === 0) return 6;
    if (galleryItems.length < 6) return Math.max(1, galleryItems.length);
    return 6;
  };

  // Aplicar estilos adicionais quando o componente for montado
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = additionalStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <>
      {loading ? (
        <div style={{ color: '#fff', textAlign: 'center', padding: 20 }}>Carregando imagens...</div>
      ) : (
        <MasonryWrapper>
          <Masonry
            items={galleryItems}
            columnGutter={12}
            columnCount={getColumnCount()}
            render={renderCard}
            overscanBy={2}
            // Adicionar propriedades para melhor controle do layout
            key={galleryItems.length} // Forçar re-render quando o número de itens mudar
          />
        </MasonryWrapper>
      )}
      {/* Modal substituído por navegação para página de download */}
    </>
  );
};