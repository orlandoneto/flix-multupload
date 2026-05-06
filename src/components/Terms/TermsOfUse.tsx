import styled from 'styled-components';
import { theme } from '~/theme';

const Container = styled.div`
  max-width: 936px;
  margin-top: 20px;
  padding: 40px;
  background-color: #0a1218;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-family: ${theme.fonts.semiBold};
  font-size: 28px;
  color: #f3f3f3;
`;

const SectionTitle = styled.h2`
  margin-top: 20px;
  font-family: ${theme.fonts.regular};
  font-size: 16px;
  color: #f3f3f3;
`;

const Paragraph = styled.p`
  margin-bottom: 15px;
  font-family: ${theme.fonts.regular};
  line-height: 1.6;
  font-size: 16px;
  color: #f3f3f3;
`;

export const TermsOfUse = () => {
  return (
    <Container>
      <Title>Termos de Uso</Title>

      <SectionTitle>1. Introdução</SectionTitle>
      <Paragraph>
        Estes termos de serviço regem o acesso, navegação e uso do Site por seus usuários; o
        download e uso de conteúdo de propriedade da Flix Design; bem como os serviços prestados
        através do Site. Acessar e usar o Site implica que o Usuário leu e aceita estar vinculado a
        estes Termos, sem exceção...
      </Paragraph>

      <SectionTitle>2. Objetivo do site</SectionTitle>
      <Paragraph>
        A Flix Design disponibiliza arquivos editáveis, tais como vetores e ilustrações, imagens e
        arquivos PSD, bem como informações específicas relacionadas a esse conteúdo...
      </Paragraph>

      <SectionTitle>3. Uso autorizado do site</SectionTitle>
      <Paragraph>
        O Usuário só está autorizado a usar o Site e os Serviços de acordo com os Termos e de boa
        fé. O Usuário não interferirá no funcionamento do Site ou nos Serviços...
      </Paragraph>

      <SectionTitle>4. Cadastro</SectionTitle>
      <Paragraph>
        Para usar determinados Serviços, o Usuário deve se registrar, criando um nome de usuário e
        senha e ativando uma conta...
      </Paragraph>

      <SectionTitle>5. Propriedade Intelectual</SectionTitle>
      <Paragraph>
        Sujeito à sua conformidade com estes Termos de Serviço, qualquer contrato de licença
        aplicável com a Flix Design e a lei, você pode acessar e usar o Site...
      </Paragraph>

      <SectionTitle>6. Reclamações de violação / Avisos DMCA</SectionTitle>
      <Paragraph>
        Se você acredita que qualquer imagem ou outro material disponibilizado pela Flix Design
        infringe qualquer direito autoral que você possui ou controla...
      </Paragraph>

      <SectionTitle>7. Responsabilidade</SectionTitle>
      <Paragraph>
        O Usuário reconhece e concorda que usa o Site e seus Serviços por conta e risco do Usuário e
        sob a responsabilidade do Usuário...
      </Paragraph>

      <SectionTitle>8. Condições para a assinatura</SectionTitle>
      <Paragraph>
        Os termos nesta seção (os “Termos de assinatura”) regem qualquer compra de qualquer
        assinatura no site...
      </Paragraph>

      <SectionTitle>9. Informações gerais e de contato</SectionTitle>
      <Paragraph>
        Se qualquer disposição destes Termos for declarada inválida ou inexequível, será considerada
        que não foi incluída...
      </Paragraph>
    </Container>
  );
};
