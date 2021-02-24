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

  return {
    createGroup: createGroup,
    menuList: menuList,
    tableData: tableData,
    uploadFile: uploadFile,
  }
})
