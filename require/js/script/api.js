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

  const dragData = function (config) {
    $.ajax({
      url: '/drag-data',
      type: 'GET',
      ...config,
    })
  }

  const mergeChunk = function (config) {
    $.ajax({
      // url: 'http://localhost:8080/merge',
      url: '/merge',
      type: 'POST',
      ...config,
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
      // url: 'http://localhost:8080/upload-file',
      url: '/upload-file',
      type: 'POST',
      dataType: 'JSON',
      data: config.data,
      processData: false,
      contentType: false,
      success: config.success,
      error: config.error,
      xhr: function() {
        var xhr = new XMLHttpRequest();
        //使用XMLHttpRequest.upload监听上传过程，注册progress事件，打印回调函数中的event事件
        /*xhr.upload.addEventListener('progress', function (e) {
          console.log(e, (e.loaded / e.total) * 100 + '%');
          //loaded代表上传了多少
          //total代表总数为多少
          var progressRate = (e.loaded / e.total) * 100 + '%';

          //通过设置进度条的宽度达到效果
          // $('.progress > div').css('width', progressRate);
        })*/
        xhr.upload.addEventListener('progress', config.progress)

        return xhr;
      }
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
    dragData,
    mergeChunk,
    menuList: menuList,
    tableData: tableData,
    treeData,
    uploadFile: uploadFile,
    userGroups: userGroups,
    userColumns: userColumns,
  }
})
