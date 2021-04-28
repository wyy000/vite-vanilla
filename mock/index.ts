import { MockMethod } from 'vite-plugin-mock'

import {d3CurvesData, d3Data, menuList, tableData, treeData, userColumns, userGroups} from '../mongo'

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
    url: '/d3-curves-data',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: d3CurvesData,
      }
    },
  },
  {
    url: '/d3-data',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: d3Data,
      }
    },
  },
  {
    url: '/merge',
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
    // method: 'post',
    response: ({query, body}) => {
      let res = []

      for (let i = 0; i < userGroups.length; i++) {
        if (!query['search[value]']) {
          res.push(userGroups[i])
        } else {
          for (let j = 0; j < userColumns.length; j++) {
            if (String(userGroups[i][userColumns[j]['data']]).indexOf(query['search[value]']) >= 0) {
              res.push(userGroups[i])
              break
            }
          }
        }
      }

      if (query['order[0][dir]']) {
        res.sort((a, b) => {
          let col = userColumns[query['order[0][column]']].data
          // return query['order[0][dir]'] === 'desc' ? -(a[col] - b[col]) : (a[col] - b[col])
          return query['order[0][dir]'] === 'desc' ? a[col].localeCompare(b[col],'zh-CN') : b[col].localeCompare(a[col],'zh-CN')
        })
      }

      return ({
        code: 0,
        data: res.slice((query.pageNumber - 1) * query.pageSize, query.pageNumber * query.pageSize),
        recordsTotal: userGroups.length,
        recordsFiltered: res.length,
      })
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
  {
    url: '/tree-data',
    method: 'get',
    response: ({}) => {
      return {
        code: 0,
        data: treeData,
      }
    },
  },
] as MockMethod[]
