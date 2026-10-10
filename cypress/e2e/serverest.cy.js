describe('Serverest - Front Dev', () => {
    beforeEach(() => {
        cy.visit('https://front.serverest.dev/login')
    })

    // CT01
    it('Verifica se cria cadastro normal com sucesso', () => {
      cy.get('[data-testid="cadastrar"]').click()
      cy.fixture('usuarios').then((usuarios) => {
        cy.fillLogin(usuarios.usuarioNormal)
      })

      cy.get('.alert').should('be.visible').and('contain.text', 'Cadastro realizado com sucesso')
      cy.url().should('include', '/produtos')
    })

    // CT02
    it.only('Verifica falha ao cadastrar email já cadastrado', () => {
      cy.get('[data-testid="cadastrar"]').click()
      cy.fixture('usuarios').then((usuarios) => {
        cy.fillLogin(usuarios.usuarioNormal)
      })

      cy.get('.alert').should('be.visible').and('contain.text', 'Este email já está sendo usado')
    })

    // CT03
})