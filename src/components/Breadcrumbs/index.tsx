import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface BreadcrumbItem {
    label: string;
    path: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

const BreadcrumbContainer = styled.nav`
    padding: 1rem 0;
    margin-bottom: 1rem;
`;

const BreadcrumbList = styled.ol`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

const BreadcrumbItem = styled.li`
    display: flex;
    align-items: center;
    
    &:not(:last-child)::after {
        content: '/';
        margin: 0 0.5rem;
        color: #666;
    }
`;

const BreadcrumbLink = styled(Link)`
    color: #007bff;
    text-decoration: none;
    
    &:hover {
        text-decoration: underline;
    }
`;

const CurrentPage = styled.span`
    color: #666;
`;

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    const generateStructuredData = () => {
        const structuredData = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: items.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@id': `https://flixdesign.com.br${item.path}`,
                    name: item.label,
                },
            })),
        };

        return structuredData;
    };

    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(generateStructuredData())}
                </script>
            </Helmet>

            <BreadcrumbContainer aria-label="breadcrumb">
                <BreadcrumbList>
                    {items.map((item, index) => (
                        <BreadcrumbItem key={item.path}>
                            {index === items.length - 1 ? (
                                <CurrentPage>{item.label}</CurrentPage>
                            ) : (
                                <BreadcrumbLink to={item.path}>
                                    {item.label}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    ))}
                </BreadcrumbList>
            </BreadcrumbContainer>
        </>
    );
}; 