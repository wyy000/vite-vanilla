require(['common'], function () {
  require(['jquery', 'api'], function ($, $http) {

    /* ========== list-page ==========*/

    $('#createBtn').on('click', function () {
      $('#create').css('width', '900px')
    })

    /* ========== create-page ==========*/

    const validator = {
      name: {require: {info: '分群显示名不能为空'}},
      nameId: {require: {info: '分群名称不能为空'}, validate: {regexp: /^[a-zA-Z][0-9a-zA-Z_]*$/, info: '以字母开头, 可包含数字和下划线'},},
    }

    $('#closeBtn').on('click', function () {
      $('#create').css('width', '0')
    })

    $('#uploadInput').on('input', function () {
      uploadAjax(getData())
    })

    $('#formBox').on('input porpertychange', 'input', function (e) {
      $(e.target).data('validate') && validate($(e.target))
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

    /* ========== fn ==========*/

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
      let res = true
      let message = ''
      let $errDom = $el.next()
      let require = validator[$el.data('validate')].require
      let validate = validator[$el.data('validate')].validate

      if (require && $el.val() === '') {
        message = require.info
        res = false
      } else if (validate && !validate.regexp.test($el.val())) {
        message = validate.info
        res = false
      }

      if (!res) {
        !$el.hasClass('has_error') && $el.addClass('has_error')
        !$errDom.length ? $el.after('<div class="validate_warn">' + message + '</div>') : $errDom.text() !== message ? $errDom.text(message) : ''
      } else {
        $el.hasClass('has_error') && $el.removeClass('has_error')
        $errDom.length ? $errDom.remove() : ''
      }

      return res
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
