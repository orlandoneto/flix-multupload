import { useEffect, useState } from 'react';
import { PaymentMercadoPagoService } from '~/services';
import { QRCodeSVG } from 'qrcode.react';

import { FormWrapper } from './styles';
import { parseCurrencyToNumber } from '~/utils';

interface CheckoutProps {
  plansPayment: {
    planId: string;
    planTitle: string;
    planPrice: string;
  };
  userData: User;
}

export const CheckoutQrCodePix: React.FC<CheckoutProps> = ({ plansPayment, userData }) => {
  const [paymentData, setPaymentData] = useState<{
    pixData?: string;
    paymentId?: string;
    qrCodeBase64?: string;
    qrCode?: string;
    ticketUrl?: string;
    amount: number;
    description: string;
  } | null>(null);

  const paymentMercadoPago = new PaymentMercadoPagoService();

  const handleGeneratePix = async () => {
    try {
      const { pixData, qrCodeBase64, qrCode, ticketUrl, paymentId } =
        await paymentMercadoPago.createPix(
          plansPayment?.planTitle,
          parseCurrencyToNumber(plansPayment.planPrice),
          userData.email || ''
        );

      const amount = parseCurrencyToNumber(plansPayment.planPrice);
      const description = plansPayment.planTitle;

      setPaymentData({ pixData, qrCodeBase64, qrCode, ticketUrl, paymentId, amount, description });
    } catch (error) {
      console.error('Erro ao criar assinatura:', error);
      setPaymentData(null);
    }
  };

  useEffect(() => {
    if (
      plansPayment &&
      userData &&
      Object.keys(plansPayment).length > 0 &&
      Object.keys(userData).length > 0
    ) {
      handleGeneratePix();
    }
  }, [plansPayment, userData]);

  return (
    <FormWrapper style={{ marginTop: '2rem' }}>
      {paymentData?.qrCodeBase64 ? (
        <PixInfo
          qrCodeUrl={paymentData.qrCodeBase64}
          amount={paymentData.amount}
          description={paymentData.description}
        />
      ) : paymentData?.qrCode ? (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#0A1218' }}>Pagamento via PIX</h2>
          <p style={{ color: '#0A1218' }}>
            Assinar por R${paymentData.amount.toFixed(2)}/{paymentData.description}
          </p>
          <div style={{ margin: '1rem auto', width: '200px', padding: '1rem' }}>
            <QRCodeSVG value={paymentData.qrCode} />
          </div>
          <p style={{ color: '#0A1218' }}>
            Escaneie o QR Code acima com seu aplicativo bancário para realizar o pagamento.
          </p>
        </div>
      ) : (
        <>
          <div style={{ textAlign: 'center', color: '#0A1218', padding: '1rem' }}>
            <h2>Pagamento via PIX</h2>
            <p>
              O pagamento via PIX está temporariamente indisponível. Por favor, utilize o pagamento
              via cartão.
            </p>
          </div>
        </>
      )}
    </FormWrapper>
  );
};

interface PixInfoProps {
  qrCodeUrl: string;
  amount: number;
  description: string;
}

const PixInfo: React.FC<PixInfoProps> = ({ qrCodeUrl, amount, description }) => {
  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <h2 style={{ color: '#0A1218' }}>Pagamento via PIX</h2>
      <p style={{ color: '#0A1218' }}>
        Assinar por R${amount.toFixed(2)}/{description}
      </p>
      <div style={{ margin: '2rem auto', width: '200px', height: '200px' }}>
        <img
          src={`data:image/png;base64,${qrCodeUrl}`}
          alt="QR Code"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <p style={{ color: '#0A1218' }}>
        Escaneie o QR Code acima com seu aplicativo bancário para realizar o pagamento.
      </p>
    </div>
  );
};
