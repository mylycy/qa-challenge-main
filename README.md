# QA Challenge

## Projeto de automação de testes com **Playwright** e **Cucumber**, utilizando **TypeScript**. Os testes são executados em paralelo, com geração automática de relatórios e integração contínua via GitHub Actions.


## 🧠 Requisitos Técnicos

- **Node.js** >= 14.x
- **TypeScript** >= 4.x
- **Playwright** >= 1.12.x

### 🧑‍🏫 Passos para instalação:

1. Clone este repositório:

   ```bash
   git clone <link-do-repositorio>
   cd nome-do-repositorio
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Para rodar os testes de UI:

   ```bash
   npx cucumber-js --profile ui
   ```

4. Para rodar os testes de API:

   ```bash
   npx cucumber-js --profile api
   ```
   
5. Para rodar os testes de em paralelo e gerar o report:

   ```bash
   npm-run-all --parallel test:ui test:api && npm run report
   ```

### 📘 Estrutura do Projeto

```plaintext
├── .github/ # Configurações do GitHub (ex: workflows CI/CD)
├── @types/ # Tipagens customizadas TypeScript
├── features/ # Testes BDD organizados por tipo
│ ├── api/ # Testes de API
│ │ ├── specs/ # Especificações (arquivos .ts)
│ │ ├── step-definitions/ # Implementação dos steps
│ │ └── api.feature # Arquivo de cenários BDD para API
│ ├── ui/ # Testes de UI
│ │ ├── specs/ # Especificações (arquivos .ts)
│ │ ├── step-definitions/ # Implementação dos steps
│ │ └── ui.feature # Arquivo de cenários BDD para UI
├── reports/ # Relatórios HTML gerados
├── screenshots/ # Evidências visuais (screenshots)
├── support/ # Arquivos de suporte e utilitários
├── .gitignore
├── README.md
├── cucumber.js # Configuração do Cucumber.js (profiles)
├── generate-reports.ts # Script para geração de relatórios
├── package-lock.json
├── package.json
├── playwright.config.ts # Configuração do Playwright
└── tsconfig.json # Configuração TypeScript
```


## 🧪 Descrição dos Testes

### 💻 Testes de UI  
📁 **Localizados em:** `features/ui`

Esses testes validam o comportamento visual e funcional das páginas da aplicação em diferentes navegadores com Playwright.

**✅ Exemplos de verificações:**

- Validação de campos obrigatórios  
- Navegação entre páginas  
- Exibição de mensagens de erro  
- Captura de evidências com screenshots em caso de falhas

---

### 🔌 Testes de API  
📁 **Localizados em:** `features/api`

Esses testes realizam chamadas HTTP e validam o comportamento das APIs da aplicação.

**✅ Exemplos de verificações:**

- Status de resposta (200, 400, 500, etc.)  
- Validação de contratos de resposta  
- Conteúdo retornado (valores esperados, mensagens de erro)

### 👩‍💻 Tecnologias utilizadas

-Playwright
-Cucumber.js
-TypeScript
-GitHub Actions

### 🖥️ Observação

💡 Todos os comandos deste projeto foram testados e executados utilizando o Git Bash como terminal.
Recomenda-se usá-lo para garantir compatibilidade com scripts e comandos, especialmente em ambientes Windows.
