Feature: Criação de conta

Scenario: Criar nova conta
  Given que estou na home
  When eu crio uma conta com dados gerados
  Then a conta deve ser criada com sucesso
