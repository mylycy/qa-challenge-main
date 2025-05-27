@ui
Feature: Principais funcionalidades do website

Scenario: Login com credenciais corretas
    Given que o usuário está na página de login
    When o usuário faz login com credenciais válidas
    Then o usuário deve ser autenticado e redirecionado para a página principal

  Scenario: Login com credenciais incorretas
    Given que o usuário está na página de login
    When o usuário faz login com credenciais inválidas
    Then deve ser exibida uma mensagem de erro

  Scenario: Atualização do contador do carrinho
    Given o usuário faz login com credenciais válidas
    When o usuário adiciona um produto ao carrinho, o contador deve ser atualizado para "1"
    Then o usuário remove um produto do carrinho, o contador deve ser atualizado para "0"

  Scenario: Adicionar e remover produtos do carrinho
    Given o usuário faz login com credenciais válidas
    When o usuário adiciona 3 produtos ao carrinho E remove 2 produtos do carrinho
    Then o carrinho deve conter os produtos corretos

  Scenario: Tentar finalizar compra sem preencher dados obrigatórios
    Given o usuário faz login com credenciais válidas
    When contém pelo menos 1 produto no carrinho e o usuário tenta finalizar a compra sem preencher o nome e endereço
    Then uma mensagem de erro deve ser exibida e o sistema deve impedir a finalização da compra

  Scenario: Finalizar a compra
    Given o usuário faz login com credenciais válidas
    When contém pelo menos 1 produto no carrinho e o usuário finaliza a compra preenchendo o nome e endereço
    Then um recibo deve ser imprimido na tela comfirmando a compra do usuário