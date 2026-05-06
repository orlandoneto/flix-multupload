import { theme } from '../../theme';

export const menuCategories = [
    {
        name: 'Categorias',
        link: '/categories',
    },
    {
        name: 'Grátis',
        link: '/gallery-free',
    },
];

export const buildMenuButtons = (existPlan: boolean, user?: User) => [
    {
        text: existPlan ? 'FAZER UPGRADE' : 'SEJA PREMIUM',
        link: '/categories',
        type: 'gradient',
        firstColor: theme.colors.background.gradient2,
        secondColor: theme.colors.background.gradient1,
        order: 1,
    },
    {
        text: user?.isLogged ? 'Sair' : 'Entrar',
        link: '#',
        type: 'link',
        mode: 'logout',
        order: 2,
    },
    {
        text: 'Registrar',
        link: '#',
        type: 'simple',
        order: 3,
    },
];