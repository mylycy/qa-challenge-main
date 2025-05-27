// support/hooks.ts
import { Before, After, AfterStep, BeforeAll, ITestCaseHookParameter } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext } from 'playwright';
import { CustomWorld } from './world';
import { promises as fs } from 'fs';
import path from 'path';

// Variáveis globais para navegador e contexto
let browser: Browser;
let context: BrowserContext;

let originalConsoleLog: typeof console.log;
let logs: string[] = [];


BeforeAll(async function () {
  const dir = path.resolve('screenshots');
  await fs.rm(dir, { recursive: true, force: true }); // Apaga tudo
  await fs.mkdir(dir, { recursive: true }); // Cria de novo
});
// 👉 Rodar antes de cada cenário com @ui
Before({ tags: '@ui' }, async function (this: CustomWorld) {
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext();
  this.page = await context.newPage();
  await this.page.goto('https://www.saucedemo.com/');; // só se quiser já abrir
});

// 👉 Fechar o navegador apenas se foi aberto (só em testes @ui)
After({ tags: '@ui' }, async function () {
  await browser?.close();
});

AfterStep({ tags: '@ui' }, async function (this: CustomWorld, { pickle, result }) {
   if (!this.page) return;

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const featureName = pickle.name.replace(/\s+/g, '_');
  const fileName = `screenshots/${featureName}_${timestamp}.png`;

  const screenshot = await this.page.screenshot();
  await fs.writeFile(fileName, screenshot);
  this.attach(screenshot, 'image/png');
});

Before({ tags: '@api' }, async function (this: CustomWorld) {
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext();
  this.page = await context.newPage();

    logs = [];

  // Salva o console.log original
  originalConsoleLog = console.log;

  // Sobrescreve o console.log para capturar as mensagens
  console.log = (...args: any[]) => {
    const message = args.map(arg => {
      if (typeof arg === 'string') return arg;
      try {
        return JSON.stringify(arg, null, 2);
      } catch {
        return String(arg);
      }
    }).join(' ');

    logs.push(message);

    // Também imprime no console normalmente
    originalConsoleLog.apply(console, args);
  };
});
  //await this.page.goto('https://www.saucedemo.com/');; // só se quiser já abrir

// 👉 Fechar o navegador apenas se foi aberto (só em testes @ui)
After({ tags: '@api' }, async function () {
  await browser?.close();
});
AfterStep({ tags: '@api' }, async function (this: any, testCase: ITestCaseHookParameter){
console.log = originalConsoleLog;

  if (logs.length > 0) {
    // Junta todos os logs em uma string só e anexa no relatório
    await this.attach(logs.join('\n'), { mediaType: 'text/plain' });
  }
});