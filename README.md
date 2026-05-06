## Executar app desktop (Electron)

Requisitos: Node 18+, Yarn.

1. Instale dependências:

```
yarn
```

2. Crie `.env.development` com:

```
VITE_BACKOFFICE_API_URL=https://sua-api.dev
VITE_RECAPTCHA_SITE_KEY=chave-dev-opcional
```

3. Rodar em desenvolvimento:

```
yarn dev:electron
```

O app abre em `/login`. As chamadas aparecem no DevTools (Network). 

## Rodar em modo de teste

Crie `.env.test` com as variáveis necessárias (mesmo formato do development) e execute:

```
yarn test:electron
```

## Build web

```
yarn build
```
