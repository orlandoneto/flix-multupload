import React, { useEffect, useState } from 'react';
import { Modal, Section, Tag, TagVariant, UpdateImagesPackForm } from '~/components';
import { UserMainGridService } from '~/services';
import { useUserDataCache } from '~/utils/hook';
import { GalleryContainer, ImageWrapper, NoItemsMessage } from './styles';

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
  categories: Category[];
  tags: Tag[];
  activite: boolean;
}

export const ImageUserGallery: React.FC = () => {
  const user = useUserDataCache();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageGalery, setImageGalery] = useState<Item[]>([]);

  useEffect(() => {
    if (user.id) {
      getImagesGallery();
    }
  }, [user]);

  async function getImagesGallery() {
    try {
      setIsLoading(true);
      const userMainGridService = new UserMainGridService();
      const responseMainGrid = await userMainGridService.getAllImagesByUserId(user.id as number);
      setImageGalery(responseMainGrid.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao obter imagens:', error);
      setIsLoading(false);
    }
  }

  const titleModal = "Atualizar arquivo"
  const disabledButtonOk = true;

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };
  const handleConfirm = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  const handleImageClick = (item: Item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  return (
    <GalleryContainer>
      {isLoading ? (
        <NoItemsMessage>Carregando...</NoItemsMessage>
      ) : imageGalery && imageGalery.length > 0 ? (
        imageGalery.map((item) => (
          <ImageWrapper
            key={item.id}
            onClick={() => handleImageClick(item)}
            style={{
              cursor: 'pointer',
              opacity: item.activite ? 0.4 : 1
            }}
          >
            <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}>
              <Tag variant={item.activite ? TagVariant.INATIVO : TagVariant.ATIVO} size="sm" />
            </div>
            <img src={item.url_thumb} alt={item.name} loading="lazy" />
          </ImageWrapper>
        ))
      ) : (
        <>
          <NoItemsMessage>Nenhum resultado encontrado para a busca.</NoItemsMessage>
        </>
      )}
      <Modal
        title={titleModal}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCancel={handleCloseModal}
        onConfirm={handleConfirm}
        disabledButtonOk={disabledButtonOk}
      >
        <Section width="100%">
          {selectedItem ? (
            <div style={{ width: '100%', marginBottom: "10px" }}>
              <img
                src={selectedItem.url_thumb}
                alt={selectedItem.name}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover"
                }}
              />
              <div style={{ color: "#6e7175" }}>
                <strong>Nome:</strong> {selectedItem.name}
              </div>
              <hr style={{ color: "#6e7175" }} />
            </div>
          ) : <></>}
          {selectedItem && (
            <UpdateImagesPackForm
              key={selectedItem.id}
              idImage={selectedItem.id}
              idActivite={selectedItem.activite}
              onSuccess={(updatedItem: Item) => {
                setImageGalery(prev =>
                  prev.map(item => item.id === updatedItem.id ? updatedItem : item)
                );
                setModalOpen(false);
              }}
            />
          )}
        </Section>
      </Modal>
    </GalleryContainer>
  );
};