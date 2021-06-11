require(['common'], function () {
  require(['jquery', 'api', 'bootstrap', 'datatables', './require/js/lib/bootstrap-table-expandable.js'], function ($, $http) {
    console.log($)
    const left = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor">\n' +
      '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />\n' +
      '</svg>'
    const right = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor">\n' +
      '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />\n' +
      '</svg>'

    $('#table').DataTable({
      dom: '<"wrapper"t><"table_footer"ip>',
      pageLength: 5,
      fixedHeader: true,
      autoWidth: false,
      processing: true,
      // serverSide: true,
      paging: true,
      language: {
        lengthMenu: "每页显示 _MENU_记录",
        zeroRecords: "没有匹配的数据",
        info: "第_PAGE_页 共 _PAGES_页 ( 共\_TOTAL\_条记录 )",
        infoEmpty: "共\_TOTAL\_条记录",
        search: "查找",
        infoFiltered: "(从 _MAX_条记录中过滤)",
        paginate: { "first": "首页 ", "last": "末页", "next": right, "previous": left }
      },
    })
  })
})