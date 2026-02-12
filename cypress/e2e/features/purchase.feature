Feature: Compra com 3 produtos

Scenario: Comprar 3 produtos
  Given que estou logado
  When adiciono 3 produtos ao carrinho
  And finalizo a compra
  Then a compra deve ser concluída com sucesso
