Cypress.Commands.add('gerarUsuario', (administrador = 'false') => {
  return {
    nome: administrador === 'true' ? 'Usuario Admin' : 'Usuario Normal',
    email: `teste${Date.now()}${Math.random()}@email.com`,
    password: '123456',
    administrador
  }
})

Cypress.Commands.add('criarUsuarioApi', (usuario) => {
  cy.request({
    method: 'POST',
    url: 'https://serverest.dev/usuarios',
    body: usuario
  }).then((response) => {
    expect(response.status).to.eq(201)
    return response.body
  })
})

Cypress.Commands.add('preencherCadastro', (usuario) => {
  cy.get('[data-testid="nome"]').type(usuario.nome)
  cy.get('[data-testid="email"]').type(usuario.email)
  cy.get('[data-testid="password"]').type(usuario.password)

  if (usuario.administrador === 'true') {
    cy.get('[data-testid="checkbox"]').check()
  }

  cy.get('[data-testid="cadastrar"]').click()
})

Cypress.Commands.add('gerarProduto', () => {
  return {
    nome: `Produto ${Date.now()}`,
    preco: 100,
    descricao: 'Produto teste',
    quantidade: 10
  }
})

Cypress.Commands.add('fillLogin', (usuario) => {
  cy.get('[data-testid="email"]').type(usuario.email)
  cy.get('[data-testid="senha"]').type(usuario.password)
  cy.get('[data-testid="entrar"]').click()
})

Cypress.Commands.add('fillProduct', (produto) => {
  cy.get('[data-testid="nome"]').type(produto.nome)
  cy.get('[data-testid="preco"]').type(produto.preco)
  cy.get('[data-testid="descricao"]').type(produto.descricao)
  cy.get('[data-testid="quantity"]').type(produto.quantidade)

  cy.get('[data-testid="cadastarProdutos"]').click()
})

Cypress.Commands.add('criarProdutoApi', (produto) => {
  cy.request({
    method: 'PUT',
    url: 'https://serverest.dev/produtos',
    body: produto
  }).then((response) => {
    expect(response.status).to.eq(201)
    return response.body
  })
})

Cypress.Commands.add('loginApi', (usuario) => {
  return cy.request({
    method: 'POST',
    url: 'https://serverest.dev/login',
    body: {
      email: usuario.email,
      password: usuario.password
    }
  }).then((response) => {
    expect(response.status).to.eq(200)

    return response.body.authorization
  })
})