import { StageSpinner } from 'react-spinners-kit';
import { Button } from './styles';

type Props = {
  categoryLimitReached?: boolean;
  type?: 'submit' | 'button' | 'reset';
  loading: boolean;
  disabled: boolean;
  onClick?: () => void;
};

export const ButtonLoading = ({ type = 'button', loading = false, disabled, onClick }: Props) => {
  return (
    <Button type={type} onClick={!disabled ? onClick : undefined} disabled={disabled}>
      {loading ? (
        <>
          <p style={{ color: '#fff' }}>Carregando...</p>
          <div className="spinner" style={{ marginLeft: '10px' }}>
            <StageSpinner size={20} color="#fff" />
          </div>
        </>
      ) : (
        <p style={{ color: '#fff' }}>Enviar Arquivos</p>
      )}
    </Button>
  );
};
