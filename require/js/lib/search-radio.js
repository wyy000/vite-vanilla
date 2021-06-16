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
    data.forEach((it, idx) => {
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

  function onInputEvent (data) {
    $('.model_layer .radio_box')
      .on('click', 'input.search_input', function (e) { e.stopPropagation() })
      .on('input', 'input.search_input', function (e) {
        const val = $(this).val()
        const $listBox = $('.model_layer').find('.radio_list')
        $listBox.html(
          data
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
    // if ($el.data('show')) return
    if (!$('.model_layer .radio_box').length) {
      $('.model_layer').append(initList(data))
      onListEvent($el, options)
      onInputEvent(data)
    }

    const $radioBox = $('.model_layer .radio_box')
    const rect = $el[0].getBoundingClientRect()
    const distance = $(window).height() - rect.top - rect.height
    $radioBox.height() > distance ? $radioBox.css('top', rect.top + distance - $radioBox.height()) : $radioBox.css('top', rect.top + rect.height)
    $radioBox
      .css('left', rect.left)
      .css('display', 'flex')
    $el.data('show', true)
  }

}(window.jQuery)