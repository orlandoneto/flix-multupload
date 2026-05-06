import Uppy from '@uppy/core';
import { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Select, { createFilter } from 'react-select';
import { ButtonLoading } from '~/components/Buttons/ButtonLoading';
import { selectStyles } from '~/utils/constants';
import { MultipleUploadFormData, validateMultipleUpload } from '~/utils/validations/multiple-upload-schema';
import {
  CategoryService,
  UploadService,
} from '../../../services';
import { useToast } from '../../../utils/hook';
import { LocalStorageForm, LocalStorageUser } from '../../../utils/store';
import {
  CategoryRequired,
  ErrorMessage,
  FileActions,
  FileInfo,
  FileItem,
  FileList,
  FileName,
  Form,
  FormGroup,
  HelperText,
  Label,
  SelectWrapper,
  UploadArea
} from './styles';

interface Props {
  backgroundColor?: string;
}

export const UploadImagesPackForm = ({ backgroundColor }: Props) => {
  const { showMessage } = useToast();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Array<{ value: string; label: string }>>([]);
  const [selectedCategory, setSelectedCategory] = useState<{ value: string; label: string } | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [fileCount, setFileCount] = useState(0);

  const uppyRef = useRef<Uppy | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const isOpeningFileDialogRef = useRef(false);

  const categoryService = new CategoryService();
  const upload = new UploadService();
  const storedData = LocalStorageForm.getFormData();

  const maxFiles = 40;
  const maxSize = 600 * 1024 * 1024; // 600MB

  // Inicializar Uppy
  useEffect(() => {
    if (!uppyRef.current) {
      uppyRef.current = new Uppy({
        restrictions: {
          maxFileSize: maxSize,
          maxNumberOfFiles: maxFiles,
          allowedFileTypes: [
            'application/zip',
            'application/x-zip-compressed',
            'application/x-rar',
            'application/x-7z-compressed',
            'application/x-compressed'
          ]
        }
      });

      // Eventos do Uppy
      uppyRef.current.on('file-added', (file) => {
        console.log('Arquivo adicionado:', file.name);
        validateForm();
        try { setFileCount(Object.keys(uppyRef.current!.getState().files).length); } catch (_) { }
      });

      uppyRef.current.on('file-removed', () => {
        console.log('Arquivo removido');
        validateForm();
        try { setFileCount(Object.keys(uppyRef.current!.getState().files).length); } catch (_) { }
      });
    }

    return () => {
      if (uppyRef.current) {
        try {
          (uppyRef.current as any).close({ reason: 'unmount' });
        } catch (_) { }
        uppyRef.current = null;
      }
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  // Função para adicionar arquivos ao Uppy
  const addFilesToUppy = (files: FileList) => {
    if (!uppyRef.current) {
      console.error('Uppy não está inicializado');
      showMessage('Erro interno: Upload não está disponível', 'error');
      return;
    }

    console.log(`Adicionando ${files.length} arquivos ao Uppy`);

    let successCount = 0;
    let errorCount = 0;

    Array.from(files).forEach((file, index) => {
      console.log(`Processando arquivo ${index + 1}/${files.length}: ${file.name}`);
      console.log(`Tipo: ${file.type}, Tamanho: ${(file.size / 1024 / 1024).toFixed(2)} MB`);

      // Verificar se é um arquivo compactado
      const allowedTypes = [
        'application/zip',
        'application/x-zip-compressed',
        'application/x-rar',
        'application/x-7z-compressed',
        'application/x-compressed'
      ];

      // Verificar extensão do arquivo
      const hasValidExtension = file.name.match(/\.(zip|rar|7z)$/i);
      const hasValidType = allowedTypes.includes(file.type);

      console.log(`Extensão válida: ${hasValidExtension}, Tipo válido: ${hasValidType}`);

      if (hasValidExtension || hasValidType) {
        try {
          // Verificar se o arquivo já existe
          const existingFiles = Object.values(uppyRef.current!.getState().files);
          const fileExists = existingFiles.some(f => f.name === file.name);

          if (fileExists) {
            console.log(`Arquivo ${file.name} já existe, pulando...`);
            showMessage(`Arquivo ${file.name} já foi adicionado`, 'warning');
            return;
          }

          // Adicionar arquivo ao Uppy
          const uppyFile = {
            name: file.name,
            type: file.type || 'application/octet-stream',
            data: file,
            size: file.size
          };

          uppyRef.current!.addFile(uppyFile);
          console.log(`✅ Arquivo adicionado com sucesso: ${file.name}`);
          successCount++;

        } catch (error) {
          console.error(`❌ Erro ao adicionar arquivo ${file.name}:`, error);
          showMessage(`Erro ao processar arquivo ${file.name}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`, 'error');
          errorCount++;
        }
      } else {
        console.log(`⚠️ Arquivo ${file.name} não é um arquivo compactado válido`);
        showMessage(`Arquivo ${file.name} não é um arquivo compactado válido (ZIP, RAR, 7Z)`, 'error');
        errorCount++;
      }
    });

    // Mostrar resumo
    if (successCount > 0) {
      console.log(`✅ ${successCount} arquivos adicionados com sucesso`);
      if (errorCount > 0) {
        showMessage(`${successCount} arquivos adicionados, ${errorCount} com erro`, 'warning');
      } else {
        showMessage(`${successCount} arquivos adicionados com sucesso!`, 'success');
      }
    }

    // Atualizar contador e validar após adicionar arquivos
    setTimeout(() => {
      try { setFileCount(Object.keys(uppyRef.current!.getState().files).length); } catch (_) { }
      validateForm();
    }, 100);
  };

  // Adicionar eventos de drag & drop e clique COM LIMPEZA
  useEffect(() => {
    const uploadArea = document.getElementById('drag-drop-area');
    if (!uploadArea) return;

    const handleClick = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();

      if (isOpeningFileDialogRef.current) return;

      if (!selectedCategory) {
        showMessage('Selecione uma categoria primeiro', 'error');
        return;
      }

      isOpeningFileDialogRef.current = true;

      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      input.accept = '.zip,.rar,.7z,application/zip,application/x-zip-compressed,application/x-rar,application/x-7z-compressed,application/x-compressed';

      input.onchange = (e) => {
        const files = (e.target as HTMLInputElement).files;
        if (files && files.length > 0) {
          addFilesToUppy(files);
        }
        setTimeout(() => {
          isOpeningFileDialogRef.current = false;
        }, 200);
      };

      input.oncancel = () => {
        setTimeout(() => {
          isOpeningFileDialogRef.current = false;
        }, 200);
      };

      input.click();
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      uploadArea.style.borderColor = '#ffffff';
      uploadArea.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)';
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      uploadArea.style.borderColor = '#ffffff';
      uploadArea.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)';
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!selectedCategory) {
        showMessage('Selecione uma categoria primeiro', 'error');
        return;
      }

      uploadArea.style.borderColor = '#ffffff';
      uploadArea.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)';

      const files = e.dataTransfer?.files;
      if (files) addFilesToUppy(files);
    };

    uploadArea.addEventListener('click', handleClick);
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);

    console.log('✅ Eventos de drag & drop configurados');

    return () => {
      uploadArea.removeEventListener('click', handleClick);
      uploadArea.removeEventListener('dragover', handleDragOver);
      uploadArea.removeEventListener('dragleave', handleDragLeave);
      uploadArea.removeEventListener('drop', handleDrop);
      console.log('🧹 Eventos de drag & drop removidos');
    };
  }, [selectedCategory, showMessage]);

  // Inicializar Web Worker
  useEffect(() => {
    workerRef.current = new Worker('/upload-worker.js');

    workerRef.current.onmessage = (e) => {
      const { type, results } = e.data;

      switch (type) {
        case 'progress':
          // progresso não exibido
          break;
        case 'validation':
          console.log('Validação em background:', results);
          break;
        case 'complete':
          console.log('Processamento completo');
          break;
      }
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  async function getAllCategory() {
    try {
      const result = await categoryService.getAll();
      const formattedCategories = result.data.map((category: any) => ({
        value: String(category.id),
        label: category.name,
      }));

      setCategories(formattedCategories);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    if (storedData) {
      const normalizedStored = {
        ...storedData,
        categories: Array.isArray(storedData.categories)
          ? storedData.categories
          : storedData.categories
            ? [storedData.categories]
            : [],
      } as any;

      if (normalizedStored.categories && normalizedStored.categories.length > 0) {
        setSelectedCategory(normalizedStored.categories[0]);
      }
    }
  }, [storedData]);

  const validateForm = () => {
    if (!uppyRef.current) {
      console.warn('⚠️ Uppy não está disponível para validação');
      return false;
    }

    const files = Object.values(uppyRef.current.getState().files);

    // Se não há arquivos, não há o que validar
    if (files.length === 0) {
      setValidationErrors([]);
      return false;
    }

    // Verificar se categoria está selecionada
    if (!selectedCategory) {
      setValidationErrors(['Pelo menos uma categoria é obrigatória']);
      return false;
    }

    const formData: MultipleUploadFormData = {
      categories: [selectedCategory], // Sempre será um array com um item
      files: files.map(f => f.data as File)
    };

    const validation = validateMultipleUpload(formData);
    setValidationErrors(validation.errors);

    return validation.isValid;
  };

  const handleCategoryChange = (selectedOption: { value: string; label: string } | null) => {
    setSelectedCategory(selectedOption);
    // Limpar erros quando categoria é selecionada
    setValidationErrors([]);
    // Validar novamente se houver arquivos
    if (uppyRef.current && Object.keys(uppyRef.current.getState().files).length > 0) {
      validateForm();
    }
  };

  // Função auxiliar para recriar o Uppy
  const recreateUppy = () => {
    console.log('🔄 Recriando instância do Uppy...');

    // Fechar instância anterior do Uppy (remove plugins/listeners)
    if (uppyRef.current) {
      try {
        (uppyRef.current as any).close({ reason: 'unmount' });
      } catch (_) { }
      uppyRef.current = null;
    }

    // Recriar a instância do Uppy
    uppyRef.current = new Uppy({
      restrictions: {
        maxFileSize: maxSize,
        maxNumberOfFiles: maxFiles,
        allowedFileTypes: [
          'application/zip',
          'application/x-zip-compressed',
          'application/x-rar',
          'application/x-7z-compressed',
          'application/x-compressed'
        ]
      }
    });

    // Reconfigurar eventos do Uppy
    uppyRef.current.on('file-added', (file) => {
      console.log('✅ Arquivo adicionado:', file.name);
      validateForm();
      try { setFileCount(Object.keys(uppyRef.current!.getState().files).length); } catch (_) { }
    });

    uppyRef.current.on('file-removed', () => {
      console.log('🗑️ Arquivo removido');
      validateForm();
      try { setFileCount(Object.keys(uppyRef.current!.getState().files).length); } catch (_) { }
    });

    // Progresso do Uppy não exibido

    console.log('✅ Uppy recriado com sucesso!');
  };

  const removeFile = (fileId: string) => {
    if (!uppyRef.current) {
      console.warn('⚠️ Uppy não está disponível para remover arquivo');
      return;
    }

    try {
      uppyRef.current.removeFile(fileId);
      console.log('🗑️ Arquivo removido com sucesso');
      // Atualizar contador e validar novamente após remover arquivo
      setTimeout(() => {
        try { setFileCount(Object.keys(uppyRef.current!.getState().files).length); } catch (_) { }
        validateForm();
      }, 100);
    } catch (error) {
      console.error('❌ Erro ao remover arquivo:', error);
      showMessage('Erro ao remover arquivo. Tente novamente.', 'error');
    }
  };

  const onSubmit = async () => {
    if (!uppyRef.current) {
      showMessage('Erro interno: Upload não está disponível. Tente recarregar a página.', 'error');
      return;
    }

    if (!selectedCategory) {
      showMessage('Selecione uma categoria para continuar', 'error');
      return;
    }

    const files = Object.values(uppyRef.current.getState().files);
    if (!files || files.length === 0) {
      showMessage('Selecione pelo menos um arquivo para fazer upload', 'error');
      return;
    }

    // Verificar se todos os arquivos são válidos
    const validFiles = files.filter(f => f.data && f.data instanceof File);
    if (validFiles.length === 0) {
      showMessage('Nenhum arquivo válido encontrado. Tente selecionar os arquivos novamente.', 'error');
      return;
    }

    // Validar apenas se houver arquivos válidos
    if (validFiles.length > 0) {
      const isValid = validateForm();
      if (!isValid) {
        showMessage('Formulário inválido. Verifique os erros.', 'error');
        return;
      }
    }

    setLoading(true);
    try {
      const userData = await LocalStorageUser.getUserData();
      if (!userData) {
        showMessage('Usuário não autenticado', 'error');
        return;
      }

      // Usar Web Worker para processamento em background
      if (workerRef.current) {
        workerRef.current.postMessage({
          files: validFiles.map(f => f.data as File),
          categoryId: selectedCategory.value
        });
      }

      // Fazer upload múltiplo usando o novo endpoint unificado
      const uploadResult = await upload.uploadMultipleFiles(
        validFiles.map(f => f.data as File),
        selectedCategory.value,
        selectedCategory.label,
        userData.id
      );

      if (uploadResult && uploadResult.success) {
        showMessage(`${validFiles.length} arquivos compactados enviados com sucesso!`, 'success');

        // Limpar formulário e recriar o Uppy para permitir novos uploads
        recreateUppy();

        // Aguardar um momento para garantir que o Uppy seja recriado
        setTimeout(() => {
          setSelectedCategory(null);
          setValidationErrors([]);
        }, 100);
      } else {
        showMessage('Erro no upload de alguns arquivos. Verifique os detalhes.', 'error');
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      showMessage('Erro ao fazer upload dos arquivos. Tente novamente.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getFileList = () => {
    if (!uppyRef.current) {
      console.warn('⚠️ Uppy não está disponível para listar arquivos');
      return [];
    }
    return Object.values(uppyRef.current.getState().files);
  };

  return (
    <Form backgroundColor={backgroundColor}>
      <FormGroup>
        <Label>
          Categorias<span>*</span>
        </Label>
        <SelectWrapper>
          <Select
            styles={selectStyles as any}
            options={categories}
            value={selectedCategory}
            isClearable
            placeholder="Selecione a categoria"
            filterOption={createFilter({ ignoreAccents: true, ignoreCase: true, matchFrom: 'any' })}
            onChange={(option) => handleCategoryChange(option as any)}
          />
        </SelectWrapper>
        {!selectedCategory && (
          <CategoryRequired>Selecione uma categoria para continuar</CategoryRequired>
        )}
      </FormGroup>

      <FormGroup>
        <Label>
          Arquivos Compactados<span>*</span>
        </Label>
        <HelperText>
          Arraste até {maxFiles} arquivos compactados (ZIP, RAR, 7Z - máximo 300MB cada).
          {selectedCategory ? ' Categoria selecionada: ' + selectedCategory.label : ''}
        </HelperText>

        <UploadArea id="drag-drop-area">
          <div className="upload-content" style={{
            textAlign: 'center',
            color: selectedCategory ? '#ffffff' : '#a0a0a0',
            padding: '20px',
            fontSize: '14px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{ fontSize: '48px' }}>📁</div>
            <div style={{ color: '#FFFFFF' }}>{selectedCategory ? 'Arraste ou clique para selecionar' : 'Selecione uma categoria primeiro'}</div>
            {selectedCategory && fileCount > 0 && (
              <div style={{
                marginTop: '4px',
                color: '#da1b47',
                fontSize: '12px',
                fontWeight: 600
              }}>
                {fileCount} arquivo{fileCount > 1 ? 's' : ''} selecionado{fileCount > 1 ? 's' : ''}
              </div>
            )}
          </div>
        </UploadArea>

        {/* Barra de progresso não utilizada */}

        <FileList>
          {getFileList().map((file) => (
            <FileItem key={file.id}>
              <FileInfo>
                <FileName>{file.name || 'Arquivo sem nome'}</FileName>
                <span style={{ fontSize: '12px', color: '#da1b47' }}>
                  {file.size ? (file.size / 1024 / 1024).toFixed(2) : '0'} MB
                </span>
              </FileInfo>
              <FileActions>
                <FaTimes
                  style={{ cursor: 'pointer', color: '#ff2d55' }}
                  onClick={() => removeFile(file.id)}
                />
              </FileActions>
            </FileItem>
          ))}
        </FileList>

        {validationErrors.length > 0 && (
          <div>
            {validationErrors.map((error, index) => (
              <ErrorMessage key={index}>{error}</ErrorMessage>
            ))}
          </div>
        )}

        {/* Mostrar mensagem de categoria obrigatória apenas se não houver categoria selecionada */}
        {!selectedCategory && (
          <ErrorMessage>Selecione uma categoria para continuar</ErrorMessage>
        )}
      </FormGroup>

      <ButtonLoading
        type="button"
        loading={loading}
        disabled={!selectedCategory || getFileList().length === 0 || loading}
        onClick={onSubmit}
      />
    </Form>
  );
};