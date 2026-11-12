describe('Cadastro de usuários', () => {
  let usuarioId 

  beforeEach(() => {
    usuarioId = undefined

      cy.visit('https://front.serverest.dev/login')
  })

  afterEach(() => {
    if (usuarioId) {
      cy.excluirUsuarioApi(usuarioId)
    }
  })

    // CT01
  it('CT01 - Cadastra usuário normal com sucesso', () => {

    cy.intercept('POST', '**/usuarios').as('cadastrarUsuario')

    cy.gerarUsuario().then((usuario) => {

      cy.get('[data-testid="cadastrar"]').click()
      cy.preencherCadastro(usuario)

      cy.wait('@cadastrarUsuario').then((interception) => {
        expect(interception.response.statusCode).to.eq(201)

        usuarioId = interception.response.body._id
      })

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

      cy.criarUsuarioApi(usuario).then((response) => {
        usuarioId = response._id
      })

      cy.get('[data-testid="cadastrar"]').click()
      cy.preencherCadastro(usuario)

      cy.get('.alert')
        .should('be.visible')
        .and('contain.text', 'Este email já está sendo usado')

      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        body: usuario,
        failOnStatusCode: false,
      }).then((response) => {
          expect(response.status).to.eq(400)
      })
    })
  })

    // CT03
  it('CT03 - Cadastra administrador com sucesso', () => {

    cy.intercept('POST', '**/usuarios').as('cadastrarUsuario')

    cy.gerarUsuario('true').then((usuario) => {

      cy.get('[data-testid="cadastrar"]').click()
      cy.preencherCadastro(usuario)

      cy.wait('@cadastrarUsuario').then((interception) => {
        expect(interception.response.statusCode).to.eq(201)

        usuarioId = interception.response.body._id
      })

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

      cy.criarUsuarioApi(usuario).then((response) => {
        usuarioId = response._id
      })

      cy.get('[data-testid="cadastrar"]').click()
      cy.preencherCadastro(usuario)

      cy.get('.alert')
        .should('be.visible')
        .and('contain.text', 'Este email já está sendo usado')

      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        body: usuario,
        failOnStatusCode: false,
      }).then((response) => {
          expect(response.status).to.eq(400)
      })
    })
  })
})
    
describe('Gerenciamento de produtos', () => {
  let produtoId
  let usuarioAdmId

  beforeEach(() => {
    produtoId = undefined
    usuarioAdmId = undefined

    cy.visit('https://front.serverest.dev/login')

    cy.gerarUsuario('true').then((usuarioAdm) => {

      cy.criarUsuarioApi(usuarioAdm).then((response) => {
        usuarioAdmId = response._id
      })

      cy.loginApi(usuarioAdm).then((token) => {
        cy.wrap(token).as('token')
      })

      cy.fillLogin(usuarioAdm)

      cy.url().should('include', '/admin/home')
    })
  })

  afterEach(() => {
    if (produtoId) {
      cy.get('@token').then((token) => {
        cy.request({
          method: 'GET',
          url: `https://serverest.dev/produtos/${produtoId}`,
          failOnStatusCode: false
        }).then((response) => {
          if (response.status === 200) {
            cy.excluirProdutoApi(produtoId, token)
          } else if (response.status === 400 || response.status === 404) {
            cy.log('Produto já foi excluído')
          } else {
            throw new Error(`Erro inesperado: ${response.status}`)
          }
        })
      })
    }

    if (usuarioAdmId) {
      cy.excluirUsuarioApi(usuarioAdmId)
    }
  })

    // CT05
  it('CT05 - Cadastrar produto', () => {

    cy.intercept('POST', '**/produtos').as('cadastrarProduto')

    cy.get('[data-testid="cadastrarProdutos"]').click()

    cy.gerarProduto().then((produto) => {

      cy.fillProduct(produto)

      cy.wait('@cadastrarProduto').then((interception) => {
        expect(interception.response.statusCode).to.eq(201)

        produtoId = interception.response.body._id
      })

      cy.request({
        method: 'GET',
        url: 'https://serverest.dev/produtos',
        qs: {
          nome: produto.nome
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.quantidade).to.eq(1)
        expect(response.body.produtos[0].nome).to.eq(produto.nome)
      })
    })
  })

    //CT06
  it('CT06 - Edita produto', () => {

    cy.gerarProduto().then((produto) => {

      cy.get('@token').then((token) => {

        cy.criarProdutoApi(produto, token).then((response) => {
          produtoId = response._id
        })

        cy.log(`Produto para limpeza: ${produtoId}`)

        cy.get('[data-testid="listar-produtos"]').click()

        cy.contains('tr', produto.nome)
          .within(() => {
            cy.contains('button', 'Editar').click()
          })
      })
    })
  })
    
    //CT07
  it('CT07 - Exclui produto', () => {

    cy.gerarProduto().then((produto) => {

      cy.get('@token').then((token) => {

        cy.criarProdutoApi(produto, token).then((response) => {
          produtoId = response._id
        })

        cy.get('[data-testid="listar-produtos"]').click()

        cy.contains('tr', produto.nome)
          .within(() => {
            cy.contains('button', 'Excluir').click()
          })

        cy.contains('tr', produto.nome).should('not.exist')
      })
    })
  })
})

describe('Lista de compras', () => {    
  let usuarioId
  let usuarioAdmId
  let produtoId
  let tokenAdm

  beforeEach(() => {
    usuarioId = undefined
    usuarioAdmId = undefined
    produtoId = undefined
    tokenAdm = undefined

    cy.visit('https://front.serverest.dev/login')
    
    cy.gerarUsuario().then((usuario) => {
      cy.criarUsuarioApi(usuario).then((response) => {
        usuarioId = response._id
      })

      cy.fillLogin(usuario)

      cy.url().should('include', '/home')
    })

    cy.gerarUsuario('true').then((usuarioAdm) => {
      cy.criarUsuarioApi(usuarioAdm).then((response) => {
        usuarioAdmId = response._id
      })

      cy.loginApi(usuarioAdm).then((token) => {
        tokenAdm = token

        cy.gerarProduto().then((produto) => {
          cy.criarProdutoApi(produto, token).then((response) => {
            produtoId = response._id
          })

          cy.wrap(produto).as('produto')
        })
      })
    })
  })

  afterEach(() => {

    if (produtoId && tokenAdm) {
      cy.excluirProdutoApi(produtoId, tokenAdm)
    }

    if (usuarioId) {
      cy.excluirUsuarioApi(usuarioId)
    }

    if (usuarioAdmId) {
      cy.excluirUsuarioApi(usuarioAdmId)
    }

  })

  //CT08
  it('CT08 - Adiciona produto à lista de compras', () => {

    cy.get('@produto').then((produto) => {

      cy.get('[data-testid="pesquisar"]')
        .type(produto.nome)

      cy.get('[data-testid="botaoPesquisar"]')
        .click()

      cy.contains('h5', produto.nome)
        .should('be.visible')
        .parents('.card')
        .within(() => {
          cy.get('[data-testid="adicionarNaLista"]').click()
        })

      cy.url().should('include', '/minhaListaDeProdutos')

      cy.contains(produto.nome)
        .should('be.visible')
    })
  })

  describe('Produto já adicionado à lista de compras', () => {

    beforeEach(() => {

      cy.get('@produto').then((produto) => {

        cy.get('[data-testid="pesquisar"]')
          .type(produto.nome)

        cy.get('[data-testid="botaoPesquisar"]')
          .click()

        cy.contains('h5', produto.nome)
          .should('be.visible')
          .parents('.card')
          .within(() => {
            cy.get('[data-testid="adicionarNaLista"]').click()
          })

        cy.url().should('include', '/minhaListaDeProdutos')

        cy.contains(produto.nome)
          .should('be.visible')
      })
    })

    //CT09
    it('CT09 - Aumenta quantidade de produto na lista de compras', () => {

      cy.get('@produto').then((produto) => {

        cy.getQuantidadeProduto(produto)
          .should('have.text', '1')

        cy.alterarQuantidadeProduto(produto, 'aumentar')

        cy.getQuantidadeProduto(produto)
          .should('have.text', '2')
      })
    })

    //CT10
    it('CT10 - Diminui quantidade de produto na lista de compras', () => {

      cy.get('@produto').then((produto) => {

        cy.alterarQuantidadeProduto(produto, 'aumentar')

        cy.getQuantidadeProduto(produto)
          .should('have.text', '2')

        cy.alterarQuantidadeProduto(produto, 'diminuir')

        cy.getQuantidadeProduto(produto)
          .should('have.text', '1')
      })
    })

    //CT11
    it('CT11 - Limpa todos os produtos da lista de compras', () => {

      cy.get('[data-testid="limparLista"]')
        .click()

      cy.get('[data-testid="shopping-cart-empty-message"]')
        .should('be.visible')
        .and('have.text', 'Seu carrinho está vazio')
    })
  })
})