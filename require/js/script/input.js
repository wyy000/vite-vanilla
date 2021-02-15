require(['common'], function () {
  require(['jquery'],function($) {

    $('#btn_upload').on('click', function () {
      upload(getData())
    })

    function getData () {
      const file = $('#file_upload')[0].files[0]
      if (!file) return
      let data = new FormData()
      data.append('file', file, file.name)
      return data
    }

    function upload (data) {
      require(['api'], function ($http) {
        $http.uploadFile({
          data,
          type: 'POST',
          dataType: 'JSON',
          processData: false,
          contentType: false,
          success: function (res) {},
          error: function (err) {},
        })
      })
    }
  })
})
