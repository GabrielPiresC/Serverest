[![Badge ServeRest](https://img.shields.io/badge/API-ServeRest-green)](https://github.com/ServeRest/ServeRest)
![Cypress](https://img.shields.io/badge/Tests-Cypress-69D3A7)
![Postman](https://img.shields.io/badge/API%20Tests-Postman-FF6C37)
![Newman](https://img.shields.io/badge/Runner-Newman-orange)

# 🧪 ServeRest - Testes Automatizados com Cypress e Postman

Projeto de automação de testes E2E e API desenvolvido com **Cypress, Postman e Newman**, utilizando a aplicação ServeRest como ambiente de testes.

## 🎯 Objetivo do projeto

Automatizar os principais fluxos da aplicação ServeRest, validando comportamentos essenciais do sistema e praticando conceitos utilizados no dia a dia de QA.

Além da automação de interface, o projeto contempla testes de API, documentação dos casos de teste, definição de prioridade e criticidade, gerenciamento de dados de teste, registro de defeitos e integração contínua com GitHub Actions.

## 🧪 Cenários testados

### Testes E2E — Cypress

Atualmente, o projeto possui **11 cenários automatizados com Cypress**, divididos em três funcionalidades:

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

`docs/casos-de-testes.md`

**Observação:** O CT06 possui um defeito identificado na funcionalidade de edição. O teste automatizado ainda não valida a edição completa.

### Testes de API — Postman + Newman

O projeto também possui uma collection do Postman com testes automatizados para os principais endpoints da API ServeRest.

**Autenticação**
- Login de administrador.
- Login de usuário comum.
- Captura dinâmica de tokens de autenticação.

**Usuários**
- Cadastro de usuários.
- Listagem e consulta por ID.
- Edição de informações.
- Validação das alterações.
- Exclusão de registros.

**Produtos**
- Cadastro de produtos.
- Listagem e consulta por ID.
- Edição de informações.
- Validação das alterações.
- Exclusão e confirmação da remoção.

**Carrinhos**
- Listagem de carrinhos.
- Cadastro e consulta de carrinho.
- Conclusão de compra.
- Cancelamento de compra com devolução dos produtos ao estoque.

A collection utiliza scripts de validação para verificar códigos HTTP, mensagens de resposta e dados retornados pela API.

**Resultado da execução no Postman Collection Runner: 42 verificações aprovadas, sem falhas.**

A execução automatizada também foi validada localmente pelo Newman e integrada ao GitHub Actions.

## 🔗 Integração com API

O projeto trabalha com testes de API de duas formas:

**Cypress — `cy.request()`**
- Criação de usuários e produtos como pré-condições.
- Autenticação e obtenção de tokens.
- Validação de respostas HTTP.
- Confirmação de registros criados.
- Exclusão automática de dados de teste.

**Postman + Newman**
- Execução de requisições HTTP para os endpoints do ServeRest.
- Validação de status e conteúdo das respostas.
- Utilização de variáveis dinâmicas para IDs e tokens.
- Execução sequencial dos cenários.
- Automação das collections pelo terminal e GitHub Actions.

Essa abordagem permite validar tanto os fluxos completos da aplicação quanto o comportamento dos endpoints de maneira independente da interface.

## 🧹 Gerenciamento de dados de teste

O projeto implementa estratégias de limpeza dos dados gerados durante a execução dos testes.

**No Cypress**, são utilizados hooks `beforeEach()` e `afterEach()`, além de custom commands, para:

- Gerar dados dinâmicos para usuários e produtos.
- Capturar os IDs dos registros criados.
- Excluir automaticamente usuários e produtos pela API.
- Tratar produtos previamente excluídos.
- Reduzir o acúmulo de dados no ambiente de testes.

**No Postman**, a collection utiliza variáveis dinâmicas e requisições de preparação e limpeza para:

- Criar usuários e produtos durante a execução.
- Capturar IDs e tokens retornados pela API.
- Reutilizar os dados entre requisições.
- Excluir os registros criados ao final do fluxo.

Essa estratégia reduz a dependência de dados previamente existentes e contribui para a confiabilidade das execuções recorrentes.

## 🐞 Registro de defeitos

Os defeitos identificados durante os testes são documentados utilizando **GitHub Issues**, contendo:

- Descrição do problema.
- Passos para reprodução.
- Resultado esperado e observado.
- Classificação de prioridade e severidade.
- Evidências em imagem ou vídeo.

**Defeito identificado:** CT06 - Botão Editar não permite realizar a edição de produtos pela interface administrativa.

A edição pela API foi validada separadamente utilizando Postman.

## 🛠️ Tecnologias utilizadas

- JavaScript
- Cypress
- Postman
- Newman
- API REST
- Node.js
- npm
- Git
- GitHub
- GitHub Actions

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/GabrielPiresC/Serverest.git
```

### 2. Acesse a pasta

```bash
cd Serverest
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute os testes E2E com Cypress

Para abrir a interface do Cypress:

```bash
npm run cy:open
```

Ou execute os testes diretamente pelo terminal:

```bash
npm test
```

### 5. Execute os testes de API com Newman

Para executar a collection completa do Postman:

```bash
npm run test:api
```

O comando executa as requisições e validações da collection, apresentando os resultados diretamente no terminal.

Os testes utilizam os ambientes públicos do ServeRest:

- Frontend: https://front.serverest.dev
- API: https://serverest.dev

## ⚙️ Integração Contínua

O projeto utiliza **GitHub Actions** para executar automaticamente os testes Cypress e Newman a cada `push` ou Pull Request direcionado à branch `main`.

A integração contínua está organizada em dois workflows:

**Cypress E2E Tests**
- Configura o ambiente de execução.
- Instala as dependências.
- Executa os cenários E2E no navegador Chrome.
- Armazena screenshots e vídeos disponíveis em caso de falhas.

**API Tests - Newman**
- Configura o ambiente Node.js.
- Instala as dependências do projeto.
- Executa a collection do Postman utilizando Newman.
- Valida os resultados dos testes de API.

Ambos os workflows também permitem execução manual pela aba **Actions** do GitHub.

Essa integração permite identificar possíveis regressões automaticamente antes da integração de novas alterações ao projeto.

## 👨‍💻 Autor

Desenvolvido por Gabriel Pires como projeto de estudo e prática de **Quality Assurance, testes E2E, testes de API e automação de testes**.