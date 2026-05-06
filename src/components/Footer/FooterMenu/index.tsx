import React from 'react';
import { useUserData, useUserDataCache } from '~/utils/hook';
import { Behance, facebook, instagram, linkedin, Logo, Pinterest, Youtube } from '../../../assets/svg';
import { SOCIAL_BEHANCE, SOCIAL_INSTAGRAM, SOCIAL_PINTEREST, SOCIAL_YOUTUBE, WHATSAPP_NUMBER } from '../../../utils/constants';
import { Column, Container, Description, LinksSection, LogoDf, SocialIconArea, StyledLink } from './styles';

export const FooterMenu: React.FC = () => {
  const user: User = useUserDataCache();
  const { userContributor } = useUserData();

  const logoDesignFlix = Logo;
  const logoInstagram = instagram;
  const logoLinkedin = linkedin;
  const logoFacebook = facebook;
  const logoBehance = Behance;
  const logoPinterest = Pinterest;
  const logoYoutube = Youtube;
  const altText = 'Logo DesignFlix';
  const altTextInstagram = 'Instagram da Flix Design';
  const altTextLinkedin = 'LinkedIn da Flix Design';
  const altTextFacebook = 'Facebook da Flix Design';
  const altTextBehance = 'Behance da Flix Design';
  const altTextPinterest = 'Pinterest da Flix Design';
  const altTextYoutube = 'YouTube da Flix Design';

  return (
    <Container>
      <div style={{ width: "100%", marginTop: "16px" }}>
        <LogoDf src={logoDesignFlix} alt={altText} width="176px" height="22px" />
        <Description fontSize="12px" color="#6E7175">
          Comunidade dedicada aos apaixonados ❤️ por design, faça parte e vamos criar juntos!
        </Description>
      </div>
      <LinksSection>
        <Column>
          <h3>Empresa</h3>
          <ul>
            <li><StyledLink color="#292D32" href="/about" fontSize="14px">Sobre nós</StyledLink></li>
            <li><StyledLink color="#292D32" href="/plans" fontSize="14px">Tipos de licença</StyledLink></li>
            <li><StyledLink color="#292D32" href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá,%20gostaria%20de%20entrar%20em%20contato%20com%20a%20DesignFlix.`} fontSize="14px" target="_blank" rel="noopener noreferrer">Entre em contato</StyledLink></li>
          </ul>
        </Column>
        <Column>
          <h3>Termos Legais</h3>
          <ul>
            <li><StyledLink color="#292D32" href="/terms" fontSize="14px">Termos de serviço</StyledLink></li>
            <li><StyledLink color="#292D32" href="/privacy-policy" fontSize="14px">Política de privacidade</StyledLink></li>
            <li><StyledLink color="#292D32" href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá,%20gostaria%20de%20denunciar%20um%20arquivo.%20Por%20favor,%20descreva%20sua%20denúncia%20e%20logo%20entraremos%20em%20contato.`} fontSize="14px" target="_blank" rel="noopener noreferrer">Denunciar um arquivo</StyledLink></li>
          </ul>
        </Column>
        <Column>
          <h3>Descubra</h3>
          <ul>
            <li><StyledLink color="#292D32" href="/plans" fontSize="14px">Planos</StyledLink></li>
            <li><StyledLink color="#292D32" href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá,%20gostaria%20de%20solicitar%20um%20reembolso%20de%20uma%20compra%20realizada%20no%20DesignFlix.`} fontSize="14px" target="_blank" rel="noopener noreferrer">Solicitar reembolso</StyledLink></li>
            {!userContributor && (
              <li>
                <StyledLink
                  color="#292D32"
                  href={user?.isLogged ? "/profile" : "/#contribuidor"}
                  fontSize="14px"
                  onClick={() => {
                    if (user?.isLogged) {
                      localStorage.setItem('highlightContributor', 'true');
                    }
                  }}
                >
                  Seja um contribuidor Flixer
                </StyledLink>
              </li>
            )}
            <li><StyledLink color="#292D32" href="/partnership" fontSize="14px">Parceria e Collab</StyledLink></li>
          </ul>
        </Column>
        <Column>
          <h3>Links úteis</h3>
          <ul>
            <li><StyledLink color="#292D32" href="/searchImage/null/PSD" fontSize="14px">Encontrar PSD</StyledLink></li>
            <li><StyledLink color="#292D32" href="/searchImage/null/PNG" fontSize="14px">Encontrar PNG</StyledLink></li>
            <li><StyledLink color="#292D32" href="/searchImage/null/JPEG" fontSize="14px">Encontrar JPEG</StyledLink></li>
            <li><StyledLink color="#292D32" href="/searchImage/null/CANVA" fontSize="14px">Encontrar CANVA</StyledLink></li>
          </ul>
        </Column>
      </LinksSection>
      <Column>
        <h3>Redes Sociais</h3>
        <SocialIconArea>
          <a href={SOCIAL_INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src={logoInstagram} alt={altTextInstagram} /></a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><img src={logoLinkedin} alt={altTextLinkedin} /></a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><img src={logoFacebook} alt={altTextFacebook} /></a>
          <a href={SOCIAL_BEHANCE} target="_blank" rel="noopener noreferrer" aria-label="Behance"><img src={logoBehance} alt={altTextBehance} /></a>
          <a href={SOCIAL_PINTEREST} target="_blank" rel="noopener noreferrer" aria-label="Pinterest"><img src={logoPinterest} alt={altTextPinterest} /></a>
          <a href={SOCIAL_YOUTUBE} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><img src={logoYoutube} alt={altTextYoutube} /></a>
        </SocialIconArea>
      </Column>
    </Container>
  );
};
