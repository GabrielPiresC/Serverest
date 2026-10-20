describe('Serverest - Front Dev', () => {
    beforeEach(() => {
        cy.visit('https://front.serverest.dev/login')
    })

    // CT01
    it('Verifica se cria cadastro normal com sucesso', () => {
      cy.get('[data-testid="cadastrar"]').click()
      cy.fixture('usuarios').then((usuarios) => {
        cy.fillCadastro(usuarios.cadastroNormal)
      })

      cy.get('.alert').should('be.visible').and('contain.text', 'Cadastro realizado com sucesso')
      cy.url().should('include', '/produtos')
    })

    // CT02
    it('Verifica falha ao cadastrar email normal já cadastrado', () => {
      cy.get('[data-testid="cadastrar"]').click()
      cy.fixture('usuarios').then((usuarios) => {
        cy.fillCadastro(usuarios.cadastroNormal)
      })

      cy.get('.alert').should('be.visible').and('contain.text', 'Este email já está sendo usado')
    })

    // CT03
    it('Verifica se cria cadastro administrador com sucesso', () => {
      cy.get('[data-testid="cadastrar"]').click()
      cy.fixture('usuarios').then((usuarios) => {
        cy.fillCadastro(usuarios.cadastroAdm)
      })
      cy.get('[data-testid="checkbox"]').check()
      cy.get('[data-testid="cadastrar"]').click()

      cy.get('.alert').should('be.visible').and('contain.text', 'Cadastro realizado com sucesso')
      cy.url().should('include', '/admin/home')
    })

    // CT04
    it('Verifica falha ao cadastrar email administrador já cadastrado', () => {
      cy.get('[data-testid="cadastrar"]').click()
      cy.fixture('usuarios').then((usuarios) => {
        cy.fillCadastro(usuarios.cadastroAdm)
      })

      cy.get('.alert').should('be.visible').and('contain.text', 'Este email já está sendo usado')
    })
    
    // CT05
    it('Verifica se cadastra produtos com sucesso', () => {
      cy.fixture('usuarios').then((usuarios) => {
        cy.fillLogin(usuarios.usuarioAdm)
      })

      cy.get('[data-testid="cadastrarProdutos"]').click()
      cy.fixture('produtos').then((produtos) => {
        cy.fillProduct(produtos.produto1)
      })
    })
})