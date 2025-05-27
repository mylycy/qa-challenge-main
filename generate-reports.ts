import { generate } from 'multiple-cucumber-html-reporter';
import path from 'path';

generate({
  jsonDir: path.resolve('./reports'),   // pasta onde estão os JSONs
  reportPath: path.resolve('./reports/html-report'), // pasta do relatório HTML
  openReportInBrowser: false,
  screenshotsDirectory: path.resolve('./screenshots'),  // pasta dos screenshots
  metadata: {
    browser: {
      name: 'chromium',
      version: 'latest'
    },
    device: 'Local test machine',
    platform: {
      name: process.platform,
      version: process.version
    }
  },
  customData: {
    title: 'QA Automation Report',
    data: [
      { label: 'Projeto', value: 'QA Automation - Challenge' },
      { label: 'Ambiente', value: 'Test' },
      { label: 'Executado em', value: new Date().toLocaleString() },
      { label: 'Autor', value: 'Mylycy' },
    ]
  }
});