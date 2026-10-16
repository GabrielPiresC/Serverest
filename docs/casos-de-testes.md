# Cenários de teste:

## CT01 - Cadastro normal:

### Prioridade: -- Criticidade: --

Dado que acesso a página inicial e clico em "Cadastre-se" E
preencho os campos "nome", "email" e "senha" E clico em "Cadastrar"
Então cadastro deve ser criado com sucesso e redirecionado para a 
página de itens

### Resultado esperado:

O cadastro deve ser realizado com sucesso e o usuário redirecionado para a página de itens.


## CT02 - Cadastrar com Login já cadastrado:

### Prioridade: -- Criticidade: --

Dado que acesso a página inicial e clico em "Cadastre-se" E
preencho os campos "nome", "email" e "senha" com os mesmos dados
do CT 01 E clico em "Cadastrar" deve aparecer a mensagem
"Este email já está sendo usado"

### Resultado esperado:

O cadastro deve falhar, exibir a mensagem "Este email já está sendo usado" e permanecer na mesma página.


## CT03 - Cadastro Adiministrador:

### Prioridade: -- Criticidade: --

Dado que acesso a página inicial e clico em "Cadastre-se" E
preencho os campos "nome", "email" e "senha" E clico em no checkbox "Cadastrar como administrador" E
Clico em "Cadastrar" Então cadastro deve ser criado com sucesso e redirecionado para a 
home de administrador.

### Resultado esperado:

O cadastro deve ser realizado com sucesso e o usuário redirecionado para a página home de administrador.


## CT04 - Cadastrar com Login já cadastrado:

### Prioridade: -- Criticidade: --

Dado que acesso a página inicial e clico em "Cadastre-se" E
preencho os campos "nome", "email" e "senha" com os mesmos dados
do CT03 E clico em "Cadastrar" deve aparecer a mensagem
"Este email já está sendo usado"

### Resultado esperado:

O cadastro deve falhar, exibir a mensagem "Este email já está sendo usado" e permanecer na mesma página.


## CT05 - Cadastrar produto:

### Prioridade: -- Criticidade: --

Dado que estour no endpoint /cadastrarprodutos E
preencho os campos "nome", "preço", "descrição", "quantidade" e "imagem" E
clico em "Cadastrar" 

### Resultado esperado:

O cadastro deve falhar, exibir a mensagem "Este email já está sendo usado" e permanecer na mesma página.