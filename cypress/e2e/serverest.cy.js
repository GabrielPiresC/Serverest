describe('Cadastro de usuários', () => {
  beforeEach(() => {
      cy.visit('https://front.serverest.dev/login')
  })

    // CT01
  it('CT01 - Cadastra usuário normal com sucesso', () => {
    cy.gerarUsuario().then((usuario) => {

      cy.get('[data-testid="cadastrar"]').click()
      cy.preencherCadastro(usuario)

      cy.get('.alert')
        .should('be.visible')
        .and('contain.text', 'Cadastro realizado com sucesso')

      cy.url().should('include', '/home')
    })
  })

    // CT02
  it('CT02 - Impede cadastro de email já existente', () => {
    cy.gerarUsuario().then((usuario) => {

      cy.criarUsuarioApi(usuario)

      cy.get('[data-testid="cadastrar"]').click()
      cy.preencherCadastro(usuario)

      cy.get('.alert')
        .should('be.visible')
        .and('contain.text', 'Este email já está sendo usado')
    })
  })

    // CT03
  it('CT03 - Cadastra administrador com sucesso', () => {
    cy.gerarUsuario('true').then((usuario) => {

      cy.get('[data-testid="cadastrar"]').click()
      cy.preencherCadastro(usuario)

      cy.get('.alert')
        .should('be.visible')
        .and('contain.text', 'Cadastro realizado com sucesso')

      cy.url().should('include', '/admin/home')
    })
  })

    // CT04
  it('CT04 - Impede cadastro de administrador com email existente', () => {
    cy.gerarUsuario('true').then((usuario) => {

      cy.criarUsuarioApi(usuario)

      cy.get('[data-testid="cadastrar"]').click()
      cy.preencherCadastro(usuario)

      cy.get('.alert')
        .should('be.visible')
        .and('contain.text', 'Este email já está sendo usado')
    })
  })
})
    
describe('Gerenciamento de produtos', () => {    
  beforeEach(() => {
    cy.visit('https://front.serverest.dev/login')
    
    cy.gerarUsuario('true').then((usuarioAdm) => {

      cy.criarUsuarioApi(usuarioAdm)

      cy.fillLogin(usuarioAdm)

      cy.url().should('include', '/admin/home')
    })
  })

    // CT05
  it('CT05 - Cadastra produto', () => {

    cy.get('[data-testid="cadastrarProdutos"]').click()

    cy.gerarProduto().then((produto) => {

      cy.fillProduct(produto)
    })
  })

    //CT06
  it.only('CT06 - Edita produto', () => {

    cy.gerarProduto().then((produto) => {

      cy.criarProdutoApi(produto)

      cy.get('[data-testid="listar-produtos"]').click()

      cy.contains('tr', produto.nome)
        .within(() => {
          cy.get('[data-testid="editar-produto"]').click()
        })
    })
  })
    
    //CT07
  it('CT07 - Exclui produto', () => {

    cy.gerarProduto().then((produto) => {

      cy.criarProdutoApi(produto)

      cy.get('[data-testid="listar-produtos"]').click()

      cy.contains('tr', produto.nome)
        .within(() => {
          cy.get('[data-testid="excluir-produto"]').click()
        })

      cy.contains(produto.nome).should('not.exist')
    })
  })
})