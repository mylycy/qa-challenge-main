import { expect, Page } from '@playwright/test'
import { error } from 'console';

const baseUrl = 'https://reqres.in/api';

const headersDefault = {
  'Content-Type': 'application/json',
  'x-api-key': 'reqres-free-v1',
};

export async function requestApi(page: Page) {
  const response = await page.request.get(`${baseUrl}/users?page=2`,{
    headers: headersDefault,
  });
  const data = await response.json();
  console.log(data);
}

export async function statusApi(page: Page) {
  const response = await page.request.get(`${baseUrl}/users?page=2`,{
    headers: headersDefault,
  });
  expect(response.status()).toBe(200);
}

export async function checkDataUser(page: Page) {
  const response = await page.request.get(`${baseUrl}/users?page=2`,{
    headers: headersDefault,
  });
  expect(response.status()).toBe(200);

  const userBody = JSON.parse(await response.text());

  const allUsersIsValid = userBody.data.every((user: any) =>
    user.id &&
    user.first_name &&
    user.last_name &&
    user.avatar
  );
  
  expect(allUsersIsValid).toBe(true);
}

export async function checkEmail(page: Page) {
  const response = await page.request.get(`${baseUrl}/users?page=2`,{
    headers: headersDefault,
  });
  expect(response.status()).toBe(200);

  const userBody = JSON.parse(await response.text());

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const emailIsValid = userBody.data.every((user: any) =>
    user.email &&
    emailRegex.test(user.email)
  );

  expect(emailIsValid).toBe(true);
}

export async function postUser(page: Page) {
  const startTimeRequest = Date.now();
  const response = await page.request.post(`${baseUrl}/users`,{
    data: {
      "name": "morpheus_test",
      "job": "leader_test"
      },
    headers: headersDefault,
  });
  
  const endTimeRequest = Date.now();

  const postCreated = await response.json();
  console.log(postCreated);

  expect(response.status()).toBe(201);
  expect(postCreated.name).toBe('morpheus_test');
  expect(postCreated.job).toBe('leader_test');
  expect(startTimeRequest - endTimeRequest).toBeLessThan(1000);
}

export async function putUser(page: Page) {
  const startTimeRequest = Date.now();
  const response = await page.request.post(`${baseUrl}/users/2`,{
    data: {
      "name": "morpheus",
      "job": "zion resident"
      },
    headers: headersDefault,
  });
  
  const endTimeRequest = Date.now();

  const putUpdate = await response.json();
  console.log(putUpdate);

  expect(response.status()).toBe(201);
  expect(putUpdate.name).toBe('morpheus');
  expect(putUpdate.job).toBe('zion resident');
  expect(startTimeRequest - endTimeRequest).toBeLessThan(1000);
}

export async function deleteUser(page: Page) {
  const response = await page.request.delete(`${baseUrl}/users/9999`,{
    headers: headersDefault,
  });

  if (response.status() === 404) {
    throw new Error ('Error ao tentar deletar este user')
  };
  
  console.log(response.status());
}


export async function tryErrorLimit(page: Page) {
  try {
  await page.request.get(`${baseUrl}/users/9999`,{
    timeout: 1,
    headers: headersDefault,
  });

  throw new Error ('Error de limite de tempo');
  }
  catch(error: any){
    console.log(error.message)
    expect(error.message).toContain('Request timed out after 1ms')
  }
}