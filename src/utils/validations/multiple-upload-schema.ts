export interface MultipleUploadFormData {
    categories: Array<{ value: string; label: string }>;
    files: File[];
}

export const validateMultipleUpload = (data: MultipleUploadFormData): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    // Validar categoria (obrigatória)
    if (!data.categories || data.categories.length === 0) {
        errors.push('Pelo menos uma categoria é obrigatória');
    }

    // Validar arquivos (mínimo 1, máximo 20)
    if (!data.files || data.files.length === 0) {
        errors.push('Pelo menos um arquivo é obrigatório');
    } else if (data.files.length > 20) {
        errors.push('Máximo de 20 arquivos permitidos');
    }

    // Validar tipo de arquivo (apenas compactados)
    const allowedTypes = [
        'application/zip',
        'application/x-zip-compressed',
        'application/x-rar',
        'application/x-7z-compressed',
        'application/x-compressed'
    ];

    for (const file of data.files) {
        // Validar tipo de arquivo
        if (!allowedTypes.includes(file.type)) {
            errors.push(`Arquivo ${file.name} não é um arquivo compactado válido. Aceitamos apenas ZIP, RAR, 7Z e similares.`);
        }

        // Validar tamanho (máximo 300MB cada)
        if (file.size > 300 * 1024 * 1024) {
            errors.push(`Arquivo ${file.name} excede o tamanho máximo de 300MB`);
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};
