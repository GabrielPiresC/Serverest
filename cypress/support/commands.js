Cypress.Commands.add('fillCadastro', (usuario) => {
    cy.get('[data-testid="nome"]').type(usuario.nome)
    cy.get('[data-testid="email"]').type(usuario.email)
    cy.get('[data-testid="password"]').type(usuario.password)
})

Cypress.Commands.add('fillLogin', (usuario) => {
    cy.get('[data-testid="email"]').type(usuario.email)
    cy.get('[data-testid="senha"]').type(usuario.senha)
    cy.get('[data-testid="entrar"]').click()
})

Cypress.Commands.add('fillProduct', (produto) => {
    cy.get('[data-testid="nome"]').type(produto.nome)
    cy.get('[data-testid="preco"]').type(produto.preço)
    cy.get('[data-testid="descricao"]').type(produto.descrição)
    cy.get('[data-testid="quantity"]').type(produto.quantidade)
    cy.get('[data-testid="cadastarProdutos"]').click()
})