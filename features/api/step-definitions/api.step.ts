import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from '../../../support/world';
import { expect } from "playwright/test";
import { checkDataUser, checkEmail, deleteUser, postUser, putUser, requestApi, statusApi, tryErrorLimit } from "../specs/api.spec";

Given('faça uma requisição GET para page=2', async function (this: CustomWorld) {
  await requestApi(this.page);
});

When('o status da resposta for 200 e a resposta deve conter uma lista de usuários', async function (this: CustomWorld) {
  await statusApi(this.page);
});

Then('o cada usuário deve conter os campos id, first_name, last_name e email e o email deve estar em um formato válido', async function (this: CustomWorld) {
  await checkDataUser(this.page);
  await checkEmail(this.page);
});

Then('a resposta deve retornar status 201 com os dados do usuário criados corretamente e o tempo de resposta deve ser aceitável', async function (this: CustomWorld) {
  await postUser(this.page);
});

Then('a resposta deve retornar status 201 o usuário deve ser atualizado corretamente e a resposta da API deve estar dentro de limites aceitáveis', async function (this: CustomWorld) {
  await putUser(this.page);
});

Then('faço envio uma requisição DELETE para o user inexistente a resposta deve retornar status 404 para usuário inexistente', async function (this: CustomWorld) {
  await deleteUser(this.page);
});

Then('faço envio uma requisição que excede o tempo limite o sistema deve retornar uma falha de rede ou timeout e lidar corretamente com o erro', async function (this: CustomWorld) {
  await tryErrorLimit(this.page);
});
