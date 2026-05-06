// Web Worker para processamento de uploads em background
self.onmessage = function(e) {
  const { files, categoryId } = e.data;
  
  // Tipos de arquivo permitidos (apenas compactados)
  const allowedTypes = [
    'application/zip',
    'application/x-zip-compressed',
    'application/x-rar',
    'application/x-7z-compressed',
    'application/x-compressed'
  ];
  
  // Simular processamento em background
  const results = files.map((file, index) => {
    // Validar tipo de arquivo
    const isValidType = allowedTypes.includes(file.type);
    
    // Validar tamanho (máximo 300MB)
    const isValidSize = file.size <= 300 * 1024 * 1024;
    
    return {
      index,
      name: file.name,
      size: file.size,
      type: file.type,
      isValidType,
      isValidSize,
      isValid: isValidType && isValidSize,
      progress: 0
    };
  });
  
  // Enviar resultado de validação
  self.postMessage({
    type: 'validation',
    results,
    categoryId
  });
  
  // Simular progresso de upload
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    
    self.postMessage({
      type: 'progress',
      progress,
      categoryId
    });
    
    if (progress >= 100) {
      clearInterval(interval);
      self.postMessage({
        type: 'complete',
        categoryId
      });
    }
  }, 200);
};
