import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { bugReportAndComplaintSchema } from '../../../utils/validations/login-schema';
import { ErrorMessage, Form, FormGroup, Input, Label, TextArea } from './styles';

interface Props {
  backgroundColor?: string;
  formRef?: React.RefObject<HTMLFormElement>;
}

export const ReportBugAndComplaintsForm = ({ backgroundColor, formRef }: Props) => {
  const {
    register,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(bugReportAndComplaintSchema),
  });

  return (
    <Form ref={formRef} backgroundColor={backgroundColor}>
      <FormGroup>
        <Label>
          Título<span>*</span>
        </Label>
        <Input {...register('title')} />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label>
          Descrição<span>*</span>
        </Label>
        <TextArea {...register('description')} rows={4} />
        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
      </FormGroup>
    </Form>
  );
};
