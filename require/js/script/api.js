define(['api'], function () {
  const menuList = function (config) {
    $.ajax({
      url: '/menu-list',
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
    uploadFile,
  }
})
