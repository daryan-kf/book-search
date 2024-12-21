import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'], // Matches test files in the `tests` folder
  moduleFileExtensions: ['ts', 'js'],
  rootDir: './',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  moduleDirectories: ['node_modules', '<rootDir>/src'], // Ensures alias works properly
};
