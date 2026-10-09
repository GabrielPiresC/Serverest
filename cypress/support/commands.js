Cypress.Commands.add('fillLogin', (usuario) => {
    cy.get('[data-testid="nome"]').type(usuario.nome)
    cy.get('[data-testid="email"]').type(usuario.email)
    cy.get('[data-testid="password"]').type(usuario.password)
    cy.get('[data-testid="cadastrar"]').click()
})