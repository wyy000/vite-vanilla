require(['common'], function () {
  require(['jquery', 'api'], function ($, $http) {

    init()

    $('#createBtn').on('click', function () {
      showCreate()
    })

    $('#closeBtn').on('click', function () {
      showList()
    })

    $('#uploadInput').on('input', function () {
      upload(getData())
    })

    function getData () {
      const file = $('#uploadInput')[0].files[0]
      if (!file) return
      let data = new FormData()
      data.append('file_content', file)
      data.append('filename', file.name)
      return data
    }

    function upload (data) {
      $http.uploadFile({
        data,
        type: 'POST',
        dataType: 'JSON',
        processData: false,
        contentType: false,
        success: function (res) {},
        error: function (err) {},
      })
    }

    function init () {
      showList()
    }

    function showList () {
      $('#list').show()
      $('#create').hide()
    }
    function showCreate () {
      $('#list').hide()
      $('#create').show()
    }
  })
})
