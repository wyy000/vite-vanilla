require(['common'], function () {
  require(['jquery', 'api', 'datatables'], function ($, $http) {
    // $http.eventList({
    //   success: res => {
    //     console.log(res)
    //   },
    //   error: e => console.log(e),
    // })
    let table

    $('#tbody').on('click', 'tr', function (e) {
      const d = table.row( this ).data();
      d.groupShow = !d.groupShow
      table
        .row( this )
        .data( d )
        // .draw(false)
      console.log(table.row(this).data())
      // console.log(e.currentTarget)
      // const childId = $(e.currentTarget).attr('id')
      // $(e.currentTarget).siblings('.' + childId).each(function (el, i) {
      //   $(el).addClass('show')
      //   $(el).show()
      //   console.log(el, i, childId, 9999, $(el).css('display', ''))
      //
      // })
    })

    const left = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor">\n' +
      '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />\n' +
      '</svg>'
    const right = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor">\n' +
      '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />\n' +
      '</svg>'

    table = $('#table').DataTable({
      dom: '<"wrapper"t><"table_footer"ip>',
      ajax: {
        url: '/event-list',
        type: 'get',
        dataType: 'json',
        data: function (param) {
          delete param.columns
          let searchParams= {
            pageNumber : param.start === 0 ? 1 : (param.start/param.length + 1),
            pageSize : param.length,
          }
          // let params = {...d, ...searchParams}
          // if (searchParams) $.extend(d, searchParams)
          return {...param, ...searchParams}
        },
      },
      destroy: true,
      pageLength: 5,
      fixedHeader: true,
      autoWidth: false,
      processing: true,
      serverSide: true,
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
      columns: [
        {
          data: 'code',
          title: '事件ID',
          render: function (data, type, row, setting) {
            return '<div>' + data + '</div>'
          },
        },
        {
          data: 'name',
          title: '事件显示名称',
        },
        {
          data: 'remark',
          title: '事件说明',
        },
        {
          data: null,
          title: '操作',
          sorting: false,
          className: 'dt-head-left',
          render: function (data, type, row, setting) {
            const html = "<div class='row_btn_box'>\n" +
              "            <button class='row_btn download_btn' onclick='handleDownload(JSON.stringify(" + JSON.stringify(row) + "))'>\n" +
              "              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'>\n" +
              "                <path fill='none' d='M0 0h24v24H0z'/>\n" +
              "                <path fill='currentColor' d='M13 10h5l-6 6-6-6h5V3h2v7zm-9 9h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7z'/>\n" +
              "              </svg>\n" +
              "              <span>修改</span>\n" +
              "            </button>\n" +
              "            <button class='row_btn delete_btn' onclick='handleDelete(JSON.stringify(" + JSON.stringify(row) + "))'>\n" +
              "              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'>\n" +
              "                <path fill='none' d='M0 0h24v24H0z'/>\n" +
              "                <path fill='currentColor' d='M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z'/>\n" +
              "              </svg>\n" +
              "              <span>删除</span>\n" +
              "            </button>\n" +
              "          </div>"
            return html
          }
        }
      ],
      "drawCallback": function ( settings ) {
        var api = this.api();
        var rows = api.rows( {page:'current'} ).nodes();
        console.log('drawCallback', rows, api.data())

        api.data().each(function (it, idx) {
          if (it.attrList?.length) {
            console.log(it.groupShow, 66666)
            let html = ''
            it.attrList.forEach(function (item, aIdx) {
              html +=
                '<tr class="expend_group ' + String(it.id) + '" ' + it.groupShow ? '' : 'style="display: none;"' + '>' +
                '  <td class="sorting_1"><div>' + item.code + '</div></td>' +
                '  <td>' + item.name + '</td>' +
                '  <td>' + item.remark + '</td>' +
                '  <td class="dt-head-left">' +
                "   <div class='row_btn_box'>\n" +
                "     <button class='row_btn download_btn' onclick='handleDownload(JSON.stringify(" + JSON.stringify(item) + "))'>\n" +
                "       <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'>\n" +
                "         <path fill='none' d='M0 0h24v24H0z'/>\n" +
                "         <path fill='currentColor' d='M13 10h5l-6 6-6-6h5V3h2v7zm-9 9h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7z'/>\n" +
                "       </svg>\n" +
                "       <span>修改</span>\n" +
                "     </button>\n" +
                "     <button class='row_btn delete_btn' onclick='handleDelete(JSON.stringify(" + JSON.stringify(item) + "))'>\n" +
                "       <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'>\n" +
                "         <path fill='none' d='M0 0h24v24H0z'/>\n" +
                "         <path fill='currentColor' d='M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z'/>\n" +
                "       </svg>\n" +
                "       <span>删除</span>\n" +
                "     </button>\n" +
                "   </div>"+
                '  </td>' +
                '</tr>'
            })
            $(rows).eq(idx).data('child-id', it.id).after(html)
            // $(rows).eq(idx).data('id', it.id)
            // $(rows).eq(idx).attr('id', it.id)
            // console.log(it.id, $(rows).eq(idx))
          }
        })
      },
      "rowCallback" : function(nRow, aData, iDisplayIndex) {
        console.log('rowCallback', nRow, aData)
        /* 用来改写用户权限的 */
        // if (aData.ISADMIN == '1')
        //   $('td:eq(5)', nRow).html('管理员');
        // if (aData.ISADMIN == '2')
        //   $('td:eq(5)', nRow).html('资料下载');
        // if (aData.ISADMIN == '3')
        //   $('td:eq(5)', nRow).html('一般用户');
        // else
        //   $('td:eq(2)', nRow).html('一般用户');
        //
        // if (aData.id === 1466) {
        //   // $(nRow).css('display', 'none')
        //   console.log(1466)
        //   $(nRow).after('<tr><td colspan="5">'+1+'</td></tr>')
        // }
        // console.log(nRow)
        // $(nRow).data('child-id', aData.id)
        // $(nRow).attr('id', aData.id)
        return nRow;
      },
    })
  })
})
