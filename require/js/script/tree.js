require(['common'], function () {
  require(['jquery', 'api', '../lib/treeView'],function($, $http) {

    $http.treeData({
      url: '/tree-data',
      success: function (data) {
        $('#tree').initTree({data: data.data})
      },
      error: function () {},
    })

    $('#confirmBtn').on('click', function () {
      console.log($('#tree').getSelected())
    })
  })
})
