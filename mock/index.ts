import { MockMethod } from 'vite-plugin-mock'

import {menuList, tableData, userColumns, userGroups} from '../mongo'

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
    url: '/user-columns',
    method: 'get',
    response: () => ({
      code: 0,
      data: userColumns,
    }),
  },
  {
    url: '/user-groups',
    method: 'get',
    response: () => ({
      code: 0,
      data: userGroups,
    }),
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
