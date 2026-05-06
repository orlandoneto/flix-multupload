import React from 'react';
import styled from 'styled-components';
import { theme } from '~/theme';

const PrivacyContainer = styled.div`
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

export const PrivacyPolicy: React.FC = () => {
  return (
    <PrivacyContainer>
      <Title>Política de Privacidade da Flix Design</Title>
      <Paragraph>
        A Política de Privacidade foi atualizada em agosto de 2022. Com o objetivo de proteger os
        direitos fundamentais de liberdade e de privacidade e o livre desenvolvimento da
        personalidade da pessoa natural, elaboramos a presente Política de Privacidade, observadas
        as disposições da Lei Geral de Proteção de Dados Pessoais (LGPD) – Lei n° 13.709/2018. É
        fundamental dedicar um momento para se familiarizar com nossas práticas de privacidade e
        falar conosco se tiver dúvidas.
      </Paragraph>

      <SectionTitle>Veracidade das Informações</SectionTitle>
      <Paragraph>
        Toda e qualquer informação prestada pelo Usuário à Flix Design, principalmente seus dados
        pessoais, deverão ser verídicos e não podem violar a legislação brasileira, principalmente a
        LGPD. Caso a Flix Design verifique que as informações fornecidas sejam inverídicas, esta
        poderá excluir os dados pessoais, bem como encerrar a conta deste Usuário.
      </Paragraph>

      <SectionTitle>O que são Dados Pessoais e Dados Sensíveis?</SectionTitle>
      <Paragraph>
        “Dados Pessoais” são informações que podem ser usadas para identificar uma pessoa natural
        (física), sendo assim, dados de empresas (pessoas jurídicas) como razão social e CNPJ não
        são abarcados por esta política. “Dados Pessoais Sensíveis”, de acordo com a LGPD, consistem
        em informações sobre origem racial ou étnica, convicção religiosa, opinião política,
        filiação a sindicato ou organização de caráter religioso, filosófico ou político, ou até
        mesmo dado referente à saúde ou à vida sexual, dado genético ou biométrico.
      </Paragraph>

      <SectionTitle>Flix Design como Controlador</SectionTitle>
      <Paragraph>
        A Flix Design figura como Controlador dos Dados Pessoais coletados. Isso significa que a
        Flix Design é responsável por tomar as decisões referentes ao tratamento dos Dados Pessoais
        de seus Usuários.
      </Paragraph>

      <SectionTitle>Quais tipos de dados pessoais são coletados pela Flix Design?</SectionTitle>
      <Paragraph>
        No Cadastro do Usuário, são coletados os seguintes Dados: nome, e-mail e telefone. Estes
        dados são tratados apenas com a finalidade de identificar o usuário e otimizar sua
        experiência com o uso do aplicativo.
      </Paragraph>

      <SectionTitle>Por que a Flix Design trata os dados pessoais dos usuários?</SectionTitle>
      <Paragraph>
        O Cadastro de Usuário se submete à hipótese legal de execução do Contrato. Ou seja, a Flix
        Design precisa destes dados para executar os serviços contratados pelo usuário, conforme o
        Artigo 7º da LGPD.
      </Paragraph>

      <SectionTitle>Como a Flix Design armazena os dados pessoais?</SectionTitle>
      <Paragraph>
        A Flix Design utiliza os serviços da Bubble, utilizando a infraestrutura da Amazon AWS, e
        obedecendo o inciso I do Artigo 33 da LGPD para transferência internacional de dados
        pessoais.
      </Paragraph>

      <SectionTitle>Qual a duração do tratamento de dados pessoais?</SectionTitle>
      <Paragraph>
        Os Dados Pessoais mencionados nesta Política serão tratados durante a execução dos Serviços
        oferecidos pela Flix Design e permanecem armazenados por até 3 anos após o encerramento dos
        serviços.
      </Paragraph>

      <SectionTitle>A Flix Design garante a segurança das informações?</SectionTitle>
      <Paragraph>
        A Flix Design utiliza modernos recursos de segurança da informação, incluindo criptografia
        SSL, para garantir o acesso seguro e a proteção dos dados pessoais.
      </Paragraph>

      <SectionTitle>A Flix Design utiliza cookies?</SectionTitle>
      <Paragraph>
        Sim, utilizamos cookies para melhorar a experiência do usuário no site, incluindo
        informações sobre navegador, resolução de tela e data de acesso.
      </Paragraph>

      <SectionTitle>Compartilhamento de dados com terceiros</SectionTitle>
      <Paragraph>
        A Flix Design não compartilha, vende ou aluga os dados dos usuários. Contudo, utilizamos o
        Google Analytics para monitorar a audiência, sem identificar visitantes individuais.
      </Paragraph>

      <SectionTitle>Do direito do usuário</SectionTitle>
      <Paragraph>
        Conforme o Artigo 18 da LGPD, o usuário tem o direito de solicitar confirmação, acesso,
        correção, anonimização, bloqueio ou eliminação dos seus dados pessoais a qualquer momento,
        enviando um e-mail para contato@flixdesign.com.br.
      </Paragraph>

      <SectionTitle>Alterações nesta Política de Privacidade</SectionTitle>
      <Paragraph>
        Quaisquer alterações na finalidade ou tratamento dos dados pessoais serão comunicadas aos
        usuários.
      </Paragraph>

      <SectionTitle>Contato</SectionTitle>
      <Paragraph>
        Para quaisquer dúvidas sobre a política de privacidade ou direitos como titular de dados,
        entre em contato com o Encarregado da Flix Design pelo e-mail contato@flixdesign.com.br.
      </Paragraph>
    </PrivacyContainer>
  );
};
