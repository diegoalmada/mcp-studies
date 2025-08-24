# mcp-studies
Repo responsável por estudos relacionados a MCP (Model Context Protocol)

## Configuração

- Clone o repositório
- Instale as dependências:
```bash
npm install
```

## Build project
```bash
npm run build
```

## Inicializar MCP
```bash
npm run dev
```

## Funcionalidades Disponíveis

O servidor MCP oferece duas ferramentas principais:

1. `get-alerts`: Obtém alertas meteorológicos para um estado específico
   - Parâmetro: `state` (código do estado com 2 letras, ex: CA, NY)

2. `get-forecast`: Obtém previsão do tempo para uma localização específica
   - Parâmetros: 
     - `latitude` (entre -90 e 90)
     - `longitude` (entre -180 e 180)
