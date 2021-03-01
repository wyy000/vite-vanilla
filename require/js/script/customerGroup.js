require(['common'], function () {
  require(['jquery', 'api', 'datatables'], function ($, $http) {

    /* ========== list-page ==========*/

    let table

    $('#search').on('input', function () {
      table.search(this.value).draw()
    })

    $('#createBtn').on('click', function () {
      initCreate()
      $('#create').css('width', '900px')
      const $mask = $('<div class="drawer_mask" id="drawerMask"></div>')
      $('#customerGroup').append($mask)
      const timer = setTimeout(function () {
        clearTimeout(timer)
        $mask.css('opacity', '.3')
      })
    })

    getColumnAjax()

    /* ========== form-page ==========*/

    const validator = {
      name: {require: {info: '分群显示名不能为空'}},
      nameId: {require: {info: '分群名称不能为空'}, validate: {regexp: /^[a-zA-Z][0-9a-zA-Z_]*$/, info: '以字母开头, 可包含数字和下划线'}, target: '#errorTarget'},
    }
    const $form = $('#formBox')

    $('#cancelBtn').on('click', function () {
      closeDrawer()
    })

    $('#closeBtn').on('click', function () {
      closeDrawer()
    })

    $form.on('input', 'input', function (e) {
      $(e.target).attr('name') === 'file' && uploadAjax(getData())
    })

    $form.on('focus', 'input', function (e) {
      if ($(e.target).data('validate')) {
        const timer = setTimeout(function () {
          clearTimeout(timer)
          $form.on('input', 'input', changeValidate)
        })
      }
    })

    $form.on('blur', 'input', function (e) {
      if ($(e.target).data('validate')) {
        $form.off('input', 'input', changeValidate)
      }
    })

    $('#clearFileBtn').on('click', function () {
      setFileName()
    })

    $('#confirmBtn').on('click', function () {
      let res = true
      $form.find('input').each(function () {
        if ($(this).data('validate') && !validate($(this))) res = false
      })
      res && confirmAjax()
    })

    /* ========== fn ==========*/

    function changeValidate (e) {
      validate($(e.target))
    }

    function closeDrawer () {
      getColumnAjax()
      $('#create').css('width', '0')
      $('#drawerMask').css('opacity', 0)
      const timer = setTimeout(function () {
        clearTimeout(timer)
        $('#drawerMask').remove()
      }, 400)
    }

    function confirmAjax () {
      const params = serialize()
      $http.createGroup({
        method: 'post',
        data: params,
        success: function (res) {
          if (res.code === 0) closeDrawer()
        },
        error: function (err) {},
      })
    }

    function getColumnAjax () {
      $http.userColumns({
        success: function (res) {
          let thead = ''
          for (let col of res.data) {
            thead += `<th ${name === '操作' ? 'disabled' : ''}>${col.name}</th>`
          }
          $('#thead').html(`<tr>${thead}</tr>`)

          getListAjax(res.data)
        },
        error: function (err) {},
      })
    }

    function getData () {
      const file = $('#uploadInput')[0].files[0]
      if (!file) return
      let data = new FormData()
      data.append('file_content', file)
      data.append('filename', file.name)
      return data
    }

    function getListAjax (cols) {
      /* Results in:
          { table }
          { info }
          { paging }
      */
      const columns = cols.map(it => {
        it.className = 'dt-head-left'
        switch (it.data) {
          case 'cname':
            it.render = function (data, type, row) {
              const html = "\n" +
                "        <div class='cell_cname'>\n" +
                "          <div class='cell_data_cname'>" + row.cname + "</div>\n" +
                "          <span class='cell_data_name'>" + row.name + "</span>\n" +
                "        </div>"
              return html
            }
          default:
        }
        return it
      })

      const left = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor">\n' +
        '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />\n' +
        '</svg>'
      const right = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor">\n' +
        '  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />\n' +
        '</svg>'

      table = $('#table').DataTable({
        dom: '<"wrapper"t><"table_footer"ip>',
        ajax: "/user-groups",
        destroy: true,
        pageLength: 10,
        fixedHeader: true,
        autoWidth: false,
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
          ...columns,
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
                "              <span>下载</span>\n" +
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
      })
    }

    function initCreate () {
      $form.find('input').each(function () {
        $(this).val('')
        $(this).data('validate') && validate($(this), true)
      })
      $('#remark').val('')
      setFileName()
    }

    function serialize () {
      const $textarea = $('#remark')
      let params = {}
      $form.find('input').each(function () {
        if ($(this).attr('name') && !$(this).attr('disabled')) {
          params[$(this).attr('name')] = $(this).attr('name') === 'nameId' ? ($('#prefixName').text() + $(this).val()) : $(this).val()
        }
      })
      params[$textarea.attr('name')] = $textarea.val()
      return params
    }

    function setFileName (name) {
      if (!name) {
        $('#fileName input').val('')
        $('#fileName span').text('')
        $('#fileInput input').attr('disabled', false)
        $('#fileInput').show()
        $('#fileName').hide()
      } else {
        $('#fileName input').val(name)
        $('#fileName span').text(name)
        $('#fileName').show()
        $('#fileInput').hide()
        $('#fileInput input').val('').attr('disabled', true)
      }
    }

    function uploadAjax (data) {
      $http.uploadFile({
        data: data,
        type: 'POST',
        dataType: 'JSON',
        processData: false,
        contentType: false,
        success: function (res) {
          setFileName(res.fileName)
        },
        error: function (err) {},
      })
    }

    function validate ($el, reset) {
      let res = true
      let message = ''
      let target = validator[$el.data('validate')].target
      let $target = target ? $(target) : $el
      let $errDom = $target.next()
      let require = validator[$el.data('validate')].require
      let validate = validator[$el.data('validate')].validate

      if (!reset) {
        if (require && $el.val() === '') {
          message = require.info
          res = false
        } else if (validate && !validate.regexp.test($el.val())) {
          message = validate.info
          res = false
        }
      }

      if (!res) {
        !$el.hasClass('has_error') && $el.addClass('has_error')
        !$errDom.length && $target.after('<div class="validate_warn"><span>' + message + '</span></div>')
        $errDom = $target.next()
        const $errText = $($errDom.find('span')[0])
        $errText.text() !== message && $errText.text(message)

        setTimeout(function () {
          $errDom.css('transition', 'height .1s linear, opacity .1s linear .1s').css('opacity', 1).css('height', '20px')
          $errText.css('transition', 'top .1s cubic-bezier(.215,.61,.355,1) .1s').css('top', 0).css('color', '#fc6772')
        })
      } else {
        $el.hasClass('has_error') && $el.removeClass('has_error')
        if ($errDom.length) {
          $($errDom.find('span')[0]).css('transition', 'top .2s cubic-bezier(.215,.61,.355,1)').css('top', '-100%').css('color', '#8492a6')
          $errDom.css('transition', 'height .2s linear .1s, opacity .2s linear').css('opacity', 0).css('height', 0)

          setTimeout(function () {
            !$el.hasClass('has_error') && $errDom.remove()
          }, 300)
        }
      }

      return res
    }
  })
})
