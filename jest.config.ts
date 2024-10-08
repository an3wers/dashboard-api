import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	verbose: true,
	preset: 'ts-jest',
	modulePathIgnorePatterns: ['dist'],
};

export default config;
