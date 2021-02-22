require(['common'], function () {
  require(['jquery'], function ($) {

    init()

    $('#createBtn').on('click', function () {
      showCreate()
    })

    $('#closeBtn').on('click', function () {
      showList()
    })

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
