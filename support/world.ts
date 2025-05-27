// support/world.ts
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Page } from 'playwright';

export class CustomWorld extends World {
  page!: Page; // será inicializada nos hooks

  constructor(options: IWorldOptions) {
    
    super(options);
  }
}

setWorldConstructor(CustomWorld);