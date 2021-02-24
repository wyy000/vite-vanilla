import { MockMethod } from 'vite-plugin-mock'

import {menuList, tableData} from '../mongo'

export default [
  {
    url: '/create-group',
    method: 'post',
    response: ({ query }) => {
      return {
        code: 0,
      }
    },
  },
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
        fileName: 'demo.txt',
      }
    },
  },
  {
    url: '/table-data',
    method: 'get',
    response: ({ query , body}) => {
      return {
        code: 0,
        data: tableData,
      }
    },
  },
] as MockMethod[]
