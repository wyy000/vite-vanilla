!function ($) {
  'use strict';

  $.fn.extend({
    initSearchRadio: initSearchRadio,
  })

  function initSearchRadio (data, options = {}) {
    if (!$('.model_layer').length) {
      $('body').append('<div class="model_layer"></div>')
    }

    $(this).data('show', false)

    return {
      $el: $(this),
      close: $el => close($el, options),
      show: ($el, data, options) => show($el, data, options),
    }
  }

  function initList (data) {
    let str = ''
    data.forEach(it => {
      str += '<span class="radio_item" data-value="' + it.value + '" data-token="' + (it.dataToken ? it.dataToken : '') + '">' + it.text + '</span>'
    })
    const html = '<div class="radio_box">\n' +
      '  <div class="radio_search">\n' +
      '    <input class="search_input "/>\n' +
      '  </div>\n' +
      '  <div class="radio_list">\n' +
           str +
      '  </div>\n' +
      '</div>'
    return $(html)
  }

  function addTypeFilter ($el, data) {
    const arr = Object.keys(data)
    $('.model_layer').append(initList(data[arr[0]].data))
    let str = ''
    arr.forEach(it => {
      str += '<button data-type="' + it + '" class="type_button ' + (arr[0] === it ? 'active' : '') + '">' + data[it].name + '</button>'
    })
    $('.model_layer .radio_search').after('<div class="radio_type">' + str + '</div>')

    $('.radio_type').on('click', 'button', function (e) {
      const $this = $(this)
      e.stopPropagation()
      if ($this.hasClass('active')) return
      $this.addClass('active').siblings('button').removeClass('active')
      $('.radio_list').html(
        data[$this.data('type')].data
          .map(it => '<span class="radio_item" data-value="' + it.value + '" data-token="' + (it.dataToken ? it.dataToken : '') + '">' + it.text + '</span>')
          .join('')
      )
    })
  }

  function onInputEvent (data) {
    $('.model_layer .radio_box')
      .on('click', 'input.search_input', function (e) { e.stopPropagation() })
      .on('input', 'input.search_input', function (e) {
        const val = $(this).val()
        const $listBox = $('.model_layer').find('.radio_list')
        $listBox.html(
          (Array.isArray(data) ? data : data[$('.radio_type .active')?.data('type')].data)
            .filter(it => String(it.value).indexOf(val) > -1 || String(it.dataToken)?.indexOf(val) > -1)
            .map(it => ('<span class="radio_item" data-value="' + it.value + '" data-token="' + (it.dataToken ? it.dataToken : '') + '">' + it.text + '</span>'))
            .join('')
        )
      })
  }

  function onListEvent ($el, options) {
    $('.model_layer .radio_box').on('click', 'span.radio_item', function (e) {
      e.stopPropagation()
      $el.text($(this).data('value'))
      close($el)
      options.changeFn?.($el)
    })
  }

  function close ($el) {
    if (!$el.data('show')) return
    $('.model_layer').empty()
    $el.data('show', false)
  }

  function show ($el, data, options = {}) {
    if (!$('.radio_box').length) {
      Array.isArray(data) ? $('.model_layer').append(initList(data)) : addTypeFilter($el, data)
      onListEvent($el, options)
      onInputEvent(data)
    }

    const $radioBox = $('.model_layer .radio_box')
    $radioBox.find('.search_input ').focus()
    const rect = $el[0].getBoundingClientRect()
    const distance = $(window).height() - rect.top - rect.height
    $radioBox.height() > distance ? $radioBox.css('top', rect.top + distance - $radioBox.height()) : $radioBox.css('top', rect.top + rect.height)
    $radioBox
      .css('left', rect.left)
      .css('display', 'flex')
    $el.data('show', true)
  }

}(window.jQuery)