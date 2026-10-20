# Cenários de teste

## CT01 - Cadastrar usuário comum com sucesso

### Prioridade: -- | Criticidade: --

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

## CT02 - Impedir cadastro de usuário com email já cadastrado

### Prioridade: -- | Criticidade: --

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

### Prioridade: -- | Criticidade: --

**Dado** que acesso a página inicial do ServeRest  
**E** clico em "Cadastre-se"  
**E** possuo dados válidos e únicos para um novo usuário  
**Quando** preencho os campos "nome", "email" e "senha"  
**E** marco a opção "Cadastrar como administrador"  
**E** clico em "Cadastrar"  
**Então** o cadastro deve ser realizado com sucesso  
**E** o usuário deve ser redirecionado para a home administrativa.

### Resultado esperado

O cadastro deve ser realizado com sucesso, deve ser exibida a mensagem "Cadastro realizado com sucesso" e o administrador deve ser redirecionado para a home administrativa.

---

## CT04 - Impedir cadastro de administrador com email já cadastrado

### Prioridade: -- | Criticidade: --

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

## CT05 - Cadastrar produto com sucesso

### Prioridade: -- | Criticidade: --

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

O produto 