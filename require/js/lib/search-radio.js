!function ($) {
  'use strict';

  $.fn.extend({
    initSearchRadio: initSearchRadio,
  })

  function initSearchRadio (data) {
    const $el = $(this)
    $el.parents().eq(0).css({'position': 'relative'})
    $el.data('show', false).after(initList(data))

    const $radioBox = $el.siblings().eq(0)
    $radioBox.css('display', 'none')

    onInputEvent($el, data)
    onListEvent($el, $radioBox, data)

    return {
      $el,
      close: () => close($el, $radioBox),
      show: () => show($el, $radioBox),
    }
  }

  function initList (data) {
    let str = ''
    data.forEach((it, idx) => {
      str += '<span data-value="' + it.value + '" data-token="' + (it.dataToken ? it.dataToken : '') + '">' + it.text + '</span>'
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

  function onInputEvent ($el, data) {
    const $input = $el.siblings().eq(0).find('input')
    $input
      .on('click', function (e) { e.stopPropagation() })
      .on('input', function (e) {
        const val = $(this).val()
        const $listBox = $el.siblings().eq(0).find('.radio_list')
        $listBox.html(
          data
            .filter(it => String(it.value).indexOf(val) > -1 || String(it.dataToken)?.indexOf(val) > -1)
            .map(it => ('<span data-value="' + it.value + '" data-token="' + (it.dataToken ? it.dataToken : '') + '">' + it.text + '</span>'))
            .join('')
        )
      })
  }

  function onListEvent ($el, $radioBox) {
    const $list = $radioBox.find('.radio_list')
    $list.on('click', 'span', function (e) {
      e.stopPropagation()
      $el.text($(this).data('value'))
      close($el, $radioBox)
    })
  }

  function close ($el, $radioBox) {
    if (!$el.data('show')) return
    $radioBox.css('display', 'none')
    $el.data('show', false)
  }

  function show ($el, $radioBox) {
    if ($el.data('show')) return
    $radioBox.css('display', 'flex')
    $el.data('show', true)
  }

}(window.jQuery)