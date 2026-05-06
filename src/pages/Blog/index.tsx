import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from '~/components';
import { Body } from '~/components/Body';
import { Footer } from '~/components/Footer';
import { Div } from '~/components/Fragments/Div';
import { Section } from '~/components/Fragments/Section';
import { Text } from '~/components/Fragments/Texts/Text';
import { Title } from '~/components/Fragments/Titles/Title';
import { SEO } from '~/components/SEO';
import { theme } from '~/theme';
import { posts } from './posts';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 32px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  background: #0a1218;
  border: 1px solid ${theme.colors.outline.opacity};
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  transition: transform .2s ease;
  &:hover { transform: translateY(-2px); }
`;

const Cover = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  background: ${theme.colors.background.light};
`;

const CardBody = styled.div`
  padding: 14px;
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 90px;
  align-self: start;
  background: #0a1218;
  border: 1px solid ${theme.colors.outline.opacity};
  border-radius: 10px;
  padding: 16px;
  height: fit-content;
`;

const DateItem = styled(Link)`
  display: block;
  color: ${theme.colors.gray1};
  text-decoration: none;
  font-family: ${theme.fonts.regular};
  font-size: 14px;
  padding: 8px 4px;
  border-bottom: 1px solid ${theme.colors.outline.opacity};
  &:last-child { border-bottom: 0; }
  &:hover { color: ${theme.colors.brand.blue.light}; }
`;

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: '2-digit' });

const Blog = () => {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Blog FlixDesign',
        url: typeof window !== 'undefined' ? `https://flixdesign.com.br${window.location.pathname}` : 'https://flixdesign.com.br/blog'
    };

    return (
        <>
            <SEO
                title="Blog FlixDesign"
                description="Dicas, tendências e tutoriais de design para acelerar seus projetos."
                keywords={['blog', 'design', 'psd', 'mockup', 'tendências', 'social media', 'flix design']}
                url={typeof window !== 'undefined' ? window.location.pathname : '/blog'}
                type="website"
                structuredData={structuredData}
            />
            <Header />
            <Body>
                <Section width="100%" backgroundColor="#0A1218">
                    <Div pt="40px" pb="20px" backgroundColor="#0A1218" justifyContent="center" alignItems="center">
                        <Title type="h1" text="Blog Flix" color={theme.colors.gray1} />
                        <Text mt="8px" text="Conteúdo afiado para designers e social media" firstColor="#f3f3f3" secondColor="#c1c1c1" />
                    </Div>
                </Section>

                <Section width="100%" backgroundColor="#11181D">
                    <Div backgroundColor="#11181D" pt="30px" pb="50px">
                        <Wrapper>
                            <Grid>
                                {posts.map((p) => (
                                    <Card key={p.slug} to={`/blog/${p.slug}`} aria-label={p.title}>
                                        <Cover src={p.cover} alt={p.title} loading="lazy" />
                                        <CardBody>
                                            <Title type="h3" text={p.title} color={theme.colors.gray1} />
                                            <Text mt="6px" fontSize="14px" text={p.excerpt} firstColor="#d6d6d6" secondColor="#bdbdbd" />
                                            <Text mt="10px" fontSize="12px" text={formatDate(p.date)} firstColor="#9aa4b2" secondColor="#9aa4b2" />
                                        </CardBody>
                                    </Card>
                                ))}
                            </Grid>

                            <Sidebar>
                                <Title type="h4" text="Linha do tempo" color={theme.colors.gray1} />
                                {posts
                                    .slice()
                                    .sort((a, b) => b.date.localeCompare(a.date))
                                    .map((p) => (
                                        <DateItem key={p.slug} to={`/blog/${p.slug}`}>
                                            {formatDate(p.date)} — {p.title}
                                        </DateItem>
                                    ))}
                            </Sidebar>
                        </Wrapper>
                    </Div>
                </Section>
            </Body>
            <Footer backgroundColor="#0A1218" />
        </>
    );
};

export default Blog;


