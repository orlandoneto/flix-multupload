import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import 'react-tagsinput/react-tagsinput.css';
import { InferType } from 'yup';
import { cleanByFullSearchText } from '~/utils';
import { selectStyles } from '~/utils/constants';
import { updateSchema } from '~/utils/validations/login-schema';
import {
  CategoryService,
  UserMainGridService,
} from '../../../services';
import { useApp, useToast } from '../../../utils/hook';
import { LocalStorageForm, LocalStorageUser } from '../../../utils/store';
import {
  Button,
  Checkbox,
  ErrorMessage,
  Form,
  FormGroup,
  Input,
  InputWrapper,
  Label,
  SelectWrapper
} from './styles';

interface Item {
  id: number;
  name: string;
  url_thumb: string;
  url: string;
  categories: { id: number; name: string; active: number }[];
  tags: { id: number; name: string }[];
  activite: boolean;
}

interface Props {
  idImage: number;
  idActivite: boolean;
  backgroundColor?: string;
  onSuccess?: (updatedItem: Item) => void;
}

type FormValues = InferType<typeof updateSchema>;

export const UpdateImagesPackForm = ({ idImage, idActivite, backgroundColor, onSuccess }: Props) => {
  const { showMessage } = useToast();
  const { hasNewUpload } = useApp();

  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryLimitReached, setCategoryLimitReached] = useState(false);
  const [categories, setCategories] = useState<Array<{ value: string; label: string }>>([]);

  const userMainGridService = new UserMainGridService();
  const categoryService = new CategoryService();
  const storedData = LocalStorageForm.getFormData();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(updateSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      categories: [],
      tags: [],
      disableContent: false,
    },
  });

  useEffect(() => {
    setValue('disableContent', idActivite);
  }, [idActivite, setValue]);

  const handleChangeTags = (newTags: string[]) => setTags(newTags);

  async function getAllCategory() {
    const result = await categoryService.getAll();
    const formattedCategories = result.data.map((category: any) => ({
      value: String(category.id),
      label: category.name,
    }));

    setCategories(formattedCategories);
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    if (storedData) {
      reset(storedData);
    }
  }, [reset]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const user = await LocalStorageUser.getUserData();
      if (data && user) {
        const dataValues = {
          name: data.title,
          user_id: user?.id,
          categories: data.categories,
          tags: data.tags,
          activite: data.disableContent
        };

        const transCategoriesString = dataValues.categories
          .map((category: any) => category.label)
          .join(', ');
        const transTagsString = dataValues.tags.join(', ');

        const responseMainGrid = await userMainGridService.update(idImage,
          {
            ...dataValues,
            terms:
              cleanByFullSearchText(
                dataValues.name + ', ' + transCategoriesString + ', ' + transTagsString
              ),
          });

        if (responseMainGrid) {
          hasNewUpload(true);
          reset();
          showMessage('Dados atualizados com sucesso!', 'success');
          if (onSuccess) {
            onSuccess(responseMainGrid);
          }
        } else {
          showMessage('Não foi possível atualizar os dados', 'error');
        }
      } else {
        showMessage('Houve um erro no formulário', 'error');
      }
    } catch (error) {
      showMessage('Houve um erro ao tentar atualizar os dados. Tente novamente', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (selectedOptions: any) => {
    if (selectedOptions.length > 2) {
      setCategoryLimitReached(true);
      return;
    }
    setCategoryLimitReached(false);
    setValue('categories', selectedOptions, { shouldValidate: true });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} backgroundColor={backgroundColor}>
      <FormGroup>
        <Label>
          Título do Arquivo<span>*</span>
        </Label>
        <Input {...register('title')} />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label>
          Categorias<span>*</span>
        </Label>
        <Controller
          name="categories"
          defaultValue={[]}
          control={control}
          render={({ field }) => (
            <SelectWrapper>
              <Select
                {...field}
                styles={selectStyles}
                options={categories}
                isMulti
                placeholder="Selecione as categorias"
                onChange={(selectedOptions) => {
                  handleCategoryChange(selectedOptions);
                  field.onChange(selectedOptions);
                }}
              />
            </SelectWrapper>
          )}
        />
        {categoryLimitReached && (
          <ErrorMessage>Você pode selecionar no máximo 2 categorias.</ErrorMessage>
        )}
        {errors.categories && <ErrorMessage>{errors.categories.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label>
          Tags<span>*</span>
        </Label>
        <Controller
          name="tags"
          control={control}
          defaultValue={tags}
          render={({ field }) => (
            <SelectWrapper>
              <InputWrapper
                value={field.value || []}
                onChange={(newTags: string[]) => {
                  field.onChange(newTags);
                  handleChangeTags(newTags);
                }}
                inputProps={{ placeholder: 'Adicione uma tag e tecle enter' }}
              />
            </SelectWrapper>
          )}
        />
        {errors.tags && <ErrorMessage>{errors.tags.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label>
          <Checkbox type="checkbox" {...register('disableContent')} />
          <span>Desativar conteúdo?</span>
        </Label>
        {errors.disableContent && <ErrorMessage>{errors.disableContent.message}</ErrorMessage>}
      </FormGroup>

      <Button disabled={loading} type="submit">Atualizar</Button>
    </Form>
  );
};
