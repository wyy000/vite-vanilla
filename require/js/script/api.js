define(['api'], function () {
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
    menuList,
    tableData,
    uploadFile,
  }
})
