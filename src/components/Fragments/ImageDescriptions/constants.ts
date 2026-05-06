export const ALT_DESCRIPTIONS = {
    GALLERY_IMAGE: (name: string) => `Design premium: ${name} - Baixe agora no DesignFlix`,
    CATEGORY_IMAGE: (name: string) => `Categoria ${name} - Designs premium para download`,
    BANNER: (title: string) => `Banner promocional: ${title} - DesignFlix`,
    PROFILE: (name: string) => `Foto de perfil de ${name} - DesignFlix`,
    SOCIAL: (platform: string) => `Link para o ${platform} do DesignFlix`,
    ICON: (action: string) => `Ícone de ${action}`,
} as const; 