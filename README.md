# Cypress DemoBlaze (BDD com Cucumber) — Manual de Instalação e Execução

Este projeto automatiza cenários de teste no site **DemoBlaze** usando:
- **Cypress** (automação de UI)
- **BDD (Gherkin)** com **Cucumber Preprocessor** (`@badeball/cypress-cucumber-preprocessor`)
- **Node.js + npm** (para instalar dependências e executar comandos)

Os testes cobrem:
- **Criação de conta**
- **Remoção de item do carrinho (Monitors)**
- **Compra com 3 produtos**

---

## Sumário
1. [Pré-requisitos](#pré-requisitos)
2. [Como baixar o projeto](#como-baixar-o-projeto)
3. [Instalação do Node.js e npm](#instalação-do-nodejs-e-npm)
4. [Instalação das dependências do projeto](#instalação-das-dependências-do-projeto)
5. [Estrutura do projeto](#estrutura-do-projeto)
6. [Como rodar os testes](#como-rodar-os-testes)
   - [Rodar com Runner (modo interativo)](#rodar-com-runner-modo-interativo)
   - [Rodar sem Runner (modo headless)](#rodar-sem-runner-modo-headless)
7. [Como rodar apenas um cenário/feature](#como-rodar-apenas-um-cenáriofeature)
8. [Screenshots e evidências](#screenshots-e-evidências)
9. [Dicas e solução de problemas](#dicas-e-solução-de-problemas)
10. [Tecnologias usadas](#tecnologias-usadas)

---

## Pré-requisitos

Você precisa ter instalado na máquina:
- **Node.js** (recomendado: versão LTS)
- **npm** (vem junto com o Node)
- **Git** (opcional, se você baixar por clone)

> Se você não sabe se já tem Node instalado, veja a seção **[Verificando instalações](#verificando-instalações)**.

---

## Como baixar o projeto

### Opção A — Baixar como ZIP (mais simples)
1. Baixe o projeto como `.zip`
2. Extraia em uma pasta, por exemplo: `Desktop/cypress-demoblaze`

### Opção B — Clonar com Git
1. Abra o terminal na pasta onde quer salvar o projeto
2. Rode:
   ```bash
   git clone <URL_DO_REPOSITORIO>
Entre na pasta:

cd cypress-demoblaze
Instalação do Node.js e npm
Windows / macOS
Acesse o site oficial do Node.js e baixe a versão LTS

Instale normalmente (Next > Next > Finish)

Verificando instalações
Abra o terminal (Windows: PowerShell / CMD, macOS: Terminal) e rode:

node -v
npm -v
Se aparecerem versões (ex: v20.x.x), está tudo certo.

Se der erro (ex: “node não é reconhecido”), reinstale o Node e confirme se marcou opção de adicionar ao PATH.

Instalação das dependências do projeto
Com o terminal aberto na pasta do projeto (onde está o package.json), execute:

npm install
Isso vai baixar tudo o que o projeto precisa (Cypress, plugins, etc).

Importante: na primeira vez pode demorar um pouco.

Estrutura do projeto
Pastas principais:

cypress/e2e/features/

Arquivos .feature com cenários em BDD (Gherkin)

Exemplos:

account.feature

cart-removal.feature

purchase.feature

cypress/support/step_definitions/

Implementação dos steps do Cucumber (JavaScript)

Arquivos principais:

commonSteps.js (steps reutilizáveis)

hooks.js (Before/After, setup e prints de falha)

cypress/support/commands.js

Custom commands do Cypress (ex: login, signup, add to cart, checkout, etc)

cypress/fixtures/user.json

Arquivo gerado automaticamente com o usuário criado no signup

cypress/screenshots/

Evidências (prints) geradas pelos testes

Como rodar os testes
Existem duas formas principais:

1) Rodar com Runner (modo interativo)
Esse modo abre a interface do Cypress para você ver os testes rodando no navegador.

No terminal, dentro do projeto, execute:

npx cypress open
O Cypress vai abrir uma tela:

Selecione E2E Testing

Escolha um navegador (Chrome, Edge, Electron)

Clique em Start E2E Testing

Você verá a lista de specs/features do lado esquerdo.
Clique, por exemplo, em:

account.feature

cart-removal.feature

purchase.feature

Vantagens do Runner:

Você vê o teste passo a passo

Pode inspecionar elementos

Ótimo para debug

2) Rodar sem Runner (modo headless)
Esse modo roda tudo no terminal, sem abrir janela interativa.

No terminal, execute:

npx cypress run
Isso roda todas as features.

Vantagens do headless:

Mais rápido

Ideal para CI/CD (GitHub Actions, GitLab, Jenkins)

Gera relatório no terminal e screenshots em caso de falha

Como rodar apenas um cenário/feature
Rodar apenas UMA feature no headless:
Exemplo para rodar só o carrinho:

npx cypress run --spec "cypress/e2e/features/cart-removal.feature"
Ou só o fluxo de compra:

npx cypress run --spec "cypress/e2e/features/purchase.feature"
Rodar apenas UMA feature no Runner:
npx cypress open

Clique na feature desejada na lista

Screenshots e evidências
Prints de sucesso
O projeto gera prints de sucesso em momentos importantes, como:

SUCESSO_home_logada.png

SUCESSO_compra_concluida.png

CARRINHO_01_com_<produto>.png

CARRINHO_02_sem_<produto>.png

Prints de falha
Em caso de falha, o hooks.js gera um print automático:

FAIL_<nome_do_cenario>.png

Onde ficam os prints?
Eles ficam em:

cypress/screenshots/
Dica: se você rodar os testes várias vezes, os prints podem acumular.
Se quiser “limpar” antes de rodar, apague a pasta cypress/screenshots.


Tecnologias usadas

Node.js + npm

Cypress

Cucumber Preprocessor:

@badeball/cypress-cucumber-preprocessor

Preprocessor bundler:

@bahmutov/cypress-esbuild-preprocessor

esbuild

Execução rápida (resumo)
Depois de instalar, os dois comandos principais são:

Runner (interativo):

npx cypress open

Headless (terminal):

npx cypress run