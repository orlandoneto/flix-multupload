import styled from 'styled-components';
import { Header } from '~/components';
import { Officeflix } from '../../assets/svg';
import { Body } from '../../components/Body';
import { Footer } from '../../components/Footer';
import { SEO } from '../../components/SEO';
import { WHATSAPP_NUMBER } from '../../utils/constants';

const AboutContainer = styled.div`
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

const About = () => {
  return (
    <>
      <SEO
        title="Sobre a Flix Design"
        description="Conheça a missão, visão e valores da Flix Design. Descubra como ajudamos designers e empresas a se destacarem com soluções visuais criativas."
        keywords={['sobre', 'flix design', 'missão', 'visão', 'valores', 'quem somos', 'empresa', 'design']}
        url={typeof window !== 'undefined' ? window.location.pathname : '/about'}
      />
      <Header />
      <Body>
        <AboutContainer>
          <OfficeImage src={Officeflix} alt="Flix Design Office" />
          <Title>Sobre a Flix Design</Title>
          <Paragraph>
            A Flix Design nasceu com a missão de transformar ideias criativas em soluções visuais impactantes. Acreditamos que o design vai muito além da estética: ele comunica, conecta e move pessoas. Nossa plataforma foi criada para facilitar o acesso a conteúdos gráficos de alta qualidade, prontos para elevar o padrão visual de projetos em todo o Brasil.
          </Paragraph>
          <Paragraph>
            Desde o início, temos como objetivo apoiar designers, empreendedores, agências e empresas a se destacarem no mercado por meio de uma identidade visual consistente e marcante.
          </Paragraph>

          <SectionTitle>O que oferecemos</SectionTitle>
          <Paragraph>
            Na Flix Design, você encontra uma curadoria especializada de artes profissionais para redes sociais, identidade visual, apresentações, materiais impressos e muito mais. Tudo disponível de forma prática, com atualizações constantes e uma navegação intuitiva.
          </Paragraph>
          <Paragraph>
            Nosso acervo é pensado para atender diferentes nichos e estilos, sempre com foco em inovação, usabilidade e excelência estética.
          </Paragraph>

          <SectionTitle>Nossa Visão</SectionTitle>
          <Paragraph>
            Queremos ser a principal referência em conteúdo visual criativo e acessível no Brasil. Trabalhamos todos os dias para expandir nossa galeria com materiais de alta performance e utilidade real, ajudando nossos clientes a crescer com mais profissionalismo e impacto visual.
          </Paragraph>

          <SectionTitle>Nossa Missão</SectionTitle>
          <Paragraph>
            Democratizar o design de qualidade, conectando criatividade com funcionalidade. Seja para quem está começando ou para quem já tem um negócio consolidado, a Flix Design é a parceira ideal na construção de uma comunicação visual forte e autêntica.
          </Paragraph>

          <SectionTitle>Compromisso com a qualidade</SectionTitle>
          <Paragraph>
            Todos os nossos materiais são desenvolvidos ou selecionados com critérios rigorosos de design, relevância e tendência de mercado. Temos um time apaixonado pelo que faz e atento às necessidades reais do público que atendemos.
          </Paragraph>

          <SectionTitle>Faça parte dessa transformação</SectionTitle>
          <Paragraph>
            Se você acredita no poder do design para comunicar ideias, construir marcas e conquistar clientes, a Flix Design é para você. Junte-se à nossa comunidade criativa e descubra como podemos elevar o seu projeto para um novo nível.
          </Paragraph>
        </AboutContainer>
        <CtaSection>
          <CtaTitle>Ficou com dúvidas? Fale com nosso time!</CtaTitle>
          <CtaButton
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Gostaria%20de%20falar%20com%20você,%20flixdesign.`}
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

export default About;