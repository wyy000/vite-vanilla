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
      }
    },
  },
  {
    url: '/upload-file',
    method: 'post',
    response: ({ query , body}) => {
      return {
        code: 0,
      }
    },
  },
] as MockMethod[]
