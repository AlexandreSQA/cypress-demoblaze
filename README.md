# Cypress DemoBlaze — E2E Automation (BDD / Cucumber)

Projeto de automação de testes E2E para o site **DemoBlaze**, usando **Cypress** com **BDD (Gherkin/Cucumber)**.  
Os cenários simulam fluxos reais do usuário e geram evidências (screenshots) de sucesso e de falha.

---

## Visão geral

### O que este projeto cobre
- **Criação de conta** (signup + login)
- **Carrinho**: adicionar item (Monitor) e remover, validando carrinho vazio (com prints antes/depois)
- **Compra**: adicionar 3 produtos, finalizar pedido e validar sucesso

### Principais destaques técnicos
- BDD com arquivos `.feature` (Gherkin) para leitura simples
- Steps reaproveitáveis em `commonSteps.js` e comandos em `commands.js`
- Evidências automáticas:
  - prints de sucesso em pontos-chave
  - prints de falha via hook (`hooks.js`)
- Execução via **Runner (UI)** e **Headless (CLI)**

---

## Requisitos

- **Node.js (LTS)** e **npm**
- (Opcional) Git, para clonar o repositório

Verifique se está instalado:
```bash
node -v
npm -v

Instalação

Clone o repositório (ou baixe como ZIP e extraia):

git clone https://github.com/AlexandreSQA/cypress-demoblaze
cd cypress-demoblaze


Instale as dependências:

npm install

Como executar

O Cypress é executado via npx, sem necessidade de instalação global.

Rodar com Runner (modo interativo)
npx cypress open


Passos no Runner:

Selecione E2E Testing

Escolha um navegador (Chrome, Edge ou Electron)

Clique em Start E2E Testing

Selecione a feature desejada:

account.feature

cart-removal.feature

purchase.feature

Vantagens do Runner

Visualização passo a passo dos testes

Possibilidade de inspecionar elementos

Ideal para debug

Rodar sem Runner (modo headless)
npx cypress run


Esse modo executa todas as features diretamente no terminal.

Vantagens do headless

Execução mais rápida

Ideal para pipelines de CI/CD (GitHub Actions, GitLab, Jenkins)

Rodar apenas uma feature

Exemplos:

npx cypress run --spec "cypress/e2e/features/account.feature"

npx cypress run --spec "cypress/e2e/features/cart-removal.feature"

npx cypress run --spec "cypress/e2e/features/purchase.feature"

Evidências (Screenshots)

As evidências são geradas automaticamente em:

cypress/screenshots/

Tecnologias utilizadas

Cypress

Cucumber Preprocessor (@badeball/cypress-cucumber-preprocessor)

Esbuild Preprocessor (@bahmutov/cypress-esbuild-preprocessor)

Node.js / npm