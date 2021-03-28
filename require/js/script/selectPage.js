require(['common'], function () {
  require(['api'], function ($http) {

    $http.userGroups({
      data: {
        pageSize: 999,
        pageNumber: 1,
      },
      success: function (res) {
        let html = ''
        res.data.forEach(it => {
          html += `<option value="${it.name}">${it.cname}</option>`
        })
        $('#id_select').html(html)
        $('#id_select').selectpicker({noneSelectedText : '请选择'})

        console.log(res.data)
      },
      error: function () {},
    })
  })
})
