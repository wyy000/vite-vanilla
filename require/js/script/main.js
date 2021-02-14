require.config({
  paths:{
    "jquery":'../lib/jquery-3.5.1.min'
  }
})

require(['jquery'],function($) {
  require(['layout'], function ({layout}) {
    layout($('#app'))
  })
})
