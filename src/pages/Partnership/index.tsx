import styled from 'styled-components';
import { Header } from '~/components';
import { Officeflix } from '../../assets/svg';
import { Body } from '../../components/Body';
import { Footer } from '../../components/Footer';
import { SEO } from '../../components/SEO';
import { WHATSAPP_NUMBER } from '../../utils/constants';

const PartnershipContainer = styled.div`
  max-width: 936px;
  margin: 20px auto;
  padding: 40px;
  background-color: #0a1218;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 600px) {
    padding: 20px 8px;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: 28px;
  color: #f3f3f3;
  text-align: left;
`;

const SectionTitle = styled.h2`
  margin-top: 32px;
  margin-bottom: 12px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  font-size: 18px;
  color: #f3f3f3;
  text-align: left;
  font-weight: bold;
  text-transform: uppercase;
`;

const Paragraph = styled.p`
  margin-bottom: 15px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: 1.6;
  font-size: 16px;
  color: #f3f3f3;
  text-align: left;
`;

const CtaSection = styled.section`
  width: 100%;  
  padding: 48px 0 56px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 48px;
`;

const CtaTitle = styled.h2`
  color: #fff;
  font-size: 2.5rem;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  margin-bottom: 24px;
  text-align: center;
`;

const CtaButton = styled.a`
  background: #25d366;
  color: #fff;
  font-size: 1.1rem;
  font-family: ${({ theme }) => theme.fonts.semiBold};
  padding: 14px 32px;
  border-radius: 8px;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.2s, transform 0.2s;
  display: inline-block;
  margin-top: 8px;
  &:hover {
    background: #1ebe5d;
    transform: scale(1.04);
  }
`;

const OfficeImage = styled.img`
  display: block;
  max-width: 480px;
  width: 100%;
  margin: 0 auto 40px auto;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.13);
`;

const Partnership = () => {
  return (
    <>
      <SEO
        title="Parcerias e Colabs"
        description="Parcerias e collabs com criadores, influenciadores e divulgadores. Crie campanhas e projetos especiais com a FlixDesign."
        keywords={[
          'parceria',
          'collab',
          'parcerias',
          'influenciadores',
          'criadores de conteúdo',
          'divulgação',
          'afiliados',
          'flix design',
          'parceria flix design',
          'partnership',
          'collaboration',
          'influencers',
          'content creators',
        ]}
        url={typeof window !== 'undefined' ? window.location.pathname : '/partnership'}
      />
      <Header />
      <Body>
        <PartnershipContainer>
          <OfficeImage src={Officeflix} alt="Flix Design Office" />
          <Title>Parceria e Collab</Title>

          <SectionTitle>🚀 Bora criar junto?</SectionTitle>
          <Paragraph>
            Na FlixDesign, a gente acredita que boas ideias ficam ainda melhores quando compartilhadas. 💡✨
          </Paragraph>
          <Paragraph>
            Por isso, estamos abertos para parcerias e collabs com criadores de conteúdo, influenciadores e divulgadores de todos os cantos — Instagram, YouTube, TikTok, blogs e onde mais fizer sentido.
          </Paragraph>
          <Paragraph>
            Se você curte design, criatividade e tecnologia, e quer apresentar algo diferente e valioso para a sua audiência, vem trocar uma ideia com a gente. 😉
          </Paragraph>
          <Paragraph>
            Podemos criar ações exclusivas, campanhas criativas ou até projetos especiais para divulgar o FlixDesign de um jeito único e autêntico.
          </Paragraph>

          <SectionTitle>🎯 Como funciona o match?</SectionTitle>
          <Paragraph>
            O match é simples: você entra com seu alcance e autenticidade, a gente entra com nossa plataforma, benefícios e muito conteúdo bom para sua comunidade.
          </Paragraph>

          <SectionTitle>📩 Vamos conversar</SectionTitle>
          <Paragraph>
            Chama no direct ou manda um e-mail: contato@flixdesign.com.br. Vamos fazer algo incrível juntos! 🔥
          </Paragraph>
        </PartnershipContainer>

        <CtaSection>
          <CtaTitle>Pronto para colaborar? Vamos conversar!</CtaTitle>
          <CtaButton
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Quero%20falar%20sobre%20parcerias%20e%20collabs%20com%20a%20FlixDesign.`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar no WhatsApp
          </CtaButton>
        </CtaSection>
      </Body>
      <Footer backgroundColor="#0A1218" />
    </>
  );
};

export default Partnership;


