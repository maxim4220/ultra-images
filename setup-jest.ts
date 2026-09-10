import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

setupZonelessTestEnv();

Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true,
});
