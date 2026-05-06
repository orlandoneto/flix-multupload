import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { SubscriptionService } from '~/services';
import { useToast } from '~/utils/hook';

import { SubscribeButton, FormWrapper, CardElementWrapper, StyledInput, Message } from './styles';
import { useNavigate } from 'react-router-dom';
import { Routes } from '~/routes/routes';
import { useWebSocket } from '~/utils/hook/useWebSocket';

interface PlanPayment {
  planId: string;
  planName: string;
  planPrice: string;
  planTitle: string;
}

interface CheckoutForm {
  plansPayment: PlanPayment;
  userData: User;
}

interface WebSocketMessage {
  email: string;
  status: string;
}
export const CheckoutFormStripe: React.FC<CheckoutForm> = ({ plansPayment, userData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { showMessage } = useToast();

  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [messagePayment, setMessagePayment] = useState({
    type: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      console.error('Stripe.js não está carregado ainda.');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setMessagePayment({
        type: 'error',
        message: 'Erro: Elemento de cartão não encontrado.',
      });
      setLoading(false);
      return;
    }

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: { email },
      });

      if (error) {
        setMessagePayment({
          type: 'error',
          message: `Erro ao criar método de pagamento: ${error.message}`,
        });
        setLoading(false);
        return;
      }

      const subscriptionService = new SubscriptionService();
      const resultSubscription = await subscriptionService.create(
        userData.id?.toString() || '',
        plansPayment?.planId || '', // Onde for planId trocar priceId
        email,
        paymentMethod.id
      );

      if (resultSubscription) {
        setMessagePayment({
          type: 'success',
          message: 'Assinatura criada com sucesso!',
        });

        showMessage?.('Assinatura criada com sucesso!', 'success');
        setTimeout(() => {
          navigate(Routes.HOME);
          window.location.reload();
        }, 5000);
      } else {
        setMessagePayment({
          type: 'error',
          message: 'Erro ao criar assinatura!',
        });
      }
    } catch (error: unknown) {
      console.error('Erro ao criar assinatura:', error);
      if (error instanceof Error) {
        const errorMessage =
          (error as any).response?.data?.error || error.message || 'Erro desconhecido';

        setMessagePayment({ type: 'error', message: `Erro: ${errorMessage}` });
      } else {
        setMessagePayment({
          type: 'error',
          message: 'Ocorreu um erro desconhecido.',
        });
      }
    }

    setLoading(false);
  };

  const handleWebSocketMessage = (data: WebSocketMessage) => {
    if (data.email === userData?.email) {
      showMessage('Pagamento PIX confirmado! Você será redirecionado em instantes.', 'success');
      setTimeout(() => {
        navigate(Routes.HOME);
      }, 3000);
    }
  };

  useWebSocket(handleWebSocketMessage);

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#0A1218' }}>Pagamento via Cartão</h2>
      </div>
      <StyledInput
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite seu email"
        required
      />
      <CardElementWrapper>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#131212',
                '::placeholder': { color: '#aab7c4' },
              },
              invalid: { color: '#9e2146' },
            },
          }}
        />
      </CardElementWrapper>
      <SubscribeButton type="submit" disabled={!stripe || isLoading}>
        {isLoading
          ? 'Processando...'
          : `Assinar por R$${plansPayment.planPrice}/${plansPayment?.planTitle}`}
      </SubscribeButton>
      {messagePayment.message && (
        <Message color={messagePayment.type === 'error' ? '#9e2146' : '#4CAF50'}>
          {messagePayment.type === 'success' ? (
            <>
              {messagePayment.message}
              <p>Obs: você será redirectado em alguns instantes...</p>
            </>
          ) : (
            messagePayment.message
          )}
        </Message>
      )}
    </FormWrapper>
  );
};
