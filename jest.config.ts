import { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { tsconfig: 'tsconfig.json' }], // Move ts-jest config here
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // Map `src/*` to the correct path
  },
  testEnvironment: 'node',
};

export default config;