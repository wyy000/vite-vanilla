require(['common'], function () {
  require(['jquery'],function($) {
    require(['api'], function ($http) {
      $http.menuList({
        success: function (res) {
          require(['layout'], function ({layout}) {
            layout($('#app'), res.data)
          })
        },
        error: function (err) {},
      })
    })
  })
})
