# Cenários de teste

## CT01 - Cadastrar usuário normal com sucesso

### Prioridade: Alta | Criticidade: Alta

**Dado** que acesso a página inicial do ServeRest  
**E** clico em "Cadastre-se"  
**E** possuo dados válidos e únicos para um novo usuário comum  
**Quando** preencho os campos "nome", "email" e "senha"  
**E** clico em "Cadastrar"  
**Então** o cadastro deve ser realizado com sucesso  
**E** o usuário deve ser redirecionado para a página de produtos.

### Resultado esperado

O cadastro deve ser realizado com sucesso, deve ser exibida a mensagem "Cadastro realizado com sucesso" e o usuário deve ser redirecionado para a página de produtos.

---

## CT02 - Impede cadastro de email já existente

### Prioridade: Alta | Criticidade: Alta

### Pré-condição

Deve existir previamente um usuário comum cadastrado com o email utilizado no teste.

**Dado** que um usuário comum foi previamente criado por meio da API  
**E** acesso a página inicial do ServeRest  
**E** clico em "Cadastre-se"  
**Quando** preencho os campos "nome", "email" e "senha" utilizando o mesmo email do usuário previamente criado  
**E** clico em "Cadastrar"  
**Então** o sistema deve impedir o novo cadastro  
**E** deve exibir a mensagem "Este email já está sendo usado".

### Resultado esperado

O cadastro não deve ser realizado, a mensagem "Este email já está sendo usado" deve ser exibida e o usuário deve permanecer na página de cadastro.

---

## CT03 - Cadastrar usuário administrador com sucesso

### Prioridade: Alta | Criticidade: Alta

**Dado** que acesso a página inicial do ServeRest  
**E** clico em "Cadastre-se"  
**E** possuo dados válidos e únicos para um novo usuário  
**Quando** preencho os campos "nome", "email" e "senha"  
**E** marco a opção "Cadastrar como administrador"  
**E** clico em "Cadastrar"  
**Então** o cadastro deve ser realizado com sucesso
**E** deve exibir a mensagem "Cadastro realizado com sucesso"  
**E** o usuário deve ser redirecionado para a home administrativa.

### Resultado esperado

O cadastro deve ser realizado com sucesso, deve ser exibida a mensagem "Cadastro realizado com sucesso" e o administrador deve ser redirecionado para a home administrativa.

---

## CT04 - Impedir cadastro de administrador com email já cadastrado

### Prioridade: Alta | Criticidade: Alta

### Pré-condição

Deve existir previamente um usuário administrador cadastrado com o email utilizado no teste.

**Dado** que um usuário administrador foi previamente criado por meio da API  
**E** acesso a página inicial do ServeRest  
**E** clico em "Cadastre-se"  
**Quando** preencho os campos "nome", "email" e "senha" utilizando o mesmo email do administrador previamente criado  
**E** marco a opção "Cadastrar como administrador"  
**E** clico em "Cadastrar"  
**Então** o sistema deve impedir o novo cadastro  
**E** deve exibir a mensagem "Este email já está sendo usado".

### Resultado esperado

O cadastro não deve ser realizado, a mensagem "Este email já está sendo usado" deve ser exibida e o usuário deve permanecer na página de cadastro.

---

## CT05 - Cadastrar produto

### Prioridade: Alta | Criticidade: Alta

### Pré-condição

Deve existir um usuário administrador válido para realizar o login no sistema.

**Dado** que um administrador válido foi previamente criado por meio da API  
**E** realizo login na aplicação com esse administrador  
**E** acesso a funcionalidade "Cadastrar Produtos"  
**E** possuo dados válidos e únicos para um novo produto  
**Quando** preencho os campos "nome", "preço", "descrição" e "quantidade"  
**E** informo uma imagem, caso aplicável  
**E** clico em "Cadastrar"  
**Então** o produto deve ser cadastrado com sucesso.

### Resultado esperado

O produto é criado e incluído na lista de produtos.

---

## CT06 - Edita produto 

### Prioridade: Média | Criticidade: Alta

### Pré-condição

Deve estar logado como administrador e clicar em "Listar Produtos".

**Dado** que realizo o login como administrador 
**E** acesso a funcionalidade "Listar produtos"  
**E** localizo o produto pelo nome  
**Quando** clico em "editar"  
**E** altero qualquer campo  
**Quando** clico em "salvar"
**Então** o produto deve ser atualizado com sucesso.

### Resultado esperado

O produto é salvo com as novas informações editadas.

### Resultado obtido

Ao clicar no botão "Editar", a aplicação não permite prosseguir com a edição do produto.

**Status:** Bloqueado por defeito (pendente de confirmação na execução atual).

**Observação:** A falha impede a conclusão do fluxo de edição e a validação do resultado esperado.

---

## CT07 - Exclui produto

### Prioridade: Alta | Criticidade: Alta

### Pré-condição

Possuir um produto previamente cadastrado e estar autenticado como administrador.

**Dado** que realizo o login como administrador 
**E** acesso a funcionalidade "Listar produtos"  
**E** procuro o produto pelo nome  
**Quando** clico em "excluir"  
**Então** o produto deve ser excluido com sucesso.

### Resultado esperado

O produto é excluído da lista de produtos.

---

## CT08 - Adiciona produto à lista de compras

### Prioridade: Alta | Criticidade: Alta

### Pré-condição

Deve estar logado como usuário normal, localizar o produto desejado e clicar em "Adicionar a lista".

**Dado** que realizo o login como usuário 
**E** acesso a home da aplicação  
**E** localizo um produto pelo nome  
**Quando** clico em "Adicionar a lista" 
**Então** sou direcionado para a pagina "/minhaListaDeProdutos".

### Resultado esperado

O produto selecionado é movido para a "Lista de Compras" na página "/minhaListaDeProdutos".

---

## CT09 - Aumenta quantidade de produto na lista de compras

### Prioridade: Média | Criticidade: Média

### Pré-condição

Deve estar logado como usuário normal, acessando a página da lista de produtos (/minhaListaDeProdutos).

**Dado** que realizo o login como usuário 
**E** acesso a home da aplicação  
**E** clico em "Lista de Compras"  
**Quando** clico em "+" 
**Então** o valor visível deve alterar de "1" para "2".

### Resultado esperado

O produto selecionado na lista de comprar deve aumentar sua quantidade.

---

## CT10 - Diminui quantidade de produto na lista de compras

### Prioridade: Média | Criticidade: Média

### Pré-condição

Deve estar logado como usuário normal, acessando a página da lista de produtos (/minhaListaDeProdutos).

**Dado** que realizo o login como usuário 
**E** acesso a home da aplicação  
**E** clico em "Lista de Compras"  
**Quando** clico em "-" 
**Então** o valor visível deve alterar de "2" para "1".

### Resultado esperado

O produto selecionado na lista de comprar deve diminuir sua quantidade.

---

## CT11 - Limpa todos os produtos da lista de compras.

### Prioridade: Média | Criticidade: Média

### Pré-condição

Deve estar logado como usuário normal, acessando a página da lista de produtos (/minhaListaDeProdutos) e existir pelo menos um produto na lista de compras.

**Dado** que realizo o login como usuário 
**E** acesso a home da aplicação  
**E** clico em "Lista de Compras"  
**Quando** clico em "Limpar Lista" 
**Então** a lista deve ficar vazia e conter a mensagem "Seu carrinho está vazio".

### Resultado esperado

A lista de Compras deve ser esvaziada.