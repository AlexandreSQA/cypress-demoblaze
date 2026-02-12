Feature: Remoção de item do carrinho

Scenario: Remover monitor do carrinho
  Given que estou logado
  And adiciono o produto "ASUS Full HD" ao carrinho
  When removo o produto "ASUS Full HD" do carrinho
  Then o carrinho deve estar vazio
