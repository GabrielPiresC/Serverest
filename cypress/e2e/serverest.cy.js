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

      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/login',
        body: {
          email: usuario.email,
          password: usuario.password
        }
      }).then((response) => {
          expect(response.status).to.eq(200)
      })
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

      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        failOnStatusCode: false,
      }).then((response) => {
          expect(response.status).to.eq(400)
      })
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
      
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/login',
        body: {
          email: usuario.email,
          password: usuario.password
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
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

      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        failOnStatusCode: false,
      }).then((response) => {
          expect(response.status).to.eq(400)
      })
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

      cy.request({
        method: 'GET',
        url: 'https://serverest.dev/produtos?nome=${produto.nome}'
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })
  })

    //CT06
  it('CT06 - Edita produto', () => {

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

describe('Lista de compras', () => {    
  beforeEach(() => {
    cy.visit('https://front.serverest.dev/login')
    
    cy.gerarUsuario().then((usuario) => {
      cy.criarUsuarioApi(usuario)

      cy.fillLogin(usuario)

      cy.url().should('include', '/home')
    })

    cy.gerarUsuario('true').then((usuarioAdm) => {
      cy.criarUsuarioApi(usuarioAdm)

      cy.loginApi(usuarioAdm).then((token) => {
        
        cy.gerarProduto().then((produto) => {
          cy.criarProdutoApi(produto, token)

          cy.wrap(produto).as('produto')
        })
      })
    })
  })

  it('CT08 - Adiciona produto à lista de compras', () => {
    cy.get('@produto').then((produto) => {
      cy.get('[data-testid="adicionarCarrinho"]').click()
    })
  })

})