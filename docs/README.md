[![Badge ServeRest](https://img.shields.io/badge/API-ServeRest-green)](https://github.com/ServeRest/ServeRest/)

# 🧪 ServeRest - Testes Automatizados com Cypress

Projeto de automação de testes E2E desenvolvido com **Cypress**, utilizando a aplicação ServeRest como ambiente de testes.

## 🎯 Objetivo do projeto

Automatizar os principais fluxos da aplicação ServeRest, validando comportamentos essenciais do sistema e praticando conceitos utilizados no dia a dia de QA.

Além da automação de interface, o projeto contempla validações de API, documentação dos casos de teste, definição de prioridade e criticidade, gerenciamento de dados de teste, registro de defeitos e integração contínua com GitHub Actions.

## 🧪 Cenários testados

Atualmente, o projeto possui **11 cenários de teste automatizados**, divididos em três funcionalidades:

**Cadastro de usuários**
- CT01 - Cadastrar usuário normal com sucesso
- CT02 - Impedir cadastro com e-mail já existente
- CT03 - Cadastrar usuário administrador com sucesso
- CT04 - Impedir cadastro de administrador com e-mail já existente

**Gerenciamento de produtos**
- CT05 - Cadastrar produto
- CT06 - Editar produto (funcionalidade com defeito identificado)
- CT07 - Excluir produto

**Lista de compras**
- CT08 - Adicionar produto à lista de compras
- CT09 - Aumentar quantidade de produto
- CT10 - Diminuir quantidade de produto
- CT11 - Limpar todos os produtos da lista de compras

Os casos de teste detalhados estão disponíveis em:

`docs/casos-de-teste.md`

**Observação:** O CT06 possui um defeito identificado na funcionalidade de edição. O teste automatizado ainda não valida a edição completa.

## 🔗 Integração com API

O projeto utiliza requisições HTTP por meio do `cy.request()` para:

- Criar usuários e produtos como pré-condições.
- Autenticar administradores e obter tokens de acesso.
- Validar respostas e códigos HTTP.
- Confirmar o cadastro de registros pela API.
- Excluir dados criados durante os testes.

Essa abordagem reduz a dependência de ações repetitivas na interface e permite combinar validações de frontend e backend.

## 🧹 Gerenciamento de dados de teste

O projeto implementa limpeza automática dos dados gerados durante a execução dos testes.

Utilizando hooks `beforeEach()` e `afterEach()`, além de custom commands, a automação realiza:

- Geração de dados dinâmicos para usuários e produtos.
- Captura dos IDs dos registros criados.
- Exclusão automática de usuários e produtos pela API.
- Tratamento de produtos previamente excluídos.
- Redução do acúmulo de dados no ambiente de testes.

Essa estratégia contribui para a independência dos cenários e a confiabilidade das execuções.

## 🐞 Registro de defeitos

Os defeitos identificados durante os testes são documentados utilizando **GitHub Issues**, contendo:

- Descrição do problema.
- Passos para reprodução.
- Resultado esperado e observado.
- Classificação de prioridade e severidade.
- Evidências em imagem ou vídeo.

**Defeito identificado:** CT06 - Botão Editar não permite realizar a edição de produtos.

## 🛠️ Tecnologias utilizadas

- JavaScript
- Cypress
- Node.js
- npm
- Git
- GitHub
- GitHub Actions
- API REST

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/GabrielPiresC/ServeRest.git
```

### 2. Acesse a pasta

```bash
cd ServeRest
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Abra o Cypress

```bash
npx cypress open
```

Ou execute os testes diretamente pelo terminal:

```bash
npx cypress run
```

Os testes utilizam os ambientes públicos do ServeRest:

- Frontend: https://front.serverest.dev
- API: https://serverest.dev

## ⚙️ Integração Contínua

O projeto utiliza **GitHub Actions** para executar automaticamente os testes Cypress a cada `push` ou Pull Request direcionado à branch `main`.

O workflow configura o ambiente de execução, instala as dependências e executa os testes no navegador Chrome.

Em caso de falhas, screenshots e vídeos disponíveis são armazenados como artefatos para facilitar a análise dos resultados.

O workflow também permite execução manual pela aba **Actions** do GitHub.

## 👨‍💻 Autor

Desenvolvido por Gabriel Pires como projeto de estudo e prática de **Quality Assurance, testes de API e automação de testes**.