@api
Feature: Listar usuários e validar dados da API

  Scenario: Listar usuários da página 2 e validar estrutura da resposta
    Given faça uma requisição GET para page=2
    When o status da resposta for 200 e a resposta deve conter uma lista de usuários
    Then o cada usuário deve conter os campos id, first_name, last_name e email e o email deve estar em um formato válido

  Scenario: Criar um novo usuário
    Then a resposta deve retornar status 201 com os dados do usuário criados corretamente e o tempo de resposta deve ser aceitável

  Scenario: Atualizar um usuário existente
    Then a resposta deve retornar status 201 o usuário deve ser atualizado corretamente e a resposta da API deve estar dentro de limites aceitáveis

  Scenario: Requisição DELETE para um usuário inexistente
    Then faço envio uma requisição DELETE para o user inexistente a resposta deve retornar status 404 para usuário inexistente

  Scenario: Simulação de falha de rede ou tempo limite na API
    Then faço envio uma requisição que excede o tempo limite o sistema deve retornar uma falha de rede ou timeout e lidar corretamente com o erro