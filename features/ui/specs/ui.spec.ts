import { expect, Page } from '@playwright/test'

export async function checkLoginPage(page: Page) {
    const isLogoVisible = await page.getByText('Swag Labs').isVisible();
    const isFormVisible = await page.locator('#login_button_container').isVisible();
    return isLogoVisible && isFormVisible;
}

export async function login(page: Page) {
    await page.fill('input[name="user-name"]', 'standard_user');
    await page.fill('input[name="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
}

export async function isLoggedIn(page: Page) {
    const isLogoLoggedIn = await page.getByText('Swag Labs').isVisible();
    return isLogoLoggedIn
}

export async function invalidLogin(page: Page) {
    await page.fill('input[name="user-name"]', 'invalid_user');
    await page.fill('input[name="password"]', 'invalid_password');
    await page.click('[data-test="login-button"]');
}

export async function errorMessageLogin(page: Page) {
    await page.locator('[data-test="error"]').isVisible();
}

export async function addOneItem(page: Page) {
    await page.click('[name=add-to-cart-sauce-labs-backpack]');
}

export async function addTwoItem(page: Page) {
    await page.click('[name=add-to-cart-sauce-labs-bike-light]');
}

export async function addThreeItem(page: Page) {
    await page.click('[name=add-to-cart-sauce-labs-bolt-t-shirt]');
}

export async function removeOneItem(page: Page) {
    await page.click('[data-test="remove-sauce-labs-backpack"]');
}

export async function removeTwoItem(page: Page) {
    await page.click('[data-test="remove-sauce-labs-bike-light"]');
}

export async function removeThreeItem(page: Page) {
    await page.click('[data-test="remove-sauce-labs-bolt-t-shirt"]');
}

export async function addOneItemAndCheckCart(page: Page) {
    const beforeAdd = await page.locator('#shopping_cart_container').textContent();
    expect(beforeAdd).toBe('');
    await addOneItem(page);
    const afterAdd = await page.locator('#shopping_cart_container').textContent();
    expect(afterAdd).toBe("1");
}

export async function removeOneItemAndCheckCart(page: Page) {
    const beforeAdd = await page.locator('.shopping_cart_container').textContent();
    expect(beforeAdd).toBe("1");
    await removeOneItem(page);
    const afterAdd = await page.locator('.shopping_cart_container').textContent();
    expect(afterAdd).toBe('');
}

export async function checkCartItem3(page: Page) {
    const addThree = await page.locator('#shopping_cart_container').textContent();
    expect(addThree).toBe("3");
}

export async function checkCartItem1(page: Page) {
    const removeTwo = await page.locator('#shopping_cart_container').textContent();
    expect(removeTwo).toBe("1");
}

export async function checkCart(page: Page) {
    const itemCheck = await page.locator('[data-test="item-4-title-link"]').textContent();
    expect(itemCheck).toContain("Sauce Labs Backpack");    
    await page.locator('#cart_contents_container').isVisible();
}

export async function clickCheckout(page: Page) {
    await page.click('#checkout');
}

export async function fillInformations(page: Page) {
    await page.fill('input[name="firstName"]', 'Good');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="postalCode"]', '897548');
}

export async function clickContinue(page: Page) {
    await page.click('#continue');
}

export async function checkMessageErrorCheckout(page: Page) {
    await page.locator('[data-test="error"]').isVisible();
}

export async function checkInvoice(page: Page) {
    await page.locator('data-test="payment-info-label"').isVisible();
    await page.locator('data-test="shipping-info-label"').isVisible();
    await page.locator('data-test="total-info-label"').isVisible();
}

export async function clickFinish(page: Page) {
    await page.click('#finish');
}

export async function checkSu(page: Page) {
    await page.getByText('[data-test="pony-express"]').isVisible();
}

export async function clickCart(page: Page) {
    await page.click('[data-test="shopping-cart-link"]');
}
