import { MockMethod } from 'vite-plugin-mock'

import {menuList} from '../mongo'

export default [
  {
    url: '/menu-list',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 0,
        data: menuList,
      };
    },
  },
] as MockMethod[]
