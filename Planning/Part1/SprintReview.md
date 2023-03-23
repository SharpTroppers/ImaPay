# Pontos a melhorar:

## Menu de Navegação

- Algumas classes não estão sendo utilizadas, como a classe "navegação" por exemplo

- Normalmente criamos um menu de navegação dentro de uma tag nav e não uma tag header, na qual pode-se usar a classe nav-container

- Existem flexboxs redundantes no login e tbm na na classe nav-container

- Nao entendi o motivo de usar aquele ".login::after"

- É preferível utilizar nomes de classes mais descritivos, uma dica é inves de utilizar o "nav-list-sorted" utilizar algo como "nav-options" e para cada elemento da lista usar "nav-option"

## Home Page

- É preferível utilizar nomes de classes mais descritivos, classes com o nome "paragraph" e "button" são muito genéricas, uma dica é criar um nome que diz do que se trata o elemento em si. invés de "button-account" é acho que seria uma boa em trocar para "signup-button"

## Tela de Login

- É melhor favorecer o uso de classes invés de utilizar ids- Não é necessário fazer todo aquele encadeamento para utilizar uma classe ou id, nao entendi bem pq foi feito isso

- Sugiro utilizar a mesma animação do botão de cadastro

- Pode-se fazer a validação dos campos, como por exemplo a senha possuir pelo menos 8 caracteres, um uppercase e um número

-  No futuro vamos precisar gerar um arquivo json ao submeter o formulário
Tela de cadastro

-  No futuro vamos precisar gerar um arquivo json ao submeter o formulário

## Tela de recuperação de senha

- Recomendo utilizar flexbox invés de fazer posicionamento absoluto

## Considerações Gerais

- Utilizar medidas relativas, como vh, vw, %, ou rem e em
