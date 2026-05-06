import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-easy-crop';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { Routes } from '~/routes/routes';
import { UploadService, UserAvatarService } from '../../../services';
import { useAuth, useToast, useUserDataCache } from '../../../utils/hook';
import { handleAxiosError } from '../../../utils/index';
import { Button, Controls, CropArea, ErrorMessage, FileName, Form, FormGroup, Label, Range, UploadArea } from './styles';

const schema = yup.object().shape({
  files: yup
    .array()
    .of(
      yup.mixed<File>().test('fileFormat', 'Formato de arquivo não suportado', (value) => {
        return value && value instanceof File;
      })
    )
    .min(1, 'Arquivo é obrigatório de imagem'),
});

interface IUploadProfileFormProps {
  handleCloseModal: () => void;
}

export const UploadProfileForm: React.FC<IUploadProfileFormProps> = ({ handleCloseModal }) => {
  const { showMessage } = useToast();
  const { updateUser } = useAuth();
  const navigate = useNavigate();
  const user: User = useUserDataCache();

  const userType = 'user';

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [fileName, setFileName] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const avatarService = new UserAvatarService();

  type Area = { width: number; height: number; x: number; y: number };

  const onCropComplete = (_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const createImage = (url: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const getCroppedFile = async (imageUrl: string, cropPixels: Area, _outFileName: string) => {
    const image = await createImage(imageUrl);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not available');
    canvas.width = cropPixels.width;
    canvas.height = cropPixels.height;
    ctx.drawImage(
      image,
      cropPixels.x,
      cropPixels.y,
      cropPixels.width,
      cropPixels.height,
      0,
      0,
      cropPixels.width,
      cropPixels.height
    );
    const fileNameSafe = `avatar-${uuidv4()}.jpg`;

    return new Promise<File>((resolve) => {
      canvas.toBlob((blob) => {
        const finalBlob = blob as Blob;
        resolve(new File([finalBlob], fileNameSafe, { type: 'image/jpeg' }));
      }, 'image/jpeg');
    });
  };

  const getSafeNameFromFile = (file: File) => {
    const extensionFromName = file.name.split('.').pop()?.toLowerCase();
    let extension = extensionFromName ? `.${extensionFromName}` : '';
    if (!extension) {
      if (file.type === 'image/png') extension = '.png';
      else if (file.type === 'image/jpeg' || file.type === 'image/jpg') extension = '.jpg';
      else extension = '.jpg';
    }
    return `avatar-${uuidv4()}${extension}`;
  };

  const onSubmit = async (data: any) => {
    try {
      let canProceed = false;

      if (data && user) {
        const fileToUpload: File =
          imageSrc && croppedAreaPixels
            ? await getCroppedFile(imageSrc, croppedAreaPixels, fileName || 'avatar.jpg')
            : new File([data.files[0]], getSafeNameFromFile(data.files[0]), { type: data.files[0].type });
        // Remove avatar anterior ANTES de incluir um novo
        try {
          const removeResponse = await avatarService.removePhoto(user.id || 0);
          canProceed = !!removeResponse?.success;
        } catch (err) {
          if (axios.isAxiosError(err)) {
            // Ignora 404 (usuário sem foto prévia); permite prosseguir
            if (err.response?.status === 404) {
              canProceed = true;
            } else {
              throw err;
            }
          } else {
            throw err;
          }
        }

        if (!canProceed) {
          showMessage('Não foi possível remover a foto anterior', 'error');
          return;
        }

        if (canProceed) {
          const upload = new UploadService();
          const { data: result } = await upload.uploadImageAvatar(fileToUpload);

          if (!result?.url) {
            showMessage('Não foi possível gravar imagem', 'error');
            return;
          }

          const dataValues = {
            photo: result?.url,
            success: true,
          };

          if (data && user) {
            const result = await updateUser(dataValues, user.id || 0, userType);
            if (result) {
              setTimeout(() => {
                navigate(Routes.PROFILE);
                window.location.reload();
              }, 500);
              showMessage('Imagem de perfil atualizada com sucesso!', 'success');
              handleCloseModal();
            }
          }
        }
      }
    } catch (error) {
      handleAxiosError({
        error,
        axios,
        showMessage,
        message: 'Houve um erro ao tentar gravar a imagem. Tente novamente',
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles: File[]) => {
      setValue('files', acceptedFiles, { shouldValidate: true });
      const first = acceptedFiles[0];
      setFileName(first ? first.name : null);
      if (first) {
        const objectUrl = URL.createObjectURL(first);
        setImageSrc(objectUrl);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
      }
    },
    noClick: true,
    noKeyboard: true,
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <UploadArea {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Arraste sua foto: .PNG ou .JPG</p>
        </UploadArea>
        {fileName && <FileName>{fileName}</FileName>}
        {errors.files && <ErrorMessage>{errors.files.message}</ErrorMessage>}

        {imageSrc && (
          <>
            <CropArea>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </CropArea>
            <Controls>
              <Label>Zoom</Label>
              <Range
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setZoom(Number(e.target.value))}
              />
            </Controls>
          </>
        )}
      </FormGroup>

      <Button type="submit">Salvar foto</Button>
    </Form>
  );
};
