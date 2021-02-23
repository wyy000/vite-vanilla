define(['api'], function () {
  const createGroup = function (config) {
    $.ajax({
      url: '/create-group',
      ...config,
    })
  }

  const menuList = function (config) {
    $.ajax({
      url: '/menu-list',
      ...config,
    })
  }

  const tableData = function (config) {
    $.ajax({
      url: '/table-data',
      ...config,
    })
  }

  const uploadFile = function (config) {
    $.ajax({
      url: '/upload-file',
      ...config,
    })
  }

  return {
    createGroup,
    menuList,
    tableData,
    uploadFile,
  }
})
