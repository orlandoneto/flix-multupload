import styled from 'styled-components';
import { theme } from '~/theme';
import { Header } from '../../components';
import { Body } from '../../components/Body';
import { Footer } from '../../components/Footer';
import { SEO } from '../../components/SEO';

const TermsContainer = styled.div`
  max-width: 936px;
  margin: 20px auto;
  padding: 40px;
  background-color: #0a1218;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-family: ${theme.fonts.semiBold};
  font-size: 28px;
  color: #f3f3f3;
  text-align: center;
`;

const SectionTitle = styled.h2`
  margin-top: 32px;
  margin-bottom: 12px;
  font-family: ${theme.fonts.semiBold};
  font-size: 18px;
  color: #f3f3f3;
  text-align: left;
  font-weight: bold;
  text-transform: uppercase;
`;

const Paragraph = styled.p`
  margin-bottom: 15px;
  font-family: ${theme.fonts.regular};
  line-height: 1.6;
  font-size: 16px;
  color: #f3f3f3;
  text-align: left;
`;

const List = styled.ul`
  margin: 0 0 1em 0;
  color: #f3f3f3;
  font-family: ${theme.fonts.regular};
  font-size: 16px;
  max-width: 800px;
  text-align: left;
`;

const ListItem = styled.li`
  margin-bottom: 0.5em;
`;

const StyledLink = styled.a`
  color: #f3f3f3;
  text-decoration: underline;
  word-break: break-all;
`;

const IntroWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto 24px auto;
  display: flex;
  flex-direction: column;
`;

const Terms = () => {
  return (
    <>
      <SEO
        title="Termos de Uso"
        description="Leia os Termos de Uso da Flix Design e saiba as regras para utilizar nossa plataforma."
        keywords={['termos de uso', 'regras', 'flix design', 'plataforma', 'licença']}
        url={typeof window !== 'undefined' ? window.location.pathname : '/terms'}
      />
      <Header />
      <Body>
        <TermsContainer>
          <Title>TERMOS E CONDIÇÕES DE USO – FLIX DESIGN</Title>
          <IntroWrapper>
            <Paragraph style={{ marginTop: 0, marginBottom: 8 }}><strong>Última atualização:</strong> 28 de julho de 2025</Paragraph>
            <Paragraph style={{ marginTop: 0, marginBottom: 8 }}>Bem-vindo ao Flix Design! Estes Termos e Condições de Uso (“Termos”) regem o uso do site <StyledLink href="https://flixdesign.com.br/" target="_blank" rel="noopener noreferrer">https://flixdesign.com.br/</StyledLink> e de todos os serviços disponibilizados pela Flix Design Ltda..</Paragraph>
            <Paragraph style={{ marginTop: 0, marginBottom: 0 }}>Ao acessar, navegar ou utilizar qualquer funcionalidade do nosso site, você declara estar ciente e de acordo com os termos descritos abaixo. Se você não concorda com qualquer disposição, não utilize nossos serviços.</Paragraph>
          </IntroWrapper>

          <SectionTitle>1. ACEITAÇÃO DOS TERMOS</SectionTitle>
          <List>
            <ListItem>1.1. Ao utilizar o site Flix Design, você concorda integralmente com estes Termos, incluindo futuras alterações que possam ser realizadas.</ListItem>
            <ListItem>1.2. A Flix Design pode modificar estes Termos a qualquer momento. A versão atual estará sempre disponível em <StyledLink href="https://flixdesign.com.br/termos" target="_blank" rel="noopener noreferrer">https://flixdesign.com.br//termos</StyledLink>.</ListItem>
            <ListItem>1.3. O uso contínuo do site após alterações será considerado como aceitação integral das mudanças.</ListItem>
            <ListItem>1.4. Caso viole qualquer disposição destes Termos, seu acesso poderá ser suspenso ou encerrado de forma imediata e sem aviso prévio.</ListItem>
          </List>

          <SectionTitle>2. ACESSO E USUÁRIO PREMIUM</SectionTitle>
          <List>
            <ListItem>2.1. Parte do conteúdo do Flix Design pode ser acessada gratuitamente, mas determinadas funções e recursos exclusivos são oferecidos apenas a usuários Premium.</ListItem>
            <ListItem>2.2. A política de preços, planos e condições de assinatura está disponível em <StyledLink href="https://flixdesign.com.br/premium" target="_blank" rel="noopener noreferrer">https://flixdesign.com.br//premium</StyledLink>.</ListItem>
            <ListItem>2.3. O usuário Premium poderá solicitar o cancelamento da assinatura em até 7 (sete) dias corridos após a compra, com reembolso integral em até 30 (trinta) dias, desde que não tenha utilizado mais de 20% (vinte por cento) da cota mensal disponível.</ListItem>
            <ListItem>2.4. Se o consumo for superior a 20% da cota, o reembolso será proporcional ao uso realizado.</ListItem>
          </List>

          <SectionTitle>3. IMPOSTOS E FATURAMENTO</SectionTitle>
          <List>
            <ListItem>3.1. A Flix Design Ltda. é uma empresa sediada no Brasil e atua em conformidade com a legislação tributária vigente.</ListItem>
            <ListItem>3.2. Para pagamentos via cartão de crédito ou PIX, será emitida NFS-e em nome do CPF informado pelo usuário no momento do cadastro.</ListItem>
            <ListItem>3.3. Os dados cadastrais utilizados para emissão de nota fiscal são de responsabilidade do usuário.</ListItem>
          </List>

          <SectionTitle>4. PROPRIEDADE INTELECTUAL</SectionTitle>
          <List>
            <ListItem>4.1. Todo o conteúdo do site Flix Design, incluindo textos, imagens, ilustrações, logotipos, vídeos e outros materiais, é protegido por direitos autorais e propriedade intelectual.</ListItem>
            <ListItem>4.2. É proibida a reprodução, distribuição, modificação, engenharia reversa ou qualquer uso não autorizado dos conteúdos do Flix Design.</ListItem>
            <ListItem>4.3. As marcas registradas, logotipos e identidade visual da Flix Design não podem ser utilizadas sem autorização prévia por escrito.</ListItem>
            <ListItem>4.4. O uso indevido de conteúdos poderá resultar em responsabilização civil e criminal, conforme a legislação brasileira (Lei de Direitos Autorais – Lei nº 9.610/98).</ListItem>
          </List>

          <SectionTitle>5. LICENCIAMENTO DE CONTEÚDOS</SectionTitle>
          <List>
            <ListItem>5.1. Ao adquirir uma assinatura Premium, o usuário obtém uma licença não exclusiva, intransferível e revogável para utilizar os itens (modelos, artes e demais conteúdos) oferecidos pela plataforma.</ListItem>
            <ListItem>5.2. O conteúdo pode ser usado em projetos pessoais e comerciais, desde que não seja revendido, redistribuído ou disponibilizado como arquivo original.</ListItem>
            <ListItem>5.3. É proibida a utilização do conteúdo do Flix Design para sistemas automatizados de personalização (como plataformas de criação online de terceiros).</ListItem>
            <ListItem>5.4. Qualquer uso ofensivo, discriminatório ou que viole leis vigentes é estritamente proibido.</ListItem>
          </List>

          <SectionTitle>6. PRIVACIDADE E DADOS PESSOAIS</SectionTitle>
          <List>
            <ListItem>6.1. A coleta e o tratamento de dados pessoais seguem a nossa Política de Privacidade, disponível em <StyledLink href="https://flixdesign.com.br/privacidade" target="_blank" rel="noopener noreferrer">https://flixdesign.com.br//privacidade</StyledLink>, em conformidade com a LGPD (Lei Geral de Proteção de Dados – Lei nº 13.709/2018).</ListItem>
            <ListItem>6.2. O usuário é responsável por fornecer informações corretas e mantê-las atualizadas em seu cadastro.</ListItem>

            <div >
              <SectionTitle style={{ textAlign: 'center' }}>7. LIMITAÇÕES DE USO</SectionTitle>
            </div>

            <ListItem>7.1. O usuário não pode:</ListItem>
            <ListItem>Violar leis brasileiras ou direitos de terceiros;</ListItem>
            <ListItem>Utilizar os serviços do Flix Design para fins ilícitos;</ListItem>
            <ListItem>Distribuir vírus, malware ou outros códigos maliciosos;</ListItem>
            <ListItem>Usar técnicas de mineração de dados ou scraping.</ListItem>
          </List>

          <SectionTitle>8. LINKS DE TERCEIROS</SectionTitle>
          <List>
            <ListItem>8.1. O site pode conter links para páginas externas. O Flix Design não é responsável pelo conteúdo, práticas ou políticas desses sites de terceiros.</ListItem>
          </List>

          <SectionTitle>9. GARANTIAS E RESPONSABILIDADES</SectionTitle>
          <List>
            <ListItem>9.1. O Flix Design é fornecido “como está”, sem garantias expressas ou implícitas quanto a disponibilidade, continuidade, precisão ou adequação a fins específicos.</ListItem>
            <ListItem>9.2. Não nos responsabilizamos por danos diretos ou indiretos decorrentes do uso ou da incapacidade de usar o site ou os conteúdos.</ListItem>
          </List>

          <SectionTitle>10. INDENIZAÇÃO</SectionTitle>
          <List>
            <ListItem>10.1. O usuário concorda em indenizar a Flix Design, seus sócios e colaboradores por qualquer reclamação, dano ou custo decorrente do uso indevido da plataforma ou violação destes Termos.</ListItem>
          </List>

          <SectionTitle>11. DISPOSIÇÕES GERAIS</SectionTitle>
          <List>
            <ListItem>11.1. Estes Termos são regidos pelas leis da República Federativa do Brasil.</ListItem>
            <ListItem>11.2. O foro eleito para dirimir quaisquer disputas é o da comarca da sede da Flix Design Ltda., salvo disposição legal em contrário.</ListItem>
            <ListItem>11.3. Caso alguma cláusula seja considerada inválida, as demais permanecerão em pleno vigor.</ListItem>
          </List>
        </TermsContainer>
      </Body>
      <Footer backgroundColor="#0A1218" />
    </>
  );
};

export default Terms;
