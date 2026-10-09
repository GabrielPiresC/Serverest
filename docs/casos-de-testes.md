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