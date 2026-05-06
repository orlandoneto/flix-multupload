import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import { findPostBySlug } from './posts';

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`;

const Cover = styled.img`
  width: 100%;
  height: 340px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid ${theme.colors.outline.opacity};
  background: ${theme.colors.background.light};
`;

const Paragraph = styled.p`
  color: ${theme.colors.gray1};
  font-family: ${theme.fonts.regular};
  font-size: 16px;
  line-height: 1.7;
  margin: 12px 0;
`;

const Back = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  color: ${theme.colors.brand.blue.light};
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: '2-digit' });

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = useMemo(() => findPostBySlug(slug), [slug]);

    if (!post) {
        navigate('/blog', { replace: true });
        return null;
    }

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        image: post.cover,
        author: { '@type': 'Organization', name: 'FlixDesign' },
        publisher: {
            '@type': 'Organization',
            name: 'FlixDesign',
            logo: { '@type': 'ImageObject', url: 'https://flixdesign.com.br/favflix.png' }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': typeof window !== 'undefined' ? `https://flixdesign.com.br${window.location.pathname}` : `https://flixdesign.com.br/blog/${post.slug}`
        }
    };

    return (
        <>
            <SEO
                title={post.title}
                description={post.excerpt}
                keywords={[...post.keywords, 'blog', 'flix design']}
                url={typeof window !== 'undefined' ? window.location.pathname : `/blog/${post.slug}`}
                type="article"
                image={post.cover}
                structuredData={structuredData}
            />
            <Header />
            <Body>
                <Section width="100%" backgroundColor="#0A1218">
                    <Div pt="32px" pb="18px" backgroundColor="#0A1218" alignItems="center">
                        <Title type="h1" text={post.title} color={theme.colors.gray1} />
                        <Text mt="8px" fontSize="14px" text={formatDate(post.date)} firstColor="#9aa4b2" secondColor="#9aa4b2" />
                    </Div>
                </Section>

                <Section width="100%" backgroundColor="#11181D">
                    <Div backgroundColor="#11181D" pt="24px" pb="60px">
                        <Container>
                            <Cover src={post.cover} alt={post.title} />
                            <div style={{ marginTop: 18 }}>
                                {post.content.map((para, i) => (
                                    <Paragraph key={i}>{para}</Paragraph>
                                ))}
                            </div>
                            <Back to="/blog">← Voltar para o Blog</Back>
                        </Container>
                    </Div>
                </Section>
            </Body>
            <Footer backgroundColor="#0A1218" />
        </>
    );
};

export default BlogPost;


