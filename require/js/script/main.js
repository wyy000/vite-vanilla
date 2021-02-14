require.config({
  paths:{
    "jquery":'../lib/jquery-3.5.1.min'
  }
})

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
