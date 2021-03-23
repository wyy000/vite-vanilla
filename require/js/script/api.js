define(['api'], function () {
  const createGroup = function (config) {
    $.ajax({
      url: '/create-group',
      type: config.type,
      data: config.data,
      success: config.success,
      error: config.error,
    })
  }

  const menuList = function (config) {
    $.ajax({
      url: '/menu-list',
      type: config.type,
      data: config.data,
      success: config.success,
      error: config.error,
    })
  }

  const tableData = function (config) {
    $.ajax({
      url: '/table-data',
      type: config.type,
      data: config.data,
      success: config.success,
      error: config.error,
    })
  }

  const treeData = function (config) {
    $.ajax({
      url: '/tree-data',
      type: config.type,
      data: config.data,
      success: config.success,
      error: config.error,
    })
  }

  const uploadFile = function (config) {
    $.ajax({
      url: '/upload-file',
      type: 'POST',
      dataType: 'JSON',
      processData: false,
      contentType: false,
      success: config.success,
      error: config.error,
    })
  }

  const userColumns = function (config) {
    $.ajax({
      url: '/user-columns',
      type: config.type,
      data: config.data,
      success: config.success,
      error: config.error,
    })
  }

  const userGroups = function (config) {
    $.ajax({
      url: '/user-groups',
      type: config.type,
      data: config.data,
      success: config.success,
      error: config.error,
    })
  }

  return {
    createGroup: createGroup,
    menuList: menuList,
    tableData: tableData,
    treeData,
    uploadFile: uploadFile,
    userGroups: userGroups,
    userColumns: userColumns,
  }
})
