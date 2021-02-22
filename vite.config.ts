import { viteMockServe } from 'vite-plugin-mock';
   // const {resolve} = require('path')

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

    // build: {
    //   rollupOptions: {
    //     input: {
    //       index: resolve(__dirname, 'index.html'),
    //       chart: resolve(__dirname, 'chart.html'),
    //     }
    //   }
    // }
  }
}
