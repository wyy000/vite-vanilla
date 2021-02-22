require(['common'], function () {
  require(['api', 'tablesorter'], function ($http, _) {
    const cols = [
      {props: 'id', name: 'ID'},
      {props: 'age', name: 'Age'},
      {props: 'count', name: 'Count'},
      {props: 'time', name: 'Time'},
    ]

    let thead = ''
    for (let it of cols) {
      thead += `<th>${it.name}</th>`
    }
    $('#thead').html(`<tr>${thead}</tr>`)

    initTable()

    function initTable () {
      $http.tableData({
        success: function (res) {
          let tbody = ''
          for (let row of res.data) {
            for (let col of cols) {
              tbody += `<td>${row[col.props]}</td>`
            }
            tbody = `<tr>${tbody}</tr>`
          }

          const $tbody = $('#tbody')
          const $table = $('#table')

          $tbody.empty()
          $tbody.append(tbody)
          $table.trigger("updateCache")
          $table.trigger("update")
          $table.tablesorter()
        },
        error: function (err) {},
      })
    }
  })
})
