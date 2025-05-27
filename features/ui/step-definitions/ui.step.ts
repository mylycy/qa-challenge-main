import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from '../../../support/world';
import { addOneItem, addOneItemAndCheckCart, addThreeItem, addTwoItem, checkCart, checkCartItem1, checkCartItem3, checkInvoice, checkLoginPage, checkMessageErrorCheckout, checkSu, clickCart, clickCheckout, clickContinue, errorMessageLogin, fillInformations, invalidLogin, isLoggedIn, login, removeOneItemAndCheckCart, removeThreeItem, removeTwoItem } from "../specs/ui.spec";
import { expect } from "playwright/test";

Given('que o usuário está na página de login', async function (this: CustomWorld) {
  const onLoginPage = await checkLoginPage(this.page);
  expect(onLoginPage).toBe(true);
});

When('o usuário faz login com credenciais válidas', async function (this: CustomWorld) {
    await login(this.page);
});

Then('o usuário deve ser autenticado e redirecionado para a página principal', async function (this: CustomWorld) {
    await isLoggedIn(this.page);
});

When('o usuário faz login com credenciais inválidas', async function (this: CustomWorld) {
    await invalidLogin(this.page);
});

Then('deve ser exibida uma mensagem de erro', async function (this: CustomWorld) {
    await errorMessageLogin(this.page);
});

When('o usuário adiciona um produto ao carrinho, o contador deve ser atualizado para "1"', async function (this: CustomWorld) {
    await addOneItemAndCheckCart(this.page);
});

Then('o usuário remove um produto do carrinho, o contador deve ser atualizado para "0"', async function (this: CustomWorld) {
    await removeOneItemAndCheckCart(this.page);
});

When('o usuário adiciona 3 produtos ao carrinho E remove 2 produtos do carrinho', async function (this: CustomWorld) {
    await addOneItem(this.page);
    await addTwoItem(this.page);
    await addThreeItem(this.page);
    await checkCartItem3(this.page);

    await removeThreeItem(this.page);
    await removeTwoItem(this.page);
    await checkCartItem1(this.page);
});

Then('o carrinho deve conter os produtos corretos', async function (this: CustomWorld) {
    await checkCartItem1(this.page);
    await checkCart(this.page);
});

When('contém pelo menos 1 produto no carrinho e o usuário tenta finalizar a compra sem preencher o nome e endereço', async function (this: CustomWorld) {
    await addOneItem(this.page);
    await clickCart(this.page);
    await checkCartItem1(this.page);
    await clickCheckout(this.page);
    await clickContinue(this.page);
});

Then('uma mensagem de erro deve ser exibida e o sistema deve impedir a finalização da compra', async function (this: CustomWorld) {
    await checkMessageErrorCheckout(this.page);
});


When('contém pelo menos 1 produto no carrinho e o usuário finaliza a compra preenchendo o nome e endereço', async function (this: CustomWorld) {
    await addOneItem(this.page);
    await clickCart(this.page);
    await checkCartItem1(this.page);
    await clickCheckout(this.page);
    await fillInformations(this.page);
    await clickContinue(this.page);
});

Then('um recibo deve ser imprimido na tela comfirmando a compra do usuário', async function (this: CustomWorld) {
    await checkInvoice(this.page);
    await checkSu(this.page);
});

