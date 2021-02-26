require(['common'], function () {
  require(['api'], function ($http) {

    /* ========== list-page ==========*/

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

    // initList()

    /* Results in:
        <div class="wrapper">
          { table }
          { info }
          { length }
          { paging }
        </div>
    */
    var table = $('#table').DataTable({
      "dom": '<"wrapper"tip>',
      "ajax": "/user-groups",
      "columns": [
        {"data": "cname"},
        {"data": "id"},
        {"data": "user_count"},
        {"data": "create_time"},
        {"data": "user_name"},
        {"data": "operation"}
      ]
    })

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
      initList()
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

    function getData () {
      const file = $('#uploadInput')[0].files[0]
      if (!file) return
      let data = new FormData()
      data.append('file_content', file)
      data.append('filename', file.name)
      return data
    }

    function getListData (cols) {
      $http.userGroups({
        success: function (res) {
          let tbody = ''
          let tr = ''
          for (let row of res.data) {
            for (let col of cols) {
              tr += `<td>${row[col.props]}</td>`
            }
            tbody += `<tr>${tr}</tr>`
            tr = ''
          }

          const $tbody = $('#tbody')
          const $table = $('#table')

          $tbody.empty()
          $tbody.append(tbody)
          // $table.trigger("updateCache")
          // $table.trigger("update")
          // $table.tablesorter({theme: 'blue'})
        },
        error: function (err) {},
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

    function initList () {
      $http.userColumns({
        success: function (res) {
          let thead = ''
          for (let col of res.data) {
            thead += `<th ${name === '操作' ? 'disabled' : ''}>${col.name}</th>`
          }
          $('#thead').html(`<tr>${thead}</tr>`)

          getListData(res.data)
        },
        error: function (err) {},
      })
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
