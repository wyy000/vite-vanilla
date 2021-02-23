require(['common'], function () {
  require(['jquery', 'api'], function ($, $http) {

    /* ========== list-page ==========*/

    $('#createBtn').on('click', function () {
      showDom('#create', '#list')
    })

    /* ========== create-page ==========*/

    const validator = {
      name: {require: {info: '分群显示名不能为空'}},
      nameId: {require: {info: '分群名称不能为空'}, validate: {regexp: /^[a-zA-Z][0-9a-zA-Z_]*$/, info: '以字母开头, 可包含数字和下划线'},},
    }

    $('#closeBtn').on('click', function () {
      showDom('#list', '#create')
    })

    $('#uploadInput').on('input', function () {
      uploadAjax(getData())
    })

    $('#formBox').on('click', 'input', function (e) {
      console.log(e)
    })

    $('#clearFileBtn').on('click', function () {
      setFileName()
    })

    $('#confirmBtn').on('click', function () {
      let res = true
      $('#formBox').find('input').each(function () {
        if ($(this).data('validate') && !validate($(this))) res = false
      })
      res && confirmAjax()
    })

    init()

    /* ========== fn ==========*/

    function init () {
      showDom('#list', '#create')
    }

    function getData () {
      const file = $('#uploadInput')[0].files[0]
      if (!file) return
      let data = new FormData()
      data.append('file_content', file)
      data.append('filename', file.name)
      return data
    }

    function uploadAjax (data) {
      $http.uploadFile({
        data,
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

    function confirmAjax () {
      const params = serialize()
      $http.createGroup({
        method: 'post',
        data: params,
        success: function (res) {

        },
        error: function (err) {},
      })
    }

    function serialize () {
      const $form = $('#formBox')
      const $textarea = $('#remark')
      let params = {}
      $form.find('input').each(function () {
        if ($(this).attr('name') && !$(this).attr('disabled')) {
          params[$(this).attr('name')] = $(this).val()
        }
      })
      params[$textarea.attr('name')] = $textarea.val()
      return params
    }

    function validate ($el) {
      if (validator[$el.data('validate')].require && $el.val() === '') {
        !$el.next().length && $el.after('<div class="validate_warn">' + validator[$el.data('validate')].require.info + '</div>')
        $el.addClass('has_error')
        return false
      }
      return !validator[$el.data('validate')].validate || validator[$el.data('validate')].validate.regexp.test($el.val())
    }

    function setFileName (name) {
      if (!name) {
        $('#fileName input').val('')
        $('#fileName span').text('')
        $('#fileInput input').attr('disabled', 'false')
        showDom('#fileInput', '#fileName')
      } else {
        $('#fileName input').val(name)
        $('#fileName span').text(name)
        showDom('#fileName', '#fileInput')
        $('#fileInput input').val('').attr('disabled', 'true')
      }
    }

    function showDom (show, hide) {
      $(show).show()
      $(hide).hide()
    }
  })
})
