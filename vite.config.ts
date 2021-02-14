import { viteMockServe } from 'vite-plugin-mock';

import { UserConfigExport, ConfigEnv } from 'vite';

export default ({ command }: ConfigEnv): UserConfigExport => {
  // According to the project configuration. Can be configured in the .env file
  let prodMock = true;
  return {
    plugins: [
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve' && prodMock,
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      }),
    ],
  }
}
