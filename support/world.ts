// support/world.ts
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Page } from '@playwright/test'; 

export class CustomWorld extends World {
  page!: Page; 

  constructor(options: IWorldOptions) {
    
    super(options);
  }
}

setWorldConstructor(CustomWorld);